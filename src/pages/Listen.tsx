import { Link } from 'react-router-dom'
import Record from '../components/Record'
import { Cite } from '../components/cards'
import { PageHead, SectionHead } from '../components/ui'
import { IconArrow } from '../components/icons'
import { lullaby, traits, verse } from '../data/heritage'
import { listenLinks } from '../data/sources'
import { themeMood, useTheme } from '../hooks/useTheme'
import { useReveal } from '../hooks/useMotion'

/** Hình minh hoạ "dáng" một câu hò: rất dài, chia nhiều khúc, lúc rất cao lúc rất thấp. */
function HoShape() {
  return (
    <div className="sor-wrap">
      <svg className="ho-shape" viewBox="0 0 900 220" role="img" aria-label="Minh hoạ một câu hò dài chia nhiều khúc, lúc lên rất cao, lúc xuống rất thấp">
        <line x1="0" y1="40" x2="900" y2="40" className="guide" />
        <line x1="0" y1="180" x2="900" y2="180" className="guide" />
        <text x="6" y="30" className="lbl">rất cao</text>
        <text x="6" y="206" className="lbl">rất thấp</text>
        <path
          className="shape"
          d="M20 120 C 60 120, 70 50, 120 48 S 190 60, 210 110 C 225 150, 250 170, 290 172 S 360 150, 380 120 M 410 110 C 440 90, 470 44, 520 44 S 590 70, 600 118 C 612 160, 640 178, 690 176 S 780 140, 800 118 S 860 104, 880 106"
        />
        {[{ x: 20, t: 'khúc 1' }, { x: 410, t: 'khúc 2' }, { x: 800, t: 'ngân dài' }].map((k) => (
          <g key={k.t}>
            <line x1={k.x} y1="60" x2={k.x} y2="200" className="tick" />
            <text x={k.x + 6} y="214" className="lbl">{k.t}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function Listen() {
  const { theme } = useTheme()
  const root = useReveal<HTMLDivElement>()
  return (
    <div ref={root}>
      <PageHead
        mood={themeMood(theme, 'dusk')}
        crumb="Nghe Hò"
        eyebrow="Nghe Hò"
        title={
          <>
            Nghe một câu hò <i>trăm năm</i>
          </>
        }
        lede="Đeo tai nghe, chọn một bản thu, rồi đọc hướng dẫn bên dưới để biết mình đang nghe gì."
      />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap spotlight">
          <div data-reveal>
            <Record />
          </div>
          <div className="stack" data-reveal>
            <p className="eyebrow">Nghe ở đâu</p>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)' }}>Những bản thu có thể nghe ngay</h2>
            <ul className="plain-list">
              {listenLinks.map((l) => (
                <li key={l.url}>
                  <span>
                    <a href={l.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', fontWeight: 600, textUnderlineOffset: 3 }}>
                      {l.title}
                    </a>
                    <span className="muted"> · {l.where}</span>
                    <br />
                    <span style={{ fontSize: '0.88rem' }}>{l.note}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="note">Các liên kết mở trang gốc trong thẻ mới. Nam Âm không lưu trữ lại bản thu của đơn vị khác.</p>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Hướng dẫn nghe"
            title={
              <>
                Nghe gì trong <i>một câu hò?</i>
              </>
            }
            lede="Một câu Hò Đồng Tháp rất dài, được chia làm nhiều khúc. Giọng hò đi từ rất cao xuống rất thấp, lúc nhặt lúc khoan. Hình dưới đây chỉ minh hoạ dáng câu hò, không phải bản ký âm."
          />
          <div data-reveal>
            <HoShape />
          </div>
          <div className="trait-grid" style={{ marginTop: 36 }} data-reveal>
            {traits.map((t) => (
              <div className="trait" key={t.name}>
                <b>{t.name}</b>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap two-col">
          <div className="verse" data-reveal>
            <p className="eyebrow">Câu hò năm 1957</p>
            <p className="verse-lines" style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)' }}>
              {verse.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
            <p className="muted">{verse.caption}</p>
            <Cite ids={[verse.source]} />
          </div>
          <div className="verse" data-reveal>
            <p className="eyebrow">Tiếng ru trong phim "Nổi gió"</p>
            <p className="verse-lines" style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)' }}>
              {lullaby.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </p>
            <p className="muted">{lullaby.caption}</p>
            <Cite ids={[lullaby.source]} />
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 48 }}>
          <Link to="/thu-ho" className="btn btn-primary">
            Nghe xong rồi, thử Hò <IconArrow />
          </Link>
        </div>
      </section>
    </div>
  )
}
