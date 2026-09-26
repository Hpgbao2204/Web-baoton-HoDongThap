import { useState } from 'react'
import { ArchiveCard, ArchiveDrawer, AudioPlayer } from '../components/Archive'
import { PageHead, SectionHead } from '../components/ui'
import { archive, sampleArchive } from '../data/archive'
import { statusLabels } from '../data/heritage'
import type { ArchiveItem } from '../data/types'
import { themeMood, useTheme } from '../hooks/useTheme'
import { useReveal } from '../hooks/useMotion'

const guide = [
  { q: 'Tiếng mở câu', a: 'Chú ý cách người hò cất tiếng đầu tiên. Đây là điểm nhiều bạn trẻ nhớ nhất khi nghe lần đầu.' },
  { q: 'Độ dài của câu', a: 'Một câu hò có thể kéo dài, ngân ra, chia thành nhiều khúc. Thử nghe hết một câu trước khi dừng.' },
  { q: 'Cao và thấp', a: 'Giọng hò đi từ rất cao xuống rất thấp. Hãy để ý những chỗ chuyển giọng.' },
  { q: 'Bối cảnh', a: 'Đọc chú thích: người hò đang ở đâu, làm gì, hò cho ai nghe. Cùng một câu hò, bối cảnh khác sẽ cho cảm giác khác.' },
]

export default function Listen() {
  const { theme } = useTheme()
  const root = useReveal<HTMLDivElement>()
  const [open, setOpen] = useState<ArchiveItem | null>(null)
  const real = archive.filter((a) => a.type === 'audio' || a.type === 'video')
  const items = real.length ? real : sampleArchive.filter((a) => a.type === 'audio' || a.type === 'video' || a.type === 'interview')

  return (
    <div ref={root}>
      <PageHead
        mood={themeMood(theme, 'dusk')}
        crumb="Nghe Hò"
        eyebrow="Nghe Hò"
        title={
          <>
            Kho <i>tiếng Hò</i>
          </>
        }
        lede="Mỗi bản ghi đi kèm người hò, nơi ghi, lời hò, chú thích bối cảnh và người xác minh."
      />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap two-col" style={{ alignItems: 'start' }}>
          <div className="stack" data-reveal>
            <AudioPlayer item={real[0]} seed={7} />
            {!real.length && (
              <div className="empty">
                <b>Chưa có bản ghi được công bố</b>
                <p>
                  Nhóm đang tập hợp bản ghi từ chuyến điền dã tại Đồng Tháp và các nguồn sưu tầm. Mỗi bản ghi chỉ lên web sau khi được cố vấn chuyên môn xác minh và có
                  sự đồng ý của người hò.
                </p>
              </div>
            )}
          </div>
          <div className="stack" data-reveal>
            <p className="eyebrow">Hướng dẫn nghe</p>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)' }}>Nghe gì trong một câu hò?</h2>
            <dl className="prov" style={{ gridTemplateColumns: '140px minmax(0,1fr)' }}>
              {guide.map((g) => (
                <div key={g.q} style={{ display: 'contents' }}>
                  <dt style={{ color: 'var(--lotus-ink)', fontWeight: 600, fontSize: '0.9rem' }}>{g.q}</dt>
                  <dd style={{ color: 'var(--ink-2)' }}>{g.a}</dd>
                </div>
              ))}
            </dl>
            <p className="note">Hướng dẫn này sẽ được cố vấn chuyên môn chỉnh sửa và bổ sung.</p>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Bản ghi & video"
            title={
              <>
                Tư liệu <i>âm thanh</i>
              </>
            }
            lede={
              real.length
                ? undefined
                : 'Các thẻ dưới đây là mục mẫu, cho thấy mỗi tư liệu sẽ được trình bày thế nào. Bấm vào để xem bảng nguồn gốc.'
            }
          />
          <div className="legend" style={{ marginBottom: 22 }} data-reveal>
            {(['traditional_reference', 'documented_practice', 'contemporary_interpretation', 'pending'] as const).map((s) => (
              <span key={s} title={statusLabels[s].hint}>
                <span className={`badge ${statusLabels[s].tone}`}>{statusLabels[s].label}</span>
              </span>
            ))}
          </div>
          <div className="archive-grid">
            {items.map((i) => (
              <ArchiveCard key={i.id} item={i} onOpen={setOpen} />
            ))}
          </div>
        </div>
      </section>
      <ArchiveDrawer item={open} onClose={() => setOpen(null)} />
    </div>
  )
}
