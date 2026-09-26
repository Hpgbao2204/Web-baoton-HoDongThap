import PersonCard from '../components/PersonCard'
import { PageHead, SectionHead } from '../components/ui'
import { supervisor, team } from '../data/people'
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
        crumb="Nam Âm"
        eyebrow="Nhóm thực hiện"
        title={
          <>
            Chúng mình là <i>Nam Âm</i>
          </>
        }
        lede={`Năm người trẻ cùng làm ${site.brand}: nghiên cứu, về Đồng Tháp ghi hình, lắng nghe nghệ nhân và thiết kế những cách để bạn bè đồng trang lứa gặp gỡ Hò.`}
      />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <SectionHead eyebrow="Thành viên" title={<>Năm <i>giọng</i>, một cuộc hẹn</>} />
          <div className="people-grid">
            {team.map((m) => (
              <PersonCard key={m.id} person={m} showCode />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap two-col">
          <div className="stack" data-reveal>
            <p className="eyebrow">Hướng dẫn</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)' }}>{supervisor.name}</h2>
            <p className="lede">{supervisor.role}</p>
            <p className="note">{supervisor.verification}</p>
          </div>
          <div className="stack" data-reveal>
            <p className="eyebrow">Cách nhóm làm việc</p>
            <p className="lede">
              Dự án không nhằm "cứu" hay "hồi sinh" Hò. Nhóm muốn góp phần giúp người trẻ nhận biết đúng, hiểu bối cảnh, thấy gần gũi và có thêm cơ hội tham gia. Mọi nội dung
              văn hoá đều qua cố vấn chuyên môn trước khi công bố.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
