import { Link } from 'react-router-dom'
import RiverCanvas from '../components/RiverCanvas'
import Record from '../components/Record'
import { ArtistCard, Cite, FlipCard, SourceCard } from '../components/cards'
import { HoDivider, SectionHead, TiltBox } from '../components/ui'
import { IconArrow, IconMute, IconWave } from '../components/icons'
import { site } from '../data/site'
import { artists, artistById } from '../data/artists'
import { chapters, facts, verse } from '../data/heritage'
import { books, sources } from '../data/sources'
import { themeMood, useTheme } from '../hooks/useTheme'
import { useAmbient } from '../hooks/useAmbient'
import { useReveal } from '../hooks/useMotion'
import { scopeFor } from '../three/moods'

const doors = [
  { to: '/cau-chuyen', no: 'I', title: 'Câu chuyện', body: 'Từ mùa khẩn hoang đến ngày thành di sản.' },
  { to: '/nghe-si', no: 'II', title: 'Nghệ sĩ', body: 'Những người đã hò, đã giữ và đã hồi sinh.' },
  { to: '/nghe-ho', no: 'III', title: 'Nghe Hò', body: 'Nghe gì trong một câu hò trăm năm.' },
  { to: '/thu-ho', no: 'IV', title: 'Thử Hò', body: 'Trải nghiệm và trắc nghiệm vui.' },
]

