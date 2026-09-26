import { Link } from 'react-router-dom'
import { PageHead } from '../components/ui'
import { themeMood, useTheme } from '../hooks/useTheme'

export default function NotFound() {
  const { theme } = useTheme()
  return (
    <>
      <PageHead
        mood={themeMood(theme, 'night')}
        crumb="Không tìm thấy"
        eyebrow="Lạc bến"
        title={
          <>
            Trang này <i>chưa có ai hò</i>
          </>
        }
        lede="Đường dẫn không đúng hoặc trang đã được dời đi."
      />
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <Link to="/" className="btn btn-primary">
            Về trang chủ
          </Link>
        </div>
      </section>
    </>
  )
}
