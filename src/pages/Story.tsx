import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RiverCanvas from '../components/RiverCanvas'
import { Cite } from '../components/cards'
import { PageHead, SectionHead } from '../components/ui'
import { IconArrow } from '../components/icons'
import { chapters, traits } from '../data/heritage'
import { books } from '../data/sources'
import { themeMood, useTheme } from '../hooks/useTheme'
import { useReveal } from '../hooks/useMotion'

export default function Story() {
  const { theme } = useTheme()
  const root = useReveal<HTMLDivElement>()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const cur = chapters[Math.max(0, active)]

  return (
    <div ref={root}>
      <PageHead
        mood={themeMood(theme, 'day')}
        crumb="Câu chuyện Hò"
        eyebrow="Câu chuyện Hò Đồng Tháp"
        title={
          <>
            Hai thế kỷ của <i>một giọng hò</i>
          </>
        }
        lede="Cuộn xuống để đi cùng dòng sông: từ mùa khẩn hoang, qua những năm lặng tiếng, đến ngày điệu hò được gọi tên là di sản."
      />

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap story-layout">
          <div className="story-visual">
            <RiverCanvas mood={cur.mood} label={`Dòng sông lúc ${cur.era}`} />
            <div className="story-era">
              <small>
                Chặng {active + 1} / {chapters.length}
              </small>
              <b>{cur.era}</b>
            </div>
          </div>
          <div className="chapters">
            {chapters.map((c, i) => (
              <article key={c.id} id={c.id} className={`chapter ${i === active ? 'on' : ''}`}>
                <span className="era">{c.era}</span>
                <h2>{c.title}</h2>
                {c.body.map((b, j) => (
                  <p key={j}>{b}</p>
                ))}
                {c.highlight && <p className="hl">{c.highlight}</p>}
                <Cite ids={c.sources} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Nghe ra sao"
            title={
              <>
                Điều gì làm nên <i>Hò Đồng Tháp?</i>
              </>
            }
            lede="Sáu nét giúp bạn nhận ra điệu hò này giữa rất nhiều điệu hò Nam Bộ."
          />
          <div className="trait-grid" data-reveal>
            {traits.map((t) => (
              <div className="trait" key={t.name}>
                <b>{t.name}</b>
                <p>{t.body}</p>
                <Cite ids={[t.source]} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap two-col">
          <div className="stack" data-reveal>
            <p className="eyebrow">Đọc thêm</p>
            <h2>
              Những cuốn sách <i style={{ color: 'var(--lotus-ink)', fontWeight: 500 }}>giữ lại điệu hò</i>
            </h2>
            <p className="lede">Nếu muốn đi sâu hơn, đây là các công trình sưu tầm và nghiên cứu nền tảng.</p>
            <Link to="/sach-bao" className="link-arrow">
              Sách & báo <IconArrow />
            </Link>
          </div>
          <ul className="plain-list" data-reveal>
            {books.map((b) => (
              <li key={b.id}>
                <span>
                  <b style={{ color: 'var(--ink)' }}>{b.title}</b>
                  {b.year ? ` (${b.year})` : ''} · {b.outlet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
