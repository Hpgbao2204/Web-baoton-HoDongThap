import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHead, SectionHead, VerifyFlag } from '../components/ui'
import { IconArrow } from '../components/icons'
import { references, timeline, topics } from '../data/heritage'
import { themeMood, useTheme } from '../hooks/useTheme'
import { useReveal } from '../hooks/useMotion'

export default function Explore() {
  const { theme } = useTheme()
  const root = useReveal<HTMLDivElement>()
  const [active, setActive] = useState(topics[0].id)

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' },
    )
    topics.forEach((t) => {
      const el = document.getElementById(t.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div ref={root}>
      <PageHead
        mood={themeMood(theme, 'day')}
        crumb="Khám phá Hò"
        eyebrow="Hiểu Hò"
        title={
          <>
            Khám phá <i>Hò Đồng Tháp</i>
          </>
        }
        lede="Ai hò, hò ở đâu, hò lúc nào, hò cho ai nghe. Những câu hỏi nhỏ giúp một giọng hò xa lạ trở nên gần hơn."
      />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap topic-layout">
          <nav className="topic-index" aria-label="Mục lục">
            {topics.map((t) => (
              <a key={t.id} href={`#${t.id}`} onClick={go(t.id)} className={active === t.id ? 'on' : ''}>
                {t.title}
              </a>
            ))}
          </nav>
          <div>
            {topics.map((t) => (
              <article key={t.id} id={t.id} className="topic" data-reveal>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <h2 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)' }}>{t.title}</h2>
                  {t.toVerify && <VerifyFlag />}
                </div>
                <p className="lead">{t.lead}</p>
                {t.body.map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Dòng thời gian"
            title={
              <>
                Hò chảy qua <i>hai thế kỷ</i>
              </>
            }
            lede="Các mốc về nguồn gốc còn cần đối chiếu thêm với tư liệu chính thức và cố vấn chuyên môn. Mốc nào chưa chắc đều được đánh dấu."
          />
          <ol className="timeline">
            {timeline.map((e) => (
              <li key={e.year + e.title} data-reveal>
                <span className="yr">{e.year}</span>
                <span className="dot" aria-hidden="true">
                  <i />
                </span>
                <div className="ev">
                  <b>{e.title}</b>
                  <p>{e.body}</p>
                  <div className="row" style={{ gap: 12 }}>
                    {e.source && <span className="src">Nguồn: {e.source}</span>}
                    {e.toVerify && <VerifyFlag />}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap two-col">
          <div className="stack" data-reveal>
            <p className="eyebrow">Tài liệu nền tảng</p>
            <h2>
              Đọc thêm từ <i style={{ color: 'var(--lotus-ink)', fontWeight: 500 }}>nguồn gốc</i>
            </h2>
            <p className="lede">Nội dung trên trang dựa trên các công trình sưu tầm, nghiên cứu và văn bản chính thức sau.</p>
          </div>
          <ul className="plain-list" data-reveal>
            {references.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <div className="wrap" style={{ marginTop: 40 }}>
          <Link to="/nghe-ho" className="btn btn-primary">
            Giờ thì nghe Hò <IconArrow />
          </Link>
        </div>
      </section>
    </div>
  )
}
