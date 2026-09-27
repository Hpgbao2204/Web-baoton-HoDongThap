import { useMemo, useState } from 'react'
import { SourceCard } from '../components/cards'
import { PageHead, SectionHead } from '../components/ui'
import { IconSearch } from '../components/icons'
import { books, sources } from '../data/sources'
import type { Source } from '../data/types'
import { themeMood, useTheme } from '../hooks/useTheme'
import { useReveal } from '../hooks/useMotion'

const topics = [
  { id: 'all', label: 'Tất cả' },
  { id: 'kim-nhuy', label: 'Kim Nhụy' },
  { id: 'song-anh', label: 'Song Anh' },
  { id: 'tran-van-khe', label: 'Trần Văn Khê' },
  { id: 'cao-van-ly', label: 'Cao Văn Lý' },
  { id: 'nguon-goc', label: 'Nguồn gốc' },
  { id: 'dac-diem', label: 'Đặc điểm' },
  { id: 'phuc-hoi', label: 'Phục hồi' },
  { id: 'di-san', label: 'Di sản' },
]

const kinds: { id: Source['kind'] | 'all'; label: string }[] = [
  { id: 'all', label: 'Mọi loại' },
  { id: 'bao', label: 'Báo' },
  { id: 'chinh-thuc', label: 'Nguồn chính thức' },
  { id: 'am-thanh', label: 'Nghe' },
]

export default function Press() {
  const { theme } = useTheme()
  const root = useReveal<HTMLDivElement>()
  const [topic, setTopic] = useState('all')
  const [kind, setKind] = useState<Source['kind'] | 'all'>('all')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const n = q.trim().toLowerCase()
    return sources.filter(
      (s) =>
        (topic === 'all' || s.tags.includes(topic)) &&
        (kind === 'all' || s.kind === kind) &&
        (!n || `${s.title} ${s.outlet} ${s.summary}`.toLowerCase().includes(n)),
    )
  }, [topic, kind, q])

  return (
    <div ref={root}>
      <PageHead
        mood={themeMood(theme, 'day')}
        crumb="Sách & Báo"
        eyebrow="Tư liệu"
        title={
          <>
            Sách & <i>báo chí</i>
          </>
        }
        lede={`${books.length} cuốn sách nền tảng và ${sources.length} bài báo, chương trình phát thanh, trang chính thức viết về Hò Đồng Tháp. Mỗi mục dẫn tới bài gốc.`}
      />

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <SectionHead eyebrow="Sách" title={<>Những công trình <i>sưu tầm</i></>} />
          <div className="source-grid">
            {books.map((b) => (
              <SourceCard key={b.id} source={b} />
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead eyebrow="Báo chí & phát thanh" title={<>Người ta đã <i>viết gì</i></>} />
          <div className="filters" role="group" aria-label="Lọc theo chủ đề">
            {topics.map((t) => (
              <button key={t.id} type="button" className="chip" aria-pressed={topic === t.id} onClick={() => setTopic(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="filters" role="group" aria-label="Lọc theo loại">
            {kinds.map((k) => (
              <button key={k.id} type="button" className="chip" aria-pressed={kind === k.id} onClick={() => setKind(k.id)}>
                {k.label}
              </button>
            ))}
            <label className="search">
              <IconSearch />
              <input id="press-search" type="search" placeholder="Tìm bài viết…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Tìm bài viết" />
            </label>
          </div>
          {list.length ? (
            <div className="source-grid" key={topic + kind}>
              {list.map((s) => (
                <SourceCard key={s.id} source={s} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <b>Chưa có bài phù hợp</b>
              <p>Thử chọn chủ đề khác hoặc tìm bằng từ khác.</p>
            </div>
          )}
          <p className="note" style={{ marginTop: 32 }}>
            Biết thêm bài viết, sách hay phóng sự về Hò Đồng Tháp? Gửi cho nhóm Nam Âm để bổ sung vào thư viện.
          </p>
        </div>
      </section>
    </div>
  )
}
