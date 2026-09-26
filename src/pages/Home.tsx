import { useState } from 'react'
import { Link } from 'react-router-dom'
import RiverCanvas from '../components/RiverCanvas'
import { AudioPlayer } from '../components/Archive'
import { HoDivider, SectionHead, TiltBox } from '../components/ui'
import { IconArrow, IconMute, IconWave } from '../components/icons'
import { facets, journey, site } from '../data/site'
import { awareness, postExposure, priorKnowledge, sample } from '../data/research'
import { phases } from '../data/campaign'
import { archive } from '../data/archive'
import { themeMood, useTheme } from '../hooks/useTheme'
import { useAmbient } from '../hooks/useAmbient'
import { useReveal } from '../hooks/useMotion'
import { scopeFor, type Mood } from '../three/moods'

export default function Home() {
  const { theme } = useTheme()
  const [override, setOverride] = useState<Mood | null>(null)
  const mood = override ?? themeMood(theme)
  const ambient = useAmbient()
  const root = useReveal<HTMLDivElement>()
  const featured = archive.find((a) => a.type === 'audio')

  return (
    <div ref={root}>
      <section className={`hero ${scopeFor(mood)}`}>
        <RiverCanvas mood={mood} label="Chiếc xuồng trên sông Đồng Tháp Mười, một đường tiếng hò vang sang bờ bên kia" />
        <div className="wrap hero-inner">
          <div className="hero-title">
            <h1 className="big" aria-label="Hẹn Hò Đồng Tháp">
              <span>Hẹn</span> <span>Hò</span>
            </h1>
            <span className="place">Đồng Tháp</span>
          </div>
          <div className="hero-side">
            <p className="tagline">{site.tagline}</p>
            <div className="hero-actions">
              <Link to="/nghe-ho" className="btn btn-primary">
                Nghe Hò <IconArrow />
              </Link>
              <Link to="/kham-pha" className="btn btn-ghost">
                Hiểu Hò
              </Link>
              <Link to="/thu-ho" className="btn btn-ghost">
                Cùng Hò
              </Link>
            </div>
            <div className="hero-meta">
              <span>
                <b>{site.heritage.label}</b> · {site.heritage.date}
              </span>
              <button type="button" className="sound-toggle" onClick={ambient.toggle} aria-pressed={ambient.playing}>
                {ambient.playing ? <IconMute /> : <IconWave />}
                {ambient.playing ? 'Tắt tiếng sông' : 'Bật tiếng sông nước'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Không chỉ là một câu hát */}
      <section className="section">
        <span className="vertical-note">Đồng Tháp Mười</span>
        <div className="wrap">
          <SectionHead
            eyebrow="Một tiếng Hò từ Đồng Tháp Mười"
            title={
              <>
                Không chỉ là <i>một câu hát</i>
              </>
            }
            lede={site.keyMessage}
          />
          <div className="facets" data-reveal>
            {facets.map((f) => (
              <div className="facet" key={f.word}>
                <span className="plus" aria-hidden="true">+</span>
                <span className="word">{f.word}</span>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HoDivider />

      {/* Nghe thử */}
      <section className="section">
        <div className="wrap two-col" style={{ alignItems: 'center' }}>
          <div className="stack" data-reveal>
            <p className="eyebrow">Nghe thử</p>
            <h2>
              Nghe trước, <i style={{ color: 'var(--lotus-ink)', fontWeight: 500 }}>hiểu sau</i>
            </h2>
            <p className="lede">
              Hò là thực hành bằng giọng. Mỗi bản ghi trên web sẽ đi kèm người hò, nơi ghi, lời hò và người xác minh, để bạn biết mình đang nghe gì.
            </p>
            <Link to="/nghe-ho" className="link-arrow">
              Vào kho tiếng Hò <IconArrow />
            </Link>
          </div>
          <div data-reveal>
            <AudioPlayer item={featured} />
          </div>
        </div>
      </section>

      {/* Người trẻ biết gì về Hò */}
      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow={`Khảo sát ${sample.n} bạn trẻ ${sample.age} tuổi tại ${sample.place}`}
            title={
              <>
                Người trẻ biết gì về <i>Hò Đồng Tháp?</i>
              </>
            }
          />
          <div className="stat-story">
            <div className="stack" data-reveal>
              <div className="big-num">
                {awareness[0].value}
                <small>%</small>
              </div>
              <p className="lede">
                từng nghe tới Hò Đồng Tháp. {awareness[1].value}% không chắc mình đã nghe hay chưa. Trong {priorKnowledge.n} bạn đã nghe hoặc không chắc,{' '}
                {priorKnowledge.value}% {priorKnowledge.label}.
              </p>
              <div className="stack" style={{ gap: 0 }}>
                <div className="stack-bar" role="img" aria-label="Đã từng nghe 25,5%, không chắc 36,3%, chưa từng nghe 38,2%">
                  <div className="s-heard" style={{ flex: awareness[0].value }}>{awareness[0].value}%</div>
                  <div className="s-unsure" style={{ flex: awareness[1].value }}>{awareness[1].value}%</div>
                  <div className="s-never" style={{ flex: awareness[2].value }}>{awareness[2].value}%</div>
                </div>
                <div className="legend">
                  <span><i style={{ background: 'var(--river-ink)' }} /> Đã từng nghe</span>
                  <span><i style={{ background: 'var(--river)' }} /> Không chắc</span>
                  <span><i style={{ background: 'var(--lotus-soft)', outline: '1px solid var(--lotus)' }} /> Chưa từng nghe</span>
                </div>
              </div>
            </div>
            <div className="stack" data-reveal>
              <p className="eyebrow">Sau vài phút được nghe, được kể bối cảnh</p>
              <div className="hbars">
                {postExposure.map((p) => (
                  <div className="hbar" key={p.label}>
                    <div className="hbar-top">
                      <span>{p.label}</span>
                      <b>{p.value}%</b>
                    </div>
                    <div className="hbar-track">
                      <div className="hbar-fill" style={{ width: `${p.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="note">
                Đây là mức hiểu ngay sau trải nghiệm ngắn, chưa phải kết quả ghi nhớ lâu dài. Người ta có thể cần nhiều hơn một lần nghe: cần bối cảnh, sự kết nối
                và cơ hội được đáp lời.
              </p>
              <Link to="/nghien-cuu" className="link-arrow">
                Xem toàn bộ nghiên cứu <IconArrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hành trình */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Hành trình trên web"
            title={
              <>
                Nghe Hò, Hiểu Hò, <i>Cùng Hò</i>
              </>
            }
            lede="Đi theo thứ tự hay nhảy thẳng tới phần bạn thích đều được. Mỗi bước mở ra một cách gặp gỡ khác với Hò."
          />
          <div className="journey">
            <svg className="journey-line" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
              <path d="M120 60 C 260 20, 330 160, 500 110 S 760 220, 880 160" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" className="flowing" />
            </svg>
            {journey.map((j, i) => (
              <TiltBox key={j.key} className="journey-step" data-reveal>
                <Link to={j.to} style={{ position: 'absolute', inset: 0, borderRadius: 'inherit' }} aria-label={j.title} />
                <span className="step-no">Bước {i + 1} / 3</span>
                <h3>{j.title}</h3>
                <p>{j.body}</p>
                <span className="go">Bắt đầu →</span>
              </TiltBox>
            ))}
          </div>
        </div>
      </section>

      {/* Chiến dịch */}
      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Chiến dịch Hẹn Hò Đồng Tháp"
            title={
              <>
                Một cuộc hẹn qua <i>ba giờ của dòng sông</i>
              </>
            }
            lede="Bấm từng chặng để thấy dòng sông trên đầu trang đổi màu: ban ngày gọi, chiều muộn tỏ lòng, đêm trăng gặp nhau ở bến nước."
          />
          <div className="phase-strip" data-reveal>
            {phases.map((p) => (
              <button
                key={p.id}
                type="button"
                className="phase-chip"
                aria-pressed={mood === p.mood}
                onClick={() => {
                  setOverride(p.mood)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span className={`swatch ${p.mood}`} />
                <b>{p.name}</b>
                <span>{p.purpose} · {p.when}</span>
              </button>
            ))}
          </div>
          <div className="row" style={{ marginTop: 22 }}>
            <Link to="/hen-ho" className="link-arrow">
              Câu chuyện chiến dịch <IconArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Bước vào thư viện */}
      <section className="section">
        <div className="wrap cta-band" data-reveal>
          <div className="stack">
            <p className="eyebrow">Thư viện số</p>
            <h2>
              Bước vào <i style={{ color: 'var(--lotus-ink)', fontWeight: 500 }}>thư viện</i>
            </h2>
            <p className="lede">
              Âm thanh, video, hình ảnh, phỏng vấn và tài liệu. Mỗi mục ghi rõ nguồn gốc và phân biệt tư liệu truyền thống với sáng tạo đương đại.
            </p>
          </div>
          <Link to="/thu-vien" className="btn btn-primary">
            Mở thư viện <IconArrow />
          </Link>
        </div>
      </section>
    </div>
  )
}
