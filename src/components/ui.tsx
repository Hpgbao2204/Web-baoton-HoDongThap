import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { statusLabels } from '../data/heritage'
import type { HeritageStatus } from '../data/types'
import { useTilt } from '../hooks/useMotion'
import { useTheme } from '../hooks/useTheme'
import RiverCanvas from './RiverCanvas'
import { IconFlag } from './icons'
import { scopeFor, type Mood } from '../three/moods'

export function StatusBadge({ status }: { status: HeritageStatus }) {
  const s = statusLabels[status]
  return (
    <span className={`badge ${s.tone}`} title={s.hint}>
      {s.label}
    </span>
  )
}

export function SampleBadge() {
  return <span className="badge sample">Mục mẫu</span>
}

export function VerifyFlag({ text = 'Cần xác minh' }: { text?: string }) {
  return (
    <span className="verify-flag">
      <IconFlag />
      {text}
    </span>
  )
}

/** Đường tiếng Hò chia các khối, chảy chậm như nước. */
export function HoDivider({ flip = false }: { flip?: boolean }) {
  return (
    <svg className="ho-divider" viewBox="0 0 1200 48" preserveAspectRatio="none" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path
        d="M0 30 C 120 6, 220 44, 340 26 S 560 8, 700 28 S 940 46, 1060 22 S 1160 18, 1200 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PageHead({
  eyebrow,
  title,
  lede,
  mood,
  crumb,
}: {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  mood: Mood
  crumb: string
}) {
  return (
    <section className={`page-head ${scopeFor(mood)}`}>
      <RiverCanvas mood={mood} singer={false} />
      <div className="wrap">
        <p className="crumb">
          <Link to="/">Trang chủ</Link> / {crumb}
        </p>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, lede }: { eyebrow?: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <div className="section-head" data-reveal>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </div>
  )
}

/** Sóng âm vẽ bằng canvas. Chưa có bản ghi thì vẽ dạng "chờ" mờ nhạt, không giả lập tiếng Hò. */
export function Waveform({ seed = 1, progress = 0, idle = true }: { seed?: number; progress?: number; idle?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = c.clientWidth
      const h = c.clientHeight
      c.width = w * dpr
      c.height = h * dpr
      const g = c.getContext('2d')
      if (!g) return
      g.scale(dpr, dpr)
      const styles = getComputedStyle(c)
      const played = styles.getPropertyValue('--lotus').trim() || '#e0869f'
      const rest = styles.getPropertyValue('--line-2').trim() || '#d3dfe8'
      const bars = Math.floor(w / 5)
      let s = seed * 9301
      for (let i = 0; i < bars; i++) {
        s = (s * 9301 + 49297) % 233280
        const r = s / 233280
        // dáng câu hò: dài, ngân, lúc cao lúc thấp
        const env = 0.25 + 0.75 * Math.abs(Math.sin((i / bars) * Math.PI * 2.3 + seed)) * (0.6 + 0.4 * Math.sin(i * 0.05))
        const bh = Math.max(3, env * r * h * 0.9 + h * 0.08)
        g.fillStyle = i / bars < progress ? played : rest
        g.globalAlpha = idle ? 0.7 : 1
        const x = i * 5
        g.beginPath()
        g.roundRect(x, (h - bh) / 2, 3, bh, 2)
        g.fill()
      }
    }
    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(c)
    return () => ro.disconnect()
  }, [seed, progress, idle, theme])
  return <canvas ref={ref} className="waveform" aria-hidden="true" />
}

export function TiltBox({ className, children, as = 'div', ...rest }: { className?: string; children: ReactNode; as?: 'div' | 'article' } & Record<string, unknown>) {
  const ref = useTilt<HTMLDivElement>(6)
  const Tag = as
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

export function formatDuration(sec?: number) {
  if (!sec) return '--:--'
  const m = Math.floor(sec / 60)
  const s = Math.round(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
