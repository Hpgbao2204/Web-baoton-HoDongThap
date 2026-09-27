import { useState } from 'react'
import { Link } from 'react-router-dom'
import RiverCanvas from '../components/RiverCanvas'
import { IconArrow } from '../components/icons'
import { phases, story } from '../data/campaign'
import { site } from '../data/site'
import { useReveal } from '../hooks/useMotion'
import { scopeFor } from '../three/moods'

export default function Campaign() {
  const root = useReveal<HTMLDivElement>()
  const [idx, setIdx] = useState(0)
  const phase = phases[idx]

  return (
    <div ref={root}>
      <section className={`campaign-stage ${scopeFor(phase.mood)}`}>
        <RiverCanvas mood={phase.mood} label={`Dòng sông lúc ${phase.when.toLowerCase()}`} />
        <div className="wrap">
          <p className="crumb">
            <Link to="/">Trang chủ</Link> / Hoạt động
          </p>
          <p className="eyebrow">Hoạt động của Nam Âm</p>
          <h1 style={{ fontSize: 'clamp(2.6rem, 6.5vw, 4.8rem)' }}>
            Hẹn Hò <i style={{ color: 'var(--lotus-ink)', fontWeight: 500 }}>Đồng Tháp</i>
          </h1>
          <p className="lede">
            Chuỗi hoạt động của {site.brand} mời người trẻ gặp Hò Đồng Tháp ngoài đời thật: nghe câu chuyện, gặp nghệ nhân, rồi cùng ngồi bên bến nước một đêm trăng.
          </p>
          <div className="phase-strip" role="tablist" aria-label="Ba giai đoạn chiến dịch">
            {phases.map((p, i) => (
              <button key={p.id} type="button" role="tab" aria-selected={i === idx} className="phase-chip" aria-pressed={i === idx} onClick={() => setIdx(i)}>
                <span className={`swatch ${p.mood}`} />
                <b>{p.name}</b>
                <span>{p.when}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap phase-detail" key={phase.id}>
          <div className="stack step-panel">
            <p className="eyebrow">
              Giai đoạn {idx + 1} / {phases.length} · {phase.purpose}
            </p>
            <h3>{phase.name}</h3>
            <p className="lede">{phase.body}</p>
          </div>
          <div className="stack step-panel">
            <p className="eyebrow">Hoạt động dự kiến</p>
            <div className="tag-list">
              {phase.tactics.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p className="note">Lịch, địa điểm và trạng thái triển khai sẽ được cập nhật theo kế hoạch chính thức của nhóm.</p>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap two-col">
          <div className="stack" data-reveal>
            <p className="eyebrow">Câu chuyện</p>
            <h2>
              Đi tìm người <i style={{ color: 'var(--lotus-ink)', fontWeight: 500 }}>đã đáp lời</i>
            </h2>
            <p className="lede">
              Hành trình của nhân vật song song với hành trình của người xem: nghe, lần theo, hiểu, rồi đáp lời.
            </p>
            <p className="note">Giao duyên chỉ là lối vào câu chuyện. Hò Đồng Tháp không chỉ là hát tỏ tình.</p>
          </div>
          <ol className="story" data-reveal>
            {story.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap cta-band" data-reveal>
          <div className="stack">
            <p className="eyebrow">Key visual</p>
            <h2>
              Đêm Trăng <i style={{ color: 'var(--lotus-ink)', fontWeight: 500 }}>Bến Nước</i>
            </h2>
            <p className="lede">Bến nước là điểm gặp. Ánh trăng là khoảnh khắc hẹn. Tiếng hò là sợi dây nối người với người.</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => { setIdx(2); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            Xem đêm trăng <IconArrow />
          </button>
        </div>
      </section>
    </div>
  )
}
