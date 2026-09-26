import { Link, useParams } from 'react-router-dom'
import { ArtistCard, Portrait, SourceCard } from '../components/cards'
import { SectionHead, VerifyFlag } from '../components/ui'
import { IconArrow } from '../components/icons'
import { artistById, artists, groupLabels } from '../data/artists'
import { books, sources } from '../data/sources'
import { useReveal } from '../hooks/useMotion'
import NotFound from './NotFound'

export default function ArtistDetail() {
  const { id = '' } = useParams()
  const root = useReveal<HTMLDivElement>()
  const a = artistById(id)
  if (!a) return <NotFound />

  const related = [...sources, ...books].filter((s) => s.tags.includes(a.id))
  const idx = artists.findIndex((x) => x.id === a.id)
  const next = artists[(idx + 1) % artists.length]

  return (
    <div ref={root} key={a.id}>
      <section className="section" style={{ paddingTop: 40, paddingBottom: 56 }}>
        <div className="wrap">
          <p className="crumb" style={{ marginBottom: 22 }}>
            <Link to="/">Trang chủ</Link> / <Link to="/nghe-si">Nghệ sĩ</Link> / {a.name}
          </p>
          <div className="artist-hero">
            <Portrait artist={a} size="lg" />
            <div className="stack">
              <p className="eyebrow">
                {groupLabels[a.group]} · {a.role}
              </p>
              <h1>{a.name}</h1>
              <p className="tagline" style={{ color: 'var(--lotus-ink)' }}>
                {a.title}
              </p>
              <p className="lede">{a.lead}</p>
              <div className="artist-meta">
                {a.years && (
                  <span>
                    <b>Năm</b>
                    {a.years}
                  </span>
                )}
                {a.hometown && (
                  <span>
                    <b>Quê</b>
                    {a.hometown}
                  </span>
                )}
              </div>
              {a.toVerify && <VerifyFlag text={a.toVerify} />}
            </div>
          </div>
        </div>
      </section>

      <section className="section alt" style={{ paddingTop: 64 }}>
        <div className="wrap two-col" style={{ gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1fr)' }}>
          <div className="prose" data-reveal>
            {a.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {a.quote && (
              <blockquote className="quote" style={{ margin: '8px 0 0', fontFamily: 'var(--f-display)', fontStyle: 'italic', fontSize: '1.5rem', lineHeight: 1.35, borderLeft: '2px solid var(--lotus)', paddingLeft: 20 }}>
                {a.quote.text}
                <small style={{ display: 'block', marginTop: 10, fontFamily: 'var(--f-body)', fontStyle: 'normal', fontSize: '0.8rem', color: 'var(--ink-3)' }}>{a.quote.by}</small>
              </blockquote>
            )}
          </div>
          {a.timeline && (
            <div className="stack" data-reveal>
              <p className="eyebrow">Dấu mốc</p>
              <ol className="mini-timeline">
                {a.timeline.map((t) => (
                  <li key={t.year + t.text}>
                    <b>{t.year}</b>
                    <span>{t.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="wrap">
            <SectionHead
              eyebrow="Đọc & nghe thêm"
              title={
                <>
                  Báo chí viết về <i>{a.name}</i>
                </>
              }
            />
            <div className="source-grid">
              {related.map((s) => (
                <SourceCard key={s.id} source={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section alt">
        <div className="wrap two-col" style={{ alignItems: 'center' }}>
          <div className="stack" data-reveal>
            <p className="eyebrow">Người tiếp theo</p>
            <h2>
              Gặp <i style={{ color: 'var(--lotus-ink)', fontWeight: 500 }}>{next.name}</i>
            </h2>
            <Link to="/nghe-si" className="link-arrow">
              Tất cả nghệ sĩ <IconArrow />
            </Link>
          </div>
          <div style={{ maxWidth: 300 }}>
            <ArtistCard artist={next} />
          </div>
        </div>
      </section>
    </div>
  )
}
