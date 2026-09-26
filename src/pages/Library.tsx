import { useMemo, useState } from 'react'
import { ArchiveCard, ArchiveDrawer } from '../components/Archive'
import { PageHead } from '../components/ui'
import { IconSearch } from '../components/icons'
import { archive, sampleArchive, typeLabels } from '../data/archive'
import { statusLabels } from '../data/heritage'
import type { ArchiveItem, ArchiveType } from '../data/types'
import { themeMood, useTheme } from '../hooks/useTheme'
import { useReveal } from '../hooks/useMotion'

type Origin = 'all' | 'trad' | 'new'

export default function Library() {
  const { theme } = useTheme()
  const root = useReveal<HTMLDivElement>()
  const [type, setType] = useState<ArchiveType | 'all'>('all')
  const [origin, setOrigin] = useState<Origin>('all')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<ArchiveItem | null>(null)
  const usingSamples = archive.length === 0
  const source = usingSamples ? sampleArchive : archive

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return source.filter((i) => {
      if (type !== 'all' && i.type !== type) return false
      const tone = statusLabels[i.status].tone
      if (origin === 'trad' && tone === 'new') return false
      if (origin === 'new' && tone !== 'new') return false
      if (needle) {
        const hay = [i.title, i.summary, i.context, ...(i.themes ?? [])].join(' ').toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
  }, [source, type, origin, q])

  const types = Object.keys(typeLabels) as ArchiveType[]

  return (
    <div ref={root}>
      <PageHead
        mood={themeMood(theme, 'day')}
        crumb="Thư viện"
        eyebrow="Thư viện số"
        title={
          <>
            Thư viện <i>Hò Đồng Tháp</i>
          </>
        }
        lede="Tìm theo loại tư liệu, theo nguồn gốc, hoặc gõ một chủ đề như sông nước, truyền nghề, ký ức."
      />

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          {usingSamples && (
            <div className="empty" style={{ marginBottom: 28 }}>
              <b>Thư viện đang chờ dữ liệu</b>
              <p>Các thẻ bên dưới là mục mẫu để thấy trước cách trình bày. Khi nhóm thêm tư liệu thật, mục mẫu sẽ tự ẩn.</p>
            </div>
          )}

          <div className="filters" role="group" aria-label="Lọc theo loại">
            <button type="button" className="chip" aria-pressed={type === 'all'} onClick={() => setType('all')}>
              Tất cả
            </button>
            {types.map((t) => (
              <button key={t} type="button" className="chip" aria-pressed={type === t} onClick={() => setType(t)}>
                {typeLabels[t]}
              </button>
            ))}
            <label className="search">
              <IconSearch />
              <input id="library-search" type="search" placeholder="Tìm tư liệu…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Tìm tư liệu" />
            </label>
          </div>
          <div className="filters" role="group" aria-label="Lọc theo nguồn gốc">
            <span className="muted" style={{ fontSize: '0.85rem', marginRight: 4 }}>
              Nguồn gốc:
            </span>
            <button type="button" className="chip" aria-pressed={origin === 'all'} onClick={() => setOrigin('all')}>
              Tất cả
            </button>
            <button type="button" className="chip" aria-pressed={origin === 'trad'} onClick={() => setOrigin('trad')}>
              Truyền thống & ghi lại
            </button>
            <button type="button" className="chip" aria-pressed={origin === 'new'} onClick={() => setOrigin('new')}>
              Sáng tạo đương đại
            </button>
          </div>

          {list.length ? (
            <div className="archive-grid">
              {list.map((i) => (
                <ArchiveCard key={i.id} item={i} onOpen={setOpen} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <b>Không có tư liệu phù hợp</b>
              <p>Thử bỏ bớt bộ lọc hoặc tìm bằng từ khác.</p>
            </div>
          )}
        </div>
      </section>
      <ArchiveDrawer item={open} onClose={() => setOpen(null)} />
    </div>
  )
}
