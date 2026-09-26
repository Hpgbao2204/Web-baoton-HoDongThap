import * as THREE from 'three'

/** Ba "giờ" của dòng sông, khớp với ba giai đoạn Hò Gọi → Hò Tỏ Lòng → Hò Tỏ Tình. */
export type Mood = 'day' | 'dusk' | 'night'

export interface MoodPalette {
  skyTop: string
  skyHorizon: string
  waterDeep: string
  waterNear: string
  glow: string
  orb: string
  orbY: number
  shore: string
  particles: string
  line: string
  lotus: string
  pad: string
  boat: string
  exposure: number
}

export const moods: Record<Mood, MoodPalette> = {
  day: {
    skyTop: '#bcd6ea',
    skyHorizon: '#f6dfe6',
    waterDeep: '#6f9dc1',
    waterNear: '#a9c8df',
    glow: '#fff4f0',
    orb: '#fff6ea',
    orbY: 7.6,
    shore: '#86a4b4',
    particles: '#f4b8c8',
    line: '#d9728f',
    lotus: '#f2a7bb',
    pad: '#7fa38e',
    boat: '#4d5a6b',
    exposure: 1,
  },
  dusk: {
    skyTop: '#9fb6d8',
    skyHorizon: '#f3c3cf',
    waterDeep: '#56789f',
    waterNear: '#c79db2',
    glow: '#ffd9df',
    orb: '#ffe0d6',
    orbY: 3.2,
    shore: '#6e7896',
    particles: '#ffd1dc',
    line: '#e58fa6',
    lotus: '#f19bb2',
    pad: '#62836f',
    boat: '#3a4257',
    exposure: 0.95,
  },
  night: {
    skyTop: '#0c1426',
    skyHorizon: '#2f3f63',
    waterDeep: '#0e1a2e',
    waterNear: '#2c4468',
    glow: '#dfe9ff',
    orb: '#f4f1ff',
    orbY: 5.6,
    shore: '#15213a',
    particles: '#ffe7a8',
    line: '#f2a5bb',
    lotus: '#e89ab3',
    pad: '#2d4a45',
    boat: '#0d1422',
    exposure: 0.9,
  },
}

export function toColor(hex: string) {
  return new THREE.Color(hex)
}

/** Bộ màu chữ/nền phù hợp với giờ của cảnh: đêm dùng bộ tối, ngày/chiều dùng bộ sáng. */
export function scopeFor(mood: Mood) {
  return mood === 'night' ? 'scope-dark' : 'scope-light'
}
