import { Link } from 'react-router-dom'
import { Portrait } from '../components/cards'
import { PageHead, SectionHead } from '../components/ui'
import { IconArrow } from '../components/icons'
import { advisors, supervisor, team } from '../data/people'
import { site } from '../data/site'
import { themeMood, useTheme } from '../hooks/useTheme'
import { useReveal } from '../hooks/useMotion'

export default function Team() {
  const { theme } = useTheme()
  const root = useReveal<HTMLDivElement>()
  return (
    <div ref={root}>
      <PageHead
        mood={themeMood(theme, 'dusk')}
        crumb="Về Nam Âm"
        eyebrow={site.meaning}
        title={
          <>
            Chúng mình là <i>Nam Âm</i>
          </>
        }
        lede="Năm người trẻ muốn bạn bè đồng trang lứa nghe thấy một giọng hò mà ông bà mình từng nghe: về Đồng Tháp ghi hình, ngồi nghe nghệ nhân kể chuyện, gom lại sách báo và kể lại theo cách của người trẻ."
      />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <SectionHead eyebrow="Thành viên" title={<>Năm <i>giọng</i>, một điệu hò</>} />
          <div className="artist-grid">
            {team.map((m) => (
              <article className="artist-card" key={m.id} data-reveal>
                <Portrait artist={{ name: m.name, photo: m.photo, group: 'lan-toa' }} />
                <span className="ac-group">{m.role}</span>
                <h3>{m.name}</h3>
                <p className="mono muted">{m.code}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Cố vấn"
            title={
              <>
                Những người <i>đồng hành</i>
              </>
            }
            lede="Mọi nội dung văn hoá đi qua ba bước: xác minh chuyên môn, rà soát văn hoá, rồi mới phát triển thành câu chuyện."
          />
          <div className="artist-grid">
            {advisors.map((a) => (
              <article className="artist-card" key={a.id} data-reveal>
                <Portrait artist={{ name: a.name, group: a.id === 'song-anh' ? 'truyen-nghe' : 'phuc-hoi' }} />
                <span className="ac-group">{a.role}</span>
                <h3>{a.name}</h3>
                {a.bio && <p className="ac-lead">{a.bio}</p>}
                {a.id === 'song-anh' && (
                  <Link to="/nghe-si/song-anh" className="ac-more">
                    Câu chuyện của cô Song Anh <IconArrow />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap two-col">
          <div className="stack" data-reveal>
            <p className="eyebrow">Giảng viên hướng dẫn</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)' }}>{supervisor.name}</h2>
          </div>
          <div className="stack" data-reveal>
            <p className="eyebrow">Vì sao tên Nam Âm?</p>
            <p className="lede">
              "Nam" là phương Nam, là miền Tây sông nước. "Âm" là âm thanh, là giọng hò. Nam Âm là tiếng của phương Nam, và nhóm muốn tiếng ấy vang tới tai người trẻ hôm nay.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
