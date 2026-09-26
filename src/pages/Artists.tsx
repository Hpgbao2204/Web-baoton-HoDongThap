import { useState } from 'react'
import { ArtistCard } from '../components/cards'
import { PageHead } from '../components/ui'
import { artists, groupLabels } from '../data/artists'
import type { Artist } from '../data/types'
import { themeMood, useTheme } from '../hooks/useTheme'
import { useReveal } from '../hooks/useMotion'

const order: Artist['group'][] = ['nguon-coi', 'huyen-thoai', 'truyen-nghe', 'phuc-hoi', 'lan-toa']

export default function Artists() {
  const { theme } = useTheme()
  const root = useReveal<HTMLDivElement>()
  const [group, setGroup] = useState<Artist['group'] | 'all'>('all')
  const list = group === 'all' ? artists : artists.filter((a) => a.group === group)

  return (
    <div ref={root}>
      <PageHead
        mood={themeMood(theme, 'dusk')}
        crumb="Nghệ sĩ"
        eyebrow="Người giữ tiếng hò"
        title={
          <>
            Những con người <i>của điệu hò</i>
          </>
        }
        lede="Người hò đầu tiên không để lại tên. Sau họ là một cô gái Thanh Bình, một vị giáo sư ở Paris, những nhạc sĩ lặn lội đi tìm, và người con nối giọng mẹ."
      />
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="filters" role="group" aria-label="Lọc theo nhóm">
            <button type="button" className="chip" aria-pressed={group === 'all'} onClick={() => setGroup('all')}>
              Tất cả
            </button>
            {order.map((g) => (
              <button key={g} type="button" className="chip" aria-pressed={group === g} onClick={() => setGroup(g)}>
                {groupLabels[g]}
              </button>
            ))}
          </div>
          <div className="artist-grid" key={group}>
            {list.map((a) => (
              <ArtistCard key={a.id} artist={a} />
            ))}
          </div>
          <p className="note" style={{ marginTop: 36 }}>
            Chân dung đang là tranh minh hoạ. Ảnh thật sẽ được cập nhật khi có sự đồng ý của gia đình và người giữ bản quyền.
          </p>
        </div>
      </section>
    </div>
  )
}
