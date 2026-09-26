import { useEffect, useRef, useState } from 'react'
import { typeLabels } from '../data/archive'
import { statusLabels } from '../data/heritage'
import type { ArchiveItem } from '../data/types'
import { useTilt } from '../hooks/useMotion'
import { IconClose, IconPause, IconPlay } from './icons'
import { SampleBadge, StatusBadge, Waveform, formatDuration } from './ui'

/** Ảnh bìa tạm cho từng loại tư liệu: sóng nước + trăng, màu theo trạng thái nguồn gốc. */
export function Thumb({ item }: { item: ArchiveItem }) {
  if (item.imageUrl) return <img src={item.imageUrl} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
  const tone = statusLabels[item.status].tone
  const n = item.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const ox = 60 + (n % 5) * 50
  const fill = tone === 'new' ? 'var(--lotus-soft)' : tone === 'pending' ? 'var(--pending-bg)' : 'var(--river-soft)'
  const stroke = tone === 'new' ? 'var(--lotus)' : 'var(--river)'
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="180" fill={fill} />
      <circle cx={ox} cy={62} r={22} fill="var(--surface)" opacity="0.85" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M-10 ${104 + i * 16} C 40 ${94 + i * 16 + (n % 7)}, 90 ${116 + i * 16}, 160 ${104 + i * 16} S 280 ${94 + i * 16}, 330 ${106 + i * 16}`}
          fill="none"
          stroke={stroke}
          strokeWidth={1.4}
          opacity={0.25 + i * 0.14}
        />
      ))}
      {item.type === 'audio' || item.type === 'interview' ? (
        <path d={`M${ox + 30} 70 C ${ox + 90} 20, ${ox + 150} 110, 300 40`} fill="none" stroke="var(--lotus-ink)" strokeWidth="1.8" strokeDasharray="3 6" />
      ) : null}
    </svg>
  )
}

export function ArchiveCard({ item, onOpen }: { item: ArchiveItem; onOpen: (i: ArchiveItem) => void }) {
  const ref = useTilt<HTMLButtonElement>(5)
  return (
    <button ref={ref} type="button" className="a-card" onClick={() => onOpen(item)} data-reveal>
      <div className="a-thumb">
        <Thumb item={item} />
        <span className="type">{typeLabels[item.type]}</span>
      </div>
      <div className="a-body">
        <div className="a-badges">
          <StatusBadge status={item.status} />
          {item.sample && <SampleBadge />}
        </div>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        <div className="a-meta">
          {item.durationSeconds ? <span className="mono">{formatDuration(item.durationSeconds)}</span> : null}
          {item.provenance.location && <span>{item.provenance.location}</span>}
          {item.context && <span>{item.context}</span>}
        </div>
      </div>
    </button>
  )
}

function Row({ k, v }: { k: string; v?: string | string[] }) {
  const val = Array.isArray(v) ? v.join(', ') : v
  return (
    <>
      <dt>{k}</dt>
      <dd className={val ? '' : 'none'}>{val || 'Chưa cập nhật'}</dd>
    </>
  )
}

/** Bảng nguồn gốc: trả lời "cái này từ đâu, ai hò, ai xác minh, có được dùng lại không". */
export function ProvenanceTable({ item }: { item: ArchiveItem }) {
  const p = item.provenance
  const isNew = statusLabels[item.status].tone === 'new'
  return (
    <dl className="prov">
      <Row k="Trạng thái" v={statusLabels[item.status].label} />
      {!isNew && <Row k="Người hò / cung cấp" v={item.performer} />}
      {isNew && <Row k="Dựa trên" v={p.basedOn} />}
      {isNew && <Row k="Phần sáng tạo" v={p.creativeChanges} />}
      <Row k="Nguồn" v={p.source} />
      <Row k="Người thu thập" v={p.collectedBy} />
      <Row k="Ngày ghi" v={p.recordedAt} />
      <Row k="Địa điểm" v={p.location} />
      <Row k="Xác minh bởi" v={p.verifiedBy} />
      <Row k="Quyền sử dụng" v={p.rights} />
      <Row k="Đồng ý công bố" v={p.consent} />
    </dl>
  )
}

export function AudioPlayer({ item, seed = 3 }: { item?: ArchiveItem; seed?: number }) {
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const has = !!item?.audioUrl

  useEffect(() => {
    const a = audio.current
    if (!a) return
    const t = () => setProgress(a.duration ? a.currentTime / a.duration : 0)
    const end = () => setPlaying(false)
    a.addEventListener('timeupdate', t)
    a.addEventListener('ended', end)
    return () => {
      a.removeEventListener('timeupdate', t)
      a.removeEventListener('ended', end)
    }
  }, [has])

  const toggle = () => {
    const a = audio.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      void a.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  return (
    <div className="player">
      <button type="button" className="play-btn" onClick={toggle} disabled={!has} aria-label={has ? (playing ? 'Tạm dừng' : 'Phát') : 'Chưa có bản ghi'}>
        {playing ? <IconPause /> : <IconPlay />}
      </button>
      <div className="player-body">
        <div className="player-title">
          <b>{item?.title ?? 'Một tiếng Hò từ Đồng Tháp Mười'}</b>
          {item ? <StatusBadge status={item.status} /> : <span className="badge pending">Chờ bản ghi</span>}
        </div>
        <Waveform seed={seed} progress={progress} idle={!has} />
        <div className="player-foot">
          <span>{has ? item?.performer : 'Bản ghi sẽ được cập nhật sau khi cố vấn chuyên môn xác minh.'}</span>
          <span className="mono">{formatDuration(item?.durationSeconds)}</span>
        </div>
      </div>
      {has && <audio ref={audio} src={item!.audioUrl} preload="none" />}
    </div>
  )
}

export function ArchiveDrawer({ item, onClose }: { item: ArchiveItem | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!item) return
    closeRef.current?.focus()
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', k)
      document.body.style.overflow = ''
    }
  }, [item, onClose])
  if (!item) return null
  return (
    <>
      <div className="drawer-back" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={item.title}>
        <button ref={closeRef} type="button" className="icon-btn drawer-close" onClick={onClose} aria-label="Đóng">
          <IconClose />
        </button>
        <div className="a-thumb" style={{ borderRadius: 18 }}>
          <Thumb item={item} />
          <span className="type">{typeLabels[item.type]}</span>
        </div>
        <div className="a-badges">
          <StatusBadge status={item.status} />
          {item.sample && <SampleBadge />}
        </div>
        <h2 style={{ fontSize: '2.2rem' }}>{item.title}</h2>
        <p style={{ color: 'var(--ink-2)' }}>{item.summary}</p>
        {item.type === 'audio' && <AudioPlayer item={item} seed={item.id.length} />}
        {item.lyrics ? (
          <div className="stack">
            <p className="eyebrow">Lời hò</p>
            <p style={{ whiteSpace: 'pre-line', fontFamily: 'var(--f-display)', fontSize: '1.3rem', fontStyle: 'italic' }}>{item.lyrics}</p>
          </div>
        ) : null}
        <div className="stack">
          <p className="eyebrow">Nguồn gốc</p>
          <ProvenanceTable item={item} />
        </div>
        {item.sample && (
          <p className="note">Đây là mục mẫu để hình dung bố cục. Tư liệu thật sẽ thay thế khi nhóm cập nhật dữ liệu.</p>
        )}
      </aside>
    </>
  )
}
