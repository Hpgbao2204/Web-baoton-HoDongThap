/**
 * Kiểu dữ liệu dùng chung cho toàn bộ web.
 * Rút gọn từ mô hình dữ liệu trong tài liệu dự án (mục 25–27).
 * Khi có dữ liệu thật, chỉ cần điền vào các file trong src/data — giao diện tự hiển thị.
 */

/** Trạng thái nguồn gốc — phân biệt tư liệu truyền thống với sáng tạo đương đại. */
export type HeritageStatus =
  | 'verified_original'
  | 'traditional_reference'
  | 'documented_practice'
  | 'contemporary_interpretation'
  | 'contemporary_adaptation'
  | 'pending'

export type ArchiveType =
  | 'audio'
  | 'video'
  | 'image'
  | 'interview'
  | 'document'
  | 'research'
  | 'story'

export interface Provenance {
  source?: string
  collectedBy?: string
  recordedAt?: string // ngày ghi, dạng YYYY-MM-DD
  location?: string
  verifiedBy?: string[]
  rights?: string
  consent?: string
  /** Với bản đương đại: dựa trên tư liệu nào, thay đổi gì. */
  basedOn?: string
  creativeChanges?: string
}

export interface ArchiveItem {
  id: string
  title: string
  type: ArchiveType
  status: HeritageStatus
  summary: string
  performer?: string
  durationSeconds?: number
  audioUrl?: string
  videoUrl?: string
  imageUrl?: string
  /** Lời hò — chỉ điền khi đã được nghệ nhân/cố vấn xác minh. */
  lyrics?: string
  context?: string
  themes?: string[]
  provenance: Provenance
  /** true = mục mẫu minh hoạ bố cục, không phải tư liệu thật. */
  sample?: boolean
}

export interface Person {
  id: string
  name: string
  role: string
  code?: string
  bio?: string
  relationship?: string
  photo?: string
  quote?: string
  verification?: string
}

export interface TimelineEvent {
  year: string
  title: string
  body: string
  source?: string
  toVerify?: boolean
}

export interface Topic {
  id: string
  title: string
  lead: string
  body: string[]
  /** Nhãn cho biết nội dung đã được xác minh chưa. */
  toVerify?: boolean
}
