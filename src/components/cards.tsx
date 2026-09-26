import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Artist, Fact, Source } from '../data/types'
import { groupLabels } from '../data/artists'
import { outletOf } from '../data/sources'
import { useTilt } from '../hooks/useMotion'
import { IconArrow } from './icons'

const kindLabel: Record<Source['kind'], string> = {
  bao: 'Báo',
  sach: 'Sách',
  'chinh-thuc': 'Nguồn chính thức',
  'am-thanh': 'Nghe',
}

function initials(name: string) {
  const main = name.split('(')[0].split('&')[0].trim().split(/\s+/)
  return main.length === 1 ? main[0].slice(0, 2) : main.slice(-2).map((p) => p[0]).join('')
}

/** Chân dung minh hoạ khi chưa có ảnh được phép sử dụng: vòm cửa, trăng, sóng nước và chữ cái đầu. */
export function Portrait({ artist, size = 'md' }: { artist: Pick<Artist, 'name' | 'photo' | 'group'>; size?: 'md' | 'lg' }) {
  const tilt = useTilt<HTMLDivElement>(7)
  if (artist.photo)
    return (
      <div className={`portrait ${size}`} ref={tilt}>
        <img src={artist.photo} alt={`Chân dung ${artist.name}`} loading="lazy" />
      </div>
    )
  return (
    <div className={`portrait art g-${artist.group} ${size}`} ref={tilt} aria-hidden="true">
      <span className="p-moon" />
      <span className="p-initials">{initials(artist.name)}</span>
      <svg viewBox="0 0 200 90" preserveAspectRatio="none">
        <path d="M0 30 C 30 12, 60 48, 100 30 S 170 12, 200 30 V90 H0Z" className="w1" />
        <path d="M0 52 C 36 36, 70 70, 110 52 S 172 36, 200 52 V90 H0Z" className="w2" />
      </svg>
    </div>
  )
}

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link to={`/nghe-si/${artist.id}`} className="artist-card" data-reveal>
      <Portrait artist={artist} />
      <span className="ac-group">{groupLabels[artist.group]}</span>
      <h3>{artist.name}</h3>
      <p className="ac-title">{artist.title}</p>
      <p className="ac-lead">{artist.lead}</p>
      <span className="ac-more">
        Đọc câu chuyện <IconArrow />
      </span>
    </Link>
  )
}

export function SourceCard({ source, compact = false }: { source: Source; compact?: boolean }) {
  const ref = useTilt<HTMLAnchorElement>(4)
  const body = (
    <>
      <div className="sc-top">
        <span className={`sc-kind k-${source.kind}`}>{kindLabel[source.kind]}</span>
        <span className="sc-outlet">{source.outlet}</span>
        {source.year && <span className="sc-year mono">{source.year}</span>}
      </div>
      <h3>{source.title}</h3>
      {!compact && <p>{source.summary}</p>}
      {source.url && (
        <span className="sc-go">
          {source.kind === 'am-thanh' ? 'Nghe' : 'Đọc'} tại {source.outlet.split('(')[0].trim()} <IconArrow />
        </span>
      )}
    </>
  )
  if (!source.url)
    return (
      <div className="source-card is-book" data-reveal>
        {body}
      </div>
    )
  return (
    <a ref={ref} className="source-card" href={source.url} target="_blank" rel="noopener noreferrer" data-reveal>
      {body}
    </a>
  )
}

/** Dòng nguồn nhỏ dưới một đoạn nội dung. */
export function Cite({ ids }: { ids?: string[] }) {
  if (!ids?.length) return null
  return (
    <p className="cite">
      Nguồn:{' '}
      {ids.map((id, i) => {
        const s = outletOf(id)
        if (!s) return null
        return (
          <span key={id}>
            {i > 0 && ' · '}
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.outlet}
              </a>
            ) : (
              s.outlet
            )}
          </span>
        )
      })}
    </p>
  )
}

export function FlipCard({ fact, index }: { fact: Fact; index: number }) {
  const [open, setOpen] = useState(false)
  const src = fact.source ? outletOf(fact.source) : undefined
  return (
    <button type="button" className={`flip ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-pressed={open} data-reveal>
      <span className="flip-inner">
        <span className="flip-face flip-front">
          <span className="flip-no mono">{String(index + 1).padStart(2, '0')}</span>
          <span className="flip-q">{fact.front}</span>
          <span className="flip-hint">Chạm để lật</span>
        </span>
        <span className="flip-face flip-back">
          <span className="flip-a">{fact.back}</span>
          {src && <span className="flip-src">Theo {src.outlet}</span>}
        </span>
      </span>
    </button>
  )
}
