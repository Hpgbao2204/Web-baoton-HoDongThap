import { useEffect, useRef } from 'react'
import { moods, type Mood } from '../three/moods'

interface Props {
  mood: Mood
  /** 0..1 — tiếng gọi đã vang tới đâu. */
  call: number
  /** Cho phép người xem nhấn giữ để đáp lời. */
  canRespond: boolean
  onResponded: () => void
  resetKey: number
  /** Giữ từ bàn phím (nút "Giữ để đáp lời"). */
  forceHold?: boolean
}

/**
 * Sân khấu 2D của "Một cuộc hẹn 5 phút":
 * bờ trái có người hò trên xuồng, bờ phải là bến nước.
 * Người xem nhấn giữ để gửi một đường đáp lời ngược về phía người hò;
 * di chuyển lên xuống để đổi độ cao của đường.
 */
export default function DateStage({ mood, call, canRespond, onResponded, resetKey, forceHold = false }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const state = useRef({ holding: false, y: 0.4, pts: [] as { x: number; y: number }[], done: false, t: 0 })
  const props = useRef({ mood, call, canRespond, onResponded, forceHold })
  props.current = { mood, call, canRespond, onResponded, forceHold }

  useEffect(() => {
    state.current.pts = []
    state.current.done = false
  }, [resetKey])

  useEffect(() => {
    const c = ref.current!
    const g = c.getContext('2d')!
    let raf = 0
    let w = 0
    let h = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = c.clientWidth
      h = c.clientHeight
      c.width = w * dpr
      c.height = h * dpr
      g.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(c)

    const water = () => h * 0.62
    const caller = () => ({ x: w * 0.2, y: water() - h * 0.16 })
    const listener = () => ({ x: w * 0.82, y: water() - h * 0.2 })

    const draw = () => {
      const s = state.current
      const P = props.current
      const m = moods[P.mood]
      if (!reduced) s.t += 1 / 60
      const t = s.t

      // trời
      const sky = g.createLinearGradient(0, 0, 0, water())
      sky.addColorStop(0, m.skyTop)
      sky.addColorStop(1, m.skyHorizon)
      g.fillStyle = sky
      g.fillRect(0, 0, w, h)

      // trăng / mặt trời
      const ox = w * 0.64
      const oy = h * (P.mood === 'day' ? 0.16 : P.mood === 'dusk' ? 0.42 : 0.2)
      const halo = g.createRadialGradient(ox, oy, 0, ox, oy, h * 0.3)
      halo.addColorStop(0, m.glow + 'cc')
      halo.addColorStop(1, m.glow + '00')
      g.fillStyle = halo
      g.fillRect(0, 0, w, h)
      g.fillStyle = m.orb
      g.beginPath()
      g.arc(ox, oy, Math.max(10, h * 0.045), 0, Math.PI * 2)
      g.fill()

      // sao
      if (P.mood === 'night') {
        g.fillStyle = '#ffffff'
        for (let i = 0; i < 40; i++) {
          const sx = ((i * 97) % 100) / 100 * w
          const sy = ((i * 53) % 100) / 100 * water() * 0.8
          g.globalAlpha = 0.3 + 0.5 * Math.abs(Math.sin(t * 0.8 + i))
          g.fillRect(sx, sy, 1.6, 1.6)
        }
        g.globalAlpha = 1
      }

      // bờ xa
      g.fillStyle = m.shore
      g.beginPath()
      g.moveTo(0, water())
      for (let x = 0; x <= w; x += 8) {
        const n = Math.sin(x * 0.03) * 5 + Math.sin(x * 0.11) * 3 + (Math.sin(x * 0.7) > 0.93 ? 14 : 0)
        g.lineTo(x, water() - 10 - n)
      }
      g.lineTo(w, water())
      g.fill()

      // nước
      const wg = g.createLinearGradient(0, water(), 0, h)
      wg.addColorStop(0, m.waterNear)
      wg.addColorStop(1, m.waterDeep)
      g.fillStyle = wg
      g.fillRect(0, water(), w, h - water())
      g.strokeStyle = m.glow
      g.lineWidth = 1
      for (let i = 0; i < 7; i++) {
        const yy = water() + 10 + i * ((h - water()) / 7)
        g.globalAlpha = 0.12 + i * 0.03
        g.beginPath()
        for (let x = 0; x <= w; x += 10) {
          const y = yy + Math.sin(x * 0.02 + t * (0.6 + i * 0.1) + i) * (2 + i * 0.6)
          x === 0 ? g.moveTo(x, y) : g.lineTo(x, y)
        }
        g.stroke()
      }
      g.globalAlpha = 1

      // xuồng + người hò đội nón lá
      const C = caller()
      const bob = Math.sin(t * 1.2) * 2
      g.fillStyle = m.boat
      g.beginPath()
      g.moveTo(C.x - 50, water() + 4 + bob)
      g.quadraticCurveTo(C.x, water() + 22 + bob, C.x + 50, water() + 4 + bob)
      g.lineTo(C.x + 40, water() + 10 + bob)
      g.quadraticCurveTo(C.x, water() + 18 + bob, C.x - 40, water() + 10 + bob)
      g.fill()
      g.fillStyle = '#e7c3cf'
      g.fillRect(C.x - 5, C.y + bob + 10, 10, water() - C.y - 6)
      g.fillStyle = '#e9d7b4'
      g.beginPath()
      g.moveTo(C.x - 16, C.y + bob + 10)
      g.lineTo(C.x, C.y + bob - 4)
      g.lineTo(C.x + 16, C.y + bob + 10)
      g.fill()

      // bến nước + người nghe
      const L = listener()
      g.fillStyle = '#5b4a4f'
      g.fillRect(L.x - 40, water() - 6, 110, 6)
      for (const px of [-36, 0, 36, 66]) g.fillRect(L.x + px, water() - 6, 4, 30)
      g.fillStyle = m.boat
      g.fillRect(L.x - 4, L.y + 12, 9, water() - L.y - 18)
      g.beginPath()
      g.arc(L.x, L.y + 6, 6, 0, Math.PI * 2)
      g.fill()

      // tiếng gọi: đường từ người hò sang bến
      const p = Math.min(1, P.call)
      if (p > 0) {
        g.save()
        g.strokeStyle = m.line
        g.lineWidth = 2.4
        g.lineCap = 'round'
        g.shadowColor = m.line
        g.shadowBlur = 12
        g.setLineDash([6, 8])
        g.lineDashOffset = -t * 30
        g.beginPath()
        const steps = 80
        for (let i = 0; i <= steps * p; i++) {
          const k = i / steps
          const x = C.x + (L.x - C.x) * k
          const y = C.y - Math.sin(k * Math.PI) * h * 0.28 + Math.sin(k * 14 - t * 2) * 5 * Math.sin(k * Math.PI)
          i === 0 ? g.moveTo(x, y) : g.lineTo(x, y)
        }
        g.stroke()
        g.restore()
      }

      // đường đáp lời
      if ((s.holding || P.forceHold) && P.canRespond && !s.done) {
        const last = s.pts[s.pts.length - 1]
        const nx = (last ? last.x : L.x) - w * 0.006
        const ny = Math.min(water() - 16, Math.max(h * 0.08, s.y * h))
        const sy = last ? last.y + (ny - last.y) * 0.18 : L.y
        s.pts.push({ x: nx, y: sy })
        if (nx <= C.x + 6) {
          s.done = true
          s.holding = false
          P.onResponded()
        }
      }
      if (s.pts.length > 1) {
        g.save()
        g.strokeStyle = m.lotus
        g.lineWidth = 3
        g.lineCap = 'round'
        g.lineJoin = 'round'
        g.shadowColor = m.lotus
        g.shadowBlur = 16
        g.beginPath()
        g.moveTo(L.x, L.y)
        s.pts.forEach((q, i) => g.lineTo(q.x, q.y + Math.sin(i * 0.3 - t * 3) * 1.5))
        g.stroke()
        g.restore()
        const head = s.pts[s.pts.length - 1]
        g.fillStyle = m.glow
        g.beginPath()
        g.arc(head.x, head.y, 4 + Math.sin(t * 6) * 1.2, 0, Math.PI * 2)
        g.fill()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const setY = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      state.current.y = (e.clientY - r.top) / r.height
    }
    const down = (e: PointerEvent) => {
      if (!props.current.canRespond) return
      setY(e)
      state.current.holding = true
      try {
        c.setPointerCapture(e.pointerId)
      } catch {
        /* bỏ qua */
      }
    }
    const up = () => {
      state.current.holding = false
    }
    c.addEventListener('pointerdown', down)
    c.addEventListener('pointermove', setY)
    c.addEventListener('pointerup', up)
    c.addEventListener('pointercancel', up)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      c.removeEventListener('pointerdown', down)
      c.removeEventListener('pointermove', setY)
      c.removeEventListener('pointerup', up)
      c.removeEventListener('pointercancel', up)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-label="Sân khấu: người hò trên xuồng bên trái, bến nước bên phải"
      role="img"
      data-hold={canRespond ? 'on' : 'off'}
      style={{ cursor: canRespond ? 'crosshair' : 'default' }}
    />
  )
}
