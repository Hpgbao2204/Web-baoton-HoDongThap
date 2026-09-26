import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { moods, type Mood, type MoodPalette } from './moods'

/**
 * Cảnh sông Đồng Tháp Mười dựng bằng Three.js:
 * bầu trời + mặt nước gợn sóng + bờ xa + sen, lá sen + chiếc xuồng có người đội nón lá
 * + "đường tiếng Hò" nối người hò với bờ bên kia + đom đóm/phấn hoa + sao đêm.
 * Màu sắc chuyển mượt giữa ba "giờ": day / dusk / night.
 */

const WAVE_GLSL = /* glsl */ `
float wave(vec2 p, float t) {
  float h = 0.0;
  h += sin(p.x * 0.18 + t * 0.6) * 0.16;
  h += sin(p.y * 0.22 - t * 0.8 + p.x * 0.05) * 0.12;
  h += sin((p.x + p.y) * 0.45 + t * 1.3) * 0.045;
  h += sin((p.x * 0.9 - p.y * 0.7) + t * 1.9) * 0.022;
  return h;
}
`

function wave(x: number, z: number, t: number) {
  return (
    Math.sin(x * 0.18 + t * 0.6) * 0.16 +
    Math.sin(z * 0.22 - t * 0.8 + x * 0.05) * 0.12 +
    Math.sin((x + z) * 0.45 + t * 1.3) * 0.045 +
    Math.sin(x * 0.9 - z * 0.7 + t * 1.9) * 0.022
  )
}

/** Bộ số ngẫu nhiên có hạt giống để cảnh luôn giống nhau mỗi lần tải. */
function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

type ColorKey = Exclude<keyof MoodPalette, 'orbY' | 'exposure'>
const colorKeys: ColorKey[] = [
  'skyTop', 'skyHorizon', 'waterDeep', 'waterNear', 'glow', 'orb', 'shore', 'particles', 'line', 'lotus', 'pad', 'boat',
]

export interface RiverSceneOptions {
  mood?: Mood
  reducedMotion?: boolean
  /** Bật/tắt chiếc xuồng và đường tiếng hò (trang con có thể chỉ cần mặt nước). */
  singer?: boolean
}

export class RiverScene {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera = new THREE.PerspectiveCamera(48, 1, 0.1, 600)
  private clock = new THREE.Clock()
  private time = 0
  private running = false
  private reduced: boolean
  private pointer = new THREE.Vector2()
  private pointerSmooth = new THREE.Vector2()

  private current: Record<ColorKey, THREE.Color>
  private target: Record<ColorKey, THREE.Color>
  private orbY: number
  private orbYTarget: number
  private night = 0
  private nightTarget = 0

  private orbDir = new THREE.Vector3()
  private sky!: THREE.ShaderMaterial
  private water!: THREE.ShaderMaterial
  private particles!: THREE.ShaderMaterial
  private stars!: THREE.ShaderMaterial
  private lineMat!: THREE.ShaderMaterial
  private lineMesh?: THREE.Mesh
  private shoreMats: THREE.MeshBasicMaterial[] = []
  private lotusMat!: THREE.MeshStandardMaterial
  private padMat!: THREE.MeshStandardMaterial
  private boatMat!: THREE.MeshStandardMaterial
  private hemi!: THREE.HemisphereLight
  private sun!: THREE.DirectionalLight
  private floaters: { obj: THREE.Object3D; x: number; z: number; spin: number; phase: number; lift: number }[] = []
  private boat?: THREE.Group
  private singerHead = new THREE.Vector3()
  private ripples: { mesh: THREE.Mesh; phase: number }[] = []
  private disposables: { dispose(): void }[] = []

  constructor(canvas: HTMLCanvasElement, opts: RiverSceneOptions = {}) {
    const mood = opts.mood ?? 'dusk'
    this.reduced = !!opts.reducedMotion
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'low-power' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    const p = moods[mood]
    this.current = {} as Record<ColorKey, THREE.Color>
    this.target = {} as Record<ColorKey, THREE.Color>
    for (const k of colorKeys) {
      this.current[k] = new THREE.Color(p[k])
      this.target[k] = new THREE.Color(p[k])
    }
    this.orbY = this.orbYTarget = p.orbY
    this.night = this.nightTarget = mood === 'night' ? 1 : 0

    this.camera.position.set(0, 2.4, 10)
    this.scene.fog = new THREE.Fog(this.current.skyHorizon.clone(), 22, 120)

    this.buildSky()
    this.buildWater()
    this.buildShore()
    this.buildLights()
    this.buildLotus()
    this.buildPier()
    if (opts.singer !== false) this.buildBoat()
    this.buildParticles()
    this.updateOrb()
    this.applyColors()
  }

