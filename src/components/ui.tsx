import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTilt } from '../hooks/useMotion'
import RiverCanvas from './RiverCanvas'
import { IconFlag } from './icons'
import { scopeFor, type Mood } from '../three/moods'

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

export function TiltBox({ className, children, as = 'div', ...rest }: { className?: string; children: ReactNode; as?: 'div' | 'article' } & Record<string, unknown>) {
  const ref = useTilt<HTMLDivElement>(6)
  const Tag = as
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