export default function Home() {
  const { theme } = useTheme()
  const mood = themeMood(theme)
  const ambient = useAmbient()
  const root = useReveal<HTMLDivElement>()
  const kim = artistById('kim-nhuy')!
  const keepers = artists.filter((a) => ['song-anh', 'cao-van-ly', 'tran-van-khe', 'nguoi-dan'].includes(a.id))
  const press = sources.filter((s) => ['cand-hay-nhat', 'nhandan-hoi-sinh', 'cantho-ru-lai'].includes(s.id))

  return (
    <div ref={root}>
      <section className={`hero ${scopeFor(mood)}`}>
        <RiverCanvas mood={mood} label="Chiếc xuồng trên sông Đồng Tháp Mười, một đường tiếng hò vang sang bờ bên kia" />
        <div className="wrap hero-inner">
          <div className="hero-title">
            <span className="place">Tiếng hò Đồng Tháp</span>
            <h1 className="big" aria-label="Nam Âm">
              <span>Nam</span> <span>Âm</span>
            </h1>
          </div>
          <div className="hero-side">
            <p className="tagline">{site.tagline}</p>
            <p style={{ color: 'var(--ink-2)', maxWidth: '46ch' }}>{site.intro}</p>
            <div className="hero-actions">
              <Link to="/cau-chuyen" className="btn btn-primary">
                Nghe câu chuyện <IconArrow />
              </Link>
              <Link to="/nghe-si/kim-nhuy" className="btn btn-ghost">
                Gặp Kim Nhụy
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

      {/* Lối vào */}
      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className="doors">
            {doors.map((d) => (
              <TiltBox key={d.to} className="door" data-reveal>
                <Link to={d.to} style={{ position: 'absolute', inset: 0, borderRadius: 'inherit' }} aria-label={d.title} />
                <i>{d.no}</i>
                <b>{d.title}</b>
                <span>{d.body}</span>
              </TiltBox>
            ))}
          </div>
        </div>
      </section>

      {/* Bạn có biết */}
      <section className="section alt">
        <span className="vertical-note">Đồng Tháp Mười</span>
        <div className="wrap">
          <SectionHead
            eyebrow="Hò Đồng Tháp trong một phút"
            title={
              <>
                Bạn có <i>biết?</i>
              </>
            }
            lede="Sáu điều ít người biết về điệu hò của vùng đất Sen Hồng. Chạm vào thẻ để lật."
          />
          <div className="flip-grid">
            {facts.map((f, i) => (
              <FlipCard key={f.front} fact={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Kim Nhụy */}
      <section className="section">
        <div className="wrap spotlight">
          <div data-reveal>
            <Record />
          </div>
          <div className="stack" data-reveal>
            <p className="eyebrow">{kim.title}</p>
            <p className="name-xl">Kim Nhụy</p>
            <p className="lede">{kim.lead}</p>
            <p style={{ color: 'var(--ink-2)', maxWidth: '58ch' }}>
              Năm 1957, Đài Tiếng nói Việt Nam thu giọng hò của bà trên đĩa 45 vòng. Cuộn băng ấy sang tới Pháp, và GS Trần Văn Khê mang điệu hò đi giới thiệu ở hơn 60
              quốc gia.
            </p>
            {kim.quote && (
              <blockquote className="quote" style={{ margin: 0 }}>
                {kim.quote.text}
                <small>{kim.quote.by}</small>
              </blockquote>
            )}
            <div className="row">
              <Link to="/nghe-si/kim-nhuy" className="btn btn-primary">
                Đọc chuyện đời bà <IconArrow />
              </Link>
            </div>
            <Cite ids={['cand-hay-nhat', 'tuoitre-giong-ho', 'vov-nu-hoang']} />
          </div>
        </div>
      </section>

      <HoDivider />

      {/* Câu hò */}
      <section className="section">
        <div className="wrap verse" data-reveal>
          <p className="eyebrow">Một câu hò được nhắc lại</p>
          <p className="verse-lines">
            {verse.lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
          <p className="muted" style={{ maxWidth: '56ch' }}>
            {verse.caption}
          </p>
          <Cite ids={[verse.source]} />
          <Link to="/nghe-ho" className="link-arrow">
            Nghe gì trong một câu hò <IconArrow />
          </Link>
        </div>
      </section>

      {/* Dòng thời gian rút gọn */}
      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Hai thế kỷ của một điệu hò"
            title={
              <>
                Sinh ra, lặng tiếng, rồi <i>hồi sinh</i>
              </>
            }
          />
          <ol className="timeline">
            {chapters.map((c) => (
              <li key={c.id} data-reveal>
                <span className="yr">{c.era}</span>
                <span className="dot" aria-hidden="true">
                  <i />
                </span>
                <div className="ev">
                  <b>{c.title}</b>
                  <p>{c.body[0]}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link to="/cau-chuyen" className="btn btn-primary">
            Đọc trọn câu chuyện <IconArrow />
          </Link>
        </div>
      </section>

      {/* Người giữ tiếng hò */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Người giữ tiếng hò"
            title={
              <>
                Những người đã <i>hò, giữ và trao lại</i>
              </>
            }
          />
          <div className="artist-grid">
            {keepers.map((a) => (
              <ArtistCard key={a.id} artist={a} />
            ))}
          </div>
          <div className="row" style={{ marginTop: 32 }}>
            <Link to="/nghe-si" className="link-arrow">
              Xem tất cả nghệ sĩ <IconArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Sách báo */}
      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Sách & Báo"
            title={
              <>
                Báo chí viết gì về <i>Hò Đồng Tháp</i>
              </>
            }
          />
          <div className="source-grid">
            {press.map((s) => (
              <SourceCard key={s.id} source={s} />
            ))}
          </div>
          <div className="row" style={{ marginTop: 28 }}>
            <Link to="/sach-bao" className="link-arrow">
              Toàn bộ {sources.length} bài báo và {books.length} cuốn sách <IconArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* Thử Hò */}
      <section className="section">
        <div className="wrap cta-band" data-reveal>
          <div className="stack">
            <p className="eyebrow">Thử Hò</p>
            <h2>
              Bạn hiểu Hò Đồng Tháp <i style={{ color: 'var(--lotus-ink)', fontWeight: 500 }}>đến đâu?</i>
            </h2>
            <p className="lede">Sáu câu hỏi, hai phút, và một cuộc hẹn nhỏ bên bến sông.</p>
          </div>
          <Link to="/thu-ho" className="btn btn-primary">
            Chơi thử <IconArrow />
          </Link>
        </div>
      </section>
    </div>
  )
}