  /* ---------------- dựng cảnh ---------------- */

  private track<T extends { dispose(): void }>(x: T) {
    this.disposables.push(x)
    return x
  }

  private buildSky() {
    const geo = this.track(new THREE.SphereGeometry(320, 48, 24))
    this.sky = this.track(
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: {
          uTop: { value: new THREE.Color() },
          uHorizon: { value: new THREE.Color() },
          uOrb: { value: new THREE.Color() },
          uGlow: { value: new THREE.Color() },
          uOrbDir: { value: this.orbDir },
          uNight: { value: 0 },
        },
        vertexShader: /* glsl */ `
          varying vec3 vDir;
          void main() {
            vDir = normalize(position);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uTop, uHorizon, uOrb, uGlow, uOrbDir;
          uniform float uNight;
          varying vec3 vDir;
          void main() {
            vec3 dir = normalize(vDir);
            float h = smoothstep(-0.02, 0.55, dir.y);
            vec3 col = mix(uHorizon, uTop, pow(h, 0.8));
            float d = max(dot(dir, normalize(uOrbDir)), 0.0);
            float disc = smoothstep(0.99955, 0.99975, d);
            float halo = pow(d, 900.0) * 0.6 + pow(d, 60.0) * 0.28 + pow(d, 6.0) * 0.12;
            col += uGlow * halo * (1.0 - disc);
            // mặt trăng có vài vệt mờ
            float craters = uNight * disc * 0.08 * sin(dir.x * 900.0) * sin(dir.y * 700.0);
            col = mix(col, uOrb - craters, disc);
            gl_FragColor = vec4(col, 1.0);
            #include <colorspace_fragment>
          }`,
      }),
    )
    this.scene.add(new THREE.Mesh(geo, this.sky))

    // sao đêm
    const r = rng(7)
    const n = 700
    const pos = new Float32Array(n * 3)
    const seed = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      const th = r() * Math.PI * 2
      const y = 0.04 + Math.pow(r(), 0.7) * 0.9
      const rad = Math.sqrt(1 - y * y)
      pos.set([Math.cos(th) * rad * 300, y * 300, Math.sin(th) * rad * 300], i * 3)
      seed[i] = r()
    }
    const g = this.track(new THREE.BufferGeometry())
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    this.stars = this.track(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        fog: false,
        uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 }, uPR: { value: this.renderer.getPixelRatio() } },
        vertexShader: /* glsl */ `
          attribute float aSeed; uniform float uTime, uPR; varying float vA;
          void main() {
            vA = 0.55 + 0.45 * sin(uTime * (0.6 + aSeed * 1.8) + aSeed * 40.0);
            gl_PointSize = (1.0 + aSeed * 2.2) * uPR;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: /* glsl */ `
          uniform float uOpacity; varying float vA;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.0, d) * vA * uOpacity;
            gl_FragColor = vec4(vec3(1.0, 0.97, 0.95), a);
            #include <colorspace_fragment>
          }`,
      }),
    )
    this.scene.add(new THREE.Points(g, this.stars))
  }

  private buildWater() {
    const small = window.innerWidth < 700
    const geo = this.track(new THREE.PlaneGeometry(260, 150, small ? 110 : 200, small ? 70 : 120))
    geo.rotateX(-Math.PI / 2)
    geo.translate(0, 0, -55)
    this.water = this.track(
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uDeep: { value: new THREE.Color() },
          uNear: { value: new THREE.Color() },
          uHorizon: { value: new THREE.Color() },
          uTop: { value: new THREE.Color() },
          uGlow: { value: new THREE.Color() },
          uOrbDir: { value: this.orbDir },
        },
        vertexShader: /* glsl */ `
          uniform float uTime;
          varying vec3 vWorld; varying vec3 vNormal;
          ${WAVE_GLSL}
          void main() {
            vec3 p = position;
            float e = 0.12;
            float h = wave(p.xz, uTime);
            float hx = wave(p.xz + vec2(e, 0.0), uTime);
            float hz = wave(p.xz + vec2(0.0, e), uTime);
            p.y = h;
            vNormal = normalize(vec3(h - hx, e, h - hz));
            vWorld = (modelMatrix * vec4(p, 1.0)).xyz;
            gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0);
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uDeep, uNear, uHorizon, uTop, uGlow, uOrbDir;
          uniform float uTime;
          varying vec3 vWorld; varying vec3 vNormal;
          void main() {
            vec3 V = normalize(cameraPosition - vWorld);
            vec3 N = normalize(vNormal);
            float fres = pow(1.0 - max(dot(N, V), 0.0), 3.0);
            float dist = length(vWorld.xz - cameraPosition.xz);
            vec3 refl = mix(uHorizon, uTop, 0.25);
            vec3 col = mix(uDeep, uNear, 0.45 + 0.25 * sin(vWorld.x * 0.05 + vWorld.z * 0.03));
            col = mix(col, refl, clamp(fres * 0.9 + 0.08, 0.0, 1.0));
            vec3 R = reflect(-V, N);
            float s = max(dot(R, normalize(uOrbDir)), 0.0);
            float spec = pow(s, 90.0) * 1.3 + pow(s, 14.0) * 0.22;
            // lấp lánh nhỏ trên mặt nước
            float glint = pow(max(sin(vWorld.x * 3.1 + uTime * 1.7) * sin(vWorld.z * 2.3 - uTime * 1.3), 0.0), 18.0) * 0.25;
            col += uGlow * (spec + glint * s);
            col = mix(col, uHorizon, smoothstep(28.0, 125.0, dist));
            gl_FragColor = vec4(col, 1.0);
            #include <colorspace_fragment>
          }`,
      }),
    )
    this.scene.add(new THREE.Mesh(geo, this.water))
  }

  private buildShore() {
    const layers = [
      { z: -95, base: 2.2, seed: 3, scale: 1.3 },
      { z: -72, base: 1.1, seed: 11, scale: 1 },
    ]
    for (const L of layers) {
      const r = rng(L.seed)
      const shape = new THREE.Shape()
      const W = 170
      shape.moveTo(-W, -2)
      let x = -W
      while (x < W) {
        const step = 0.8 + r() * 1.6
        x += step
        let h = L.base + Math.sin(x * 0.07) * 0.5 + r() * 0.5
        if (r() < 0.16) {
          // bóng dừa nước / cây cao
          const top = h + 1.6 + r() * 2.4
          shape.lineTo(x - 0.2, h)
          shape.lineTo(x, top)
          shape.lineTo(x + 0.25, top - 0.4)
          shape.lineTo(x + 0.35, h)
        } else if (r() < 0.35) {
          h += 0.7 + r() * 0.9 // tán cây tròn
          shape.quadraticCurveTo(x - step / 2, h + 0.6, x, h)
        } else {
          shape.lineTo(x, h)
        }
      }
      shape.lineTo(W, -2)
      shape.lineTo(-W, -2)
      const geo = this.track(new THREE.ShapeGeometry(shape, 2))
      geo.scale(L.scale, L.scale, 1)
      const mat = this.track(new THREE.MeshBasicMaterial({ color: this.current.shore, fog: true }))
      this.shoreMats.push(mat)
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(0, -0.3, L.z)
      this.scene.add(mesh)
    }
  }

  private buildLights() {
    this.hemi = new THREE.HemisphereLight(0xffffff, 0x333344, 1.6)
    this.sun = new THREE.DirectionalLight(0xffffff, 1.4)
    this.scene.add(this.hemi, this.sun, this.sun.target)
  }

  private makePetal(w: number, h: number) {
    const g = new THREE.PlaneGeometry(w, h, 4, 8)
    const pos = g.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i) + h / 2 // 0..h
      const t = y / h
      const narrow = 1 - Math.pow(t, 2.2) * 0.9
      const cup = (x / (w / 2)) ** 2 * 0.09 // lòng cánh hơi khum
      pos.setXYZ(i, x * narrow * (0.55 + Math.sin(t * Math.PI) * 0.6), y, cup + Math.pow(t, 2) * 0.12)
    }
    g.computeVertexNormals()
    return g
  }

  private buildLotus() {
    this.lotusMat = this.track(
      new THREE.MeshStandardMaterial({ color: this.current.lotus, roughness: 0.55, side: THREE.DoubleSide, flatShading: true }),
    )
    this.padMat = this.track(
      new THREE.MeshStandardMaterial({ color: this.current.pad, roughness: 0.8, side: THREE.DoubleSide, flatShading: true }),
    )
    const centerMat = this.track(new THREE.MeshStandardMaterial({ color: '#f2d48a', roughness: 0.6 }))

    const parts: THREE.BufferGeometry[] = []
    const rings = [
      { n: 8, w: 0.34, h: 0.62, tilt: 1.0, lift: 0.02 },
      { n: 7, w: 0.3, h: 0.56, tilt: 0.62, lift: 0.05 },
      { n: 5, w: 0.24, h: 0.46, tilt: 0.28, lift: 0.08 },
    ]
    rings.forEach((R, ri) => {
      for (let i = 0; i < R.n; i++) {
        const g = this.makePetal(R.w, R.h)
        g.rotateX(-R.tilt)
        g.translate(0, R.lift, 0.04)
        g.rotateY((i / R.n) * Math.PI * 2 + ri * 0.4)
        parts.push(g)
      }
    })
    const flowerGeo = this.track(mergeGeometries(parts)!)
    parts.forEach((g) => g.dispose())
    const centerGeo = this.track(new THREE.CylinderGeometry(0.1, 0.07, 0.1, 10))
    const padGeo = this.track(new THREE.CircleGeometry(0.75, 22, 0.35, Math.PI * 2 - 0.35))
    padGeo.rotateX(-Math.PI / 2)
    const budGeo = this.track(new THREE.SphereGeometry(0.16, 8, 6))
    budGeo.scale(1, 1.8, 1)

    const r = rng(21)
    const spots: [number, number, 'flower' | 'pad' | 'bud'][] = [
      [5.2, 1.2, 'flower'], [6.6, 0.2, 'pad'], [4.4, 2.4, 'pad'], [7.5, -1.8, 'flower'], [8.8, -0.6, 'pad'],
      [3.4, -2.6, 'pad'], [9.6, -4.2, 'flower'], [6.0, -5.2, 'pad'], [11.5, -2.0, 'pad'], [2.6, 3.4, 'bud'],
      [-8.5, -3.0, 'pad'], [-10.4, -5.5, 'flower'], [-7.2, -7.0, 'pad'], [-12.0, -9.0, 'pad'], [12.8, -8.0, 'bud'],
      [-4.6, 3.2, 'pad'], [14.0, -12.0, 'flower'], [-15.0, -14.0, 'pad'], [7.8, 2.8, 'bud'], [10.2, 1.4, 'pad'],
    ]
    for (const [x, z, kind] of spots) {
      const grp = new THREE.Group()
      const s = 0.8 + r() * 0.5
      if (kind === 'flower') {
        const pad = new THREE.Mesh(padGeo, this.padMat)
        pad.position.set(0.25, 0, 0.15)
        const f = new THREE.Mesh(flowerGeo, this.lotusMat)
        f.position.y = 0.06
        const c = new THREE.Mesh(centerGeo, centerMat)
        c.position.y = 0.12
        grp.add(pad, f, c)
      } else if (kind === 'bud') {
        const stem = new THREE.Mesh(this.track(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 5)), this.padMat)
        stem.position.y = 0.45
        const bud = new THREE.Mesh(budGeo, this.lotusMat)
        bud.position.y = 1.05
        grp.add(stem, bud)
      } else {
        grp.add(new THREE.Mesh(padGeo, this.padMat))
      }
      grp.scale.setScalar(s)
      grp.rotation.y = r() * Math.PI * 2
      this.scene.add(grp)
      this.floaters.push({ obj: grp, x, z, spin: (r() - 0.5) * 0.05, phase: r() * 10, lift: kind === 'bud' ? 0 : 0.02 })
    }
  }

  /** Bến nước: vài cọc gỗ và tấm ván bên phải, nơi cuộc hẹn khép lại. */
  private buildPier() {
    const wood = this.track(new THREE.MeshStandardMaterial({ color: '#5b4a4f', roughness: 0.9, flatShading: true }))
    this.boatMat = this.track(new THREE.MeshStandardMaterial({ color: this.current.boat, roughness: 0.7, flatShading: true }))
    const post = this.track(new THREE.CylinderGeometry(0.07, 0.08, 2.4, 6))
    const plank = this.track(new THREE.BoxGeometry(3.4, 0.08, 1.1))
    const g = new THREE.Group()
    for (const [x, z] of [[-1.5, -0.45], [-1.5, 0.45], [0, -0.45], [0, 0.45], [1.5, -0.45], [1.5, 0.45]]) {
      const m = new THREE.Mesh(post, wood)
      m.position.set(x, 0.4, z)
      g.add(m)
    }
    const top = new THREE.Mesh(plank, wood)
    top.position.y = 0.72
    g.add(top)
    g.position.set(13, 0, -16)
    g.rotation.y = -0.5
    this.scene.add(g)
  }

  private buildBoat() {
    const hull = new THREE.BoxGeometry(2.8, 0.34, 0.62, 16, 2, 3)
    const pos = hull.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      let y = pos.getY(i)
      let z = pos.getZ(i)
      const f = Math.abs(x) / 1.4
      z *= 1 - Math.pow(f, 2) * 0.92
      if (y < 0) y *= 1 - f * 0.5
      y += Math.pow(f, 3) * 0.26
      pos.setXYZ(i, x, y, z)
    }
    hull.computeVertexNormals()
    this.track(hull)
    const boat = new THREE.Group()
    boat.add(new THREE.Mesh(hull, this.boatMat))

    // người hò: thân, đầu, nón lá, mái chèo
    const skin = this.track(new THREE.MeshStandardMaterial({ color: '#c99a86', roughness: 0.8 }))
    const shirt = this.track(new THREE.MeshStandardMaterial({ color: '#e7c3cf', roughness: 0.8, flatShading: true }))
    const hat = this.track(new THREE.MeshStandardMaterial({ color: '#e9d7b4', roughness: 0.7, flatShading: true }))
    const body = new THREE.Mesh(this.track(new THREE.CylinderGeometry(0.13, 0.19, 0.62, 8)), shirt)
    body.position.set(0.55, 0.45, 0)
    const head = new THREE.Mesh(this.track(new THREE.SphereGeometry(0.1, 10, 8)), skin)
    head.position.set(0.55, 0.86, 0)
    const cone = new THREE.Mesh(this.track(new THREE.ConeGeometry(0.3, 0.18, 18)), hat)
    cone.position.set(0.55, 0.98, 0)
    const oar = new THREE.Mesh(this.track(new THREE.BoxGeometry(0.035, 1.6, 0.035)), this.boatMat)
    oar.position.set(0.8, 0.35, 0.28)
    oar.rotation.z = 0.7
    boat.add(body, head, cone, oar)
    this.scene.add(boat)
    this.boat = boat

    // vòng sóng lan ra quanh xuồng (tiếng hò lan trên mặt nước)
    const ringGeo = this.track(new THREE.RingGeometry(0.96, 1, 64))
    ringGeo.rotateX(-Math.PI / 2)
    for (let i = 0; i < 3; i++) {
      const m = this.track(new THREE.MeshBasicMaterial({ color: this.current.glow, transparent: true, opacity: 0, depthWrite: false }))
      const mesh = new THREE.Mesh(ringGeo, m)
      this.scene.add(mesh)
      this.ripples.push({ mesh, phase: i / 3 })
    }

    // đường tiếng Hò
    this.lineMat = this.track(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color() }, uGlow: { value: new THREE.Color() } },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: /* glsl */ `
          uniform float uTime; uniform vec3 uColor, uGlow; varying vec2 vUv;
          void main() {
            float x = vUv.x;
            float ends = smoothstep(0.0, 0.06, x) * smoothstep(1.0, 0.8, x);
            float pulse = pow(0.5 + 0.5 * sin(x * 26.0 - uTime * 2.4), 3.0);
            float travel = smoothstep(0.18, 0.0, abs(fract(uTime * 0.09) - x));
            float a = ends * (0.28 + 0.5 * pulse + 0.9 * travel);
            gl_FragColor = vec4(mix(uColor, uGlow, travel * 0.6) * 1.1, a);
            #include <colorspace_fragment>
          }`,
      }),
    )
  }

  private buildParticles() {
    const r = rng(42)
    const n = window.innerWidth < 700 ? 160 : 280
    const pos = new Float32Array(n * 3)
    const seed = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      pos.set([(r() - 0.5) * 70, 0.3 + r() * 7, -55 + r() * 60], i * 3)
      seed[i] = r()
    }
    const g = this.track(new THREE.BufferGeometry())
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    this.particles = this.track(
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color() },
          uOpacity: { value: 0.6 },
          uPR: { value: this.renderer.getPixelRatio() },
        },
        vertexShader: /* glsl */ `
          attribute float aSeed; uniform float uTime, uPR; varying float vTw;
          void main() {
            vec3 p = position;
            p.y += sin(uTime * 0.25 + aSeed * 6.28) * 0.5;
            p.x += sin(uTime * 0.17 + aSeed * 12.0) * 0.8;
            p.z += cos(uTime * 0.13 + aSeed * 9.0) * 0.5;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = (3.0 + aSeed * 5.0) * uPR * (10.0 / -mv.z);
            vTw = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(uTime * (0.8 + aSeed * 1.6) + aSeed * 30.0), 2.0);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor; uniform float uOpacity; varying float vTw;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.05, d) * vTw * uOpacity;
            gl_FragColor = vec4(uColor, a);
            #include <colorspace_fragment>
          }`,
      }),
    )
    this.scene.add(new THREE.Points(g, this.particles))
  }

  /* ---------------- cập nhật ---------------- */

  private updateOrb() {
    const elev = this.orbY * 0.028
    this.orbDir.set(0.3, Math.sin(elev), -1).normalize()
    this.sun.position.copy(this.orbDir).multiplyScalar(50)
  }

  private applyColors() {
    const c = this.current
    const u = this.sky.uniforms
    u.uTop.value.copy(c.skyTop)
    u.uHorizon.value.copy(c.skyHorizon)
    u.uOrb.value.copy(c.orb)
    u.uGlow.value.copy(c.glow)
    u.uNight.value = this.night
    const w = this.water.uniforms
    w.uDeep.value.copy(c.waterDeep)
    w.uNear.value.copy(c.waterNear)
    w.uHorizon.value.copy(c.skyHorizon)
    w.uTop.value.copy(c.skyTop)
    w.uGlow.value.copy(c.glow)
    ;(this.scene.fog as THREE.Fog).color.copy(c.skyHorizon)
    for (const m of this.shoreMats) m.color.copy(c.shore)
    this.lotusMat.color.copy(c.lotus)
    this.lotusMat.emissive.copy(c.lotus).multiplyScalar(0.12 + this.night * 0.25)
    this.padMat.color.copy(c.pad)
    this.boatMat.color.copy(c.boat)
    this.hemi.color.copy(c.skyTop)
    this.hemi.groundColor.copy(c.waterDeep)
    this.hemi.intensity = 1.7 - this.night * 0.9
    this.sun.color.copy(c.glow)
    this.sun.intensity = 1.5 - this.night * 0.8
    this.particles.uniforms.uColor.value.copy(c.particles)
    this.particles.uniforms.uOpacity.value = 0.35 + this.night * 0.55
    this.stars.uniforms.uOpacity.value = this.night
    if (this.lineMat) {
      this.lineMat.uniforms.uColor.value.copy(c.line)
      this.lineMat.uniforms.uGlow.value.copy(c.glow)
    }
    for (const rp of this.ripples) (rp.mesh.material as THREE.MeshBasicMaterial).color.copy(c.glow)
  }

  setMood(mood: Mood) {
    const p = moods[mood]
    for (const k of colorKeys) this.target[k].set(p[k])
    this.orbYTarget = p.orbY
    this.nightTarget = mood === 'night' ? 1 : 0
    if (this.reduced || !this.running) {
      for (const k of colorKeys) this.current[k].copy(this.target[k])
      this.orbY = this.orbYTarget
      this.night = this.nightTarget
      this.updateOrb()
      this.applyColors()
      this.renderOnce()
    }
  }

  setPointer(x: number, y: number) {
    this.pointer.set(x, y)
  }

  resize(w: number, h: number) {
    if (w === 0 || h === 0) return
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    // màn hình dọc: lùi máy quay để vẫn thấy cả bến lẫn xuồng
    this.camera.fov = w / h < 0.9 ? 62 : 48
    this.camera.updateProjectionMatrix()
    this.renderOnce()
  }

  private updateBoatAndLine(t: number) {
    if (!this.boat) return
    const bx = -6.5 + Math.sin(t * 0.045) * 3.2
    const bz = -8.5 + Math.cos(t * 0.06) * 1.2
    const by = wave(bx, bz, t)
    this.boat.position.set(bx, by + 0.02, bz)
    this.boat.rotation.z = (wave(bx + 1, bz, t) - wave(bx - 1, bz, t)) * 0.3
    this.boat.rotation.x = (wave(bx, bz + 0.5, t) - wave(bx, bz - 0.5, t)) * 0.4
    this.boat.rotation.y = 0.25 + Math.cos(t * 0.045) * 0.15
    this.boat.updateMatrixWorld()
    this.singerHead.set(0.55, 0.98, 0).applyMatrix4(this.boat.matrixWorld)

    for (const rp of this.ripples) {
      const k = (t * 0.22 + rp.phase) % 1
      rp.mesh.position.set(bx, wave(bx, bz, t) + 0.03, bz)
      rp.mesh.scale.setScalar(0.4 + k * 5)
      ;(rp.mesh.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.35
    }

    const a = this.singerHead.clone().add(new THREE.Vector3(0, 0.15, 0))
    const b = new THREE.Vector3(16, 2.6, -52)
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 6; i++) {
      const s = i / 6
      const p = a.clone().lerp(b, s)
      p.y += Math.sin(s * Math.PI) * (4.2 + Math.sin(t * 0.5) * 0.3)
      p.x += Math.sin(s * Math.PI * 2 + t * 0.4) * 0.9 * Math.sin(s * Math.PI)
      p.z += Math.cos(s * Math.PI * 3 + t * 0.3) * 0.6 * Math.sin(s * Math.PI)
      pts.push(p)
    }
    const curve = new THREE.CatmullRomCurve3(pts)
    const geo = new THREE.TubeGeometry(curve, 90, 0.045, 6, false)
    if (!this.lineMesh) {
      this.lineMesh = new THREE.Mesh(geo, this.lineMat)
      this.lineMesh.frustumCulled = false
      this.scene.add(this.lineMesh)
    } else {
      this.lineMesh.geometry.dispose()
      this.lineMesh.geometry = geo
    }
  }

  private tick = () => {
    const dt = Math.min(this.clock.getDelta(), 0.05)
    if (!this.reduced) this.time += dt
    const t = this.time + 20

    // chuyển màu mượt
    const k = 1 - Math.exp(-dt * 1.6)
    for (const key of colorKeys) this.current[key].lerp(this.target[key], k)
    this.orbY += (this.orbYTarget - this.orbY) * k
    this.night += (this.nightTarget - this.night) * k
    this.updateOrb()
    this.applyColors()

    this.water.uniforms.uTime.value = t
    this.particles.uniforms.uTime.value = t
    this.stars.uniforms.uTime.value = t
    if (this.lineMat) this.lineMat.uniforms.uTime.value = t

    for (const f of this.floaters) {
      const y = wave(f.x, f.z, t)
      f.obj.position.set(f.x, y + f.lift, f.z)
      f.obj.rotation.x = (wave(f.x, f.z + 0.4, t) - wave(f.x, f.z - 0.4, t)) * 0.5
      f.obj.rotation.z = (wave(f.x - 0.4, f.z, t) - wave(f.x + 0.4, f.z, t)) * 0.5
      f.obj.rotation.y += f.spin * dt
    }
    this.updateBoatAndLine(t)

    // máy quay trôi nhẹ theo con trỏ
    this.pointerSmooth.lerp(this.pointer, 1 - Math.exp(-dt * 2.5))
    const sway = this.reduced ? 0 : Math.sin(t * 0.18) * 0.25
    this.camera.position.set(this.pointerSmooth.x * 1.4 + sway, 2.4 + this.pointerSmooth.y * 0.5, 10)
    this.camera.lookAt(this.pointerSmooth.x * 0.6, 1.9, -20)

    this.renderer.render(this.scene, this.camera)
  }

  renderOnce() {
    this.tick()
  }

  start() {
    if (this.running) return
    this.running = true
    this.clock.getDelta()
    this.renderer.setAnimationLoop(this.tick)
  }

  stop() {
    this.running = false
    this.renderer.setAnimationLoop(null)
  }

  dispose() {
    this.stop()
    this.lineMesh?.geometry.dispose()
    for (const d of this.disposables) d.dispose()
    this.renderer.dispose()
  }
}
