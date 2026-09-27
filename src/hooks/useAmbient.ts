import { useEffect, useState } from 'react'

/**
 * Tiếng sông nước tổng hợp bằng Web Audio (tiếng ồn nâu lọc thấp + sóng vỗ nhẹ).
 * Đây chỉ là âm thanh nền, KHÔNG phải tiếng Hò. Chỉ phát khi người xem bấm bật.
 */
let ctx: AudioContext | null = null
let gain: GainNode | null = null
let on = false
const listeners = new Set<(v: boolean) => void>()

function build() {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  ctx = new AC()
  const len = ctx.sampleRate * 4
  const buf = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch)
    let last = 0
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1
      last = (last + 0.02 * white) / 1.02
      d[i] = last * 3.2
    }
  }
  const src = ctx.createBufferSource()
  src.buffer = buf
  src.loop = true
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 520
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.11
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = 180
  lfo.connect(lfoGain).connect(lp.frequency)
  gain = ctx.createGain()
  gain.gain.value = 0
  src.connect(lp).connect(gain).connect(ctx.destination)
  src.start()
  lfo.start()
}

function set(v: boolean) {
  try {
    if (!ctx) build()
    if (!ctx || !gain) return
    if (v) void ctx.resume()
    gain.gain.cancelScheduledValues(ctx.currentTime)
    gain.gain.setTargetAtTime(v ? 0.22 : 0, ctx.currentTime, 0.6)
    on = v
    listeners.forEach((l) => l(on))
  } catch {
    /* trình duyệt không hỗ trợ Web Audio */
  }
}

export function useAmbient() {
  const [state, setState] = useState(on)
  useEffect(() => {
    listeners.add(setState)
    return () => {
      listeners.delete(setState)
    }
  }, [])
  return { playing: state, toggle: () => set(!on) }
}
