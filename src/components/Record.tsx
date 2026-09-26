import { useState } from 'react'
import { useTilt } from '../hooks/useMotion'

/**
 * Đĩa hát 45 vòng năm 1957 — nơi Đài Tiếng nói Việt Nam giữ lại giọng hò Kim Nhụy.
 * Dựng bằng CSS 3D: đĩa nghiêng theo con trỏ, bấm để quay/dừng, kim đĩa hạ xuống khi quay.
 */
export default function Record({ label = 'Hò Đồng Tháp', sub = 'Kim Nhụy · 1957' }: { label?: string; sub?: string }) {
  const [spin, setSpin] = useState(true)
  const tilt = useTilt<HTMLDivElement>(14)
  return (
    <div className="record-stage" ref={tilt}>
      <button type="button" className={`record ${spin ? 'is-spinning' : ''}`} onClick={() => setSpin((s) => !s)} aria-pressed={spin} aria-label={spin ? 'Dừng đĩa' : 'Quay đĩa'}>
        <span className="record-disc">
          <span className="record-label">
            <b>{label}</b>
            <span className="record-hole" />
            <small>{sub}</small>
            <i>45 vòng/phút</i>
          </span>
        </span>
      </button>
      <span className={`tonearm ${spin ? 'down' : ''}`} aria-hidden="true">
        <span className="tonearm-head" />
      </span>
      <span className="record-shadow" aria-hidden="true" />
    </div>
  )
}
