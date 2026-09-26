import PersonCard from '../components/PersonCard'
import { PageHead, SectionHead } from '../components/ui'
import { advisors } from '../data/people'
import { themeMood, useTheme } from '../hooks/useTheme'
import { useReveal } from '../hooks/useMotion'

export default function Keepers() {
  const { theme } = useTheme()
  const root = useReveal<HTMLDivElement>()
  return (
    <div ref={root}>
      <PageHead
        mood={themeMood(theme, 'dusk')}
        crumb="Người giữ tiếng Hò"
        eyebrow="Con người"
        title={
          <>
            Người giữ <i>tiếng Hò</i>
          </>
        }
        lede="Nghệ nhân, người dạy, người học và những ai đã giúp nhóm hiểu đúng về Hò Đồng Tháp."
      />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <SectionHead
            eyebrow="Cố vấn của dự án"
            title={
              <>
                Ba người <i>đồng hành</i>
              </>
            }
            lede="Mỗi nội dung đi qua ba bước trước khi lên web."
          />
          <div className="workflow" style={{ marginBottom: 40 }} data-reveal>
            <span>Xác minh chuyên môn</span>
            <svg viewBox="0 0 26 10" aria-hidden="true">
              <path d="M1 5 Q7 0 13 5 T25 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>Rà soát văn hoá</span>
            <svg viewBox="0 0 26 10" aria-hidden="true">
              <path d="M1 5 Q7 0 13 5 T25 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>Phát triển nội dung</span>
          </div>
          <div className="people-grid">
            {advisors.map((a) => (
              <PersonCard key={a.id} person={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Kho lời kể"
            title={
              <>
                Những giọng hò <i>đang chờ được kể</i>
              </>
            }
          />
          <div className="empty" data-reveal>
            <b>Hồ sơ nghệ nhân, người dạy và người học</b>
            <p>
              Mỗi hồ sơ sẽ có chân dung, một đoạn giọng hò, trích phỏng vấn, dòng thời gian và các tư liệu liên quan, thay vì chỉ một đoạn tiểu sử. Hồ sơ chỉ được đăng
              khi có sự đồng ý của người được giới thiệu.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
