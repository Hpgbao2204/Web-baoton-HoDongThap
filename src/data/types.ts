/**
 * Kiểu dữ liệu dùng chung cho toàn bộ web Nam Âm.
 * Khi có dữ liệu mới, chỉ cần điền vào các file trong src/data — giao diện tự hiển thị.
 */

/** Một nguồn tham khảo: bài báo, sách, trang chính thức. */
export interface Source {
  id: string
  title: string
  outlet: string
  url?: string
  year?: string
  kind: 'bao' | 'sach' | 'chinh-thuc' | 'am-thanh'
  summary: string
  /** Gắn với nghệ sĩ hay chủ đề nào (id trong artists.ts hoặc chủ đề tự do). */
  tags: string[]
}

export interface ArtistEvent {
  year: string
  text: string
}

export interface Artist {
  id: string
  name: string
  /** Danh xưng ngắn: "Nữ hoàng hò Đồng Tháp"… */
  title: string
  role: string
  years?: string
  hometown?: string
  /** Một câu giới thiệu hiện trên thẻ. */
  lead: string
  /** Các đoạn tiểu sử. */
  story: string[]
  timeline?: ArtistEvent[]
  /** Lời kể được báo chí thuật lại (không phải trích nguyên văn nếu `paraphrase`). */
  quote?: { text: string; by: string; paraphrase?: boolean }
  photo?: string
  /** Nhóm để sắp xếp: huyền thoại, người truyền nghề, người phục hồi… */
  group: 'huyen-thoai' | 'truyen-nghe' | 'phuc-hoi' | 'lan-toa' | 'nguon-coi'
  featured?: boolean
  toVerify?: string
}

export interface Chapter {
  id: string
  era: string
  title: string
  body: string[]
  mood: 'day' | 'dusk' | 'night'
  highlight?: string
  sources?: string[]
}

export interface Fact {
  front: string
  back: string
  source?: string
}

export interface QuizQuestion {
  q: string
  options: string[]
  answer: number
  explain: string
}

export interface Person {
  id: string
  name: string
  role: string
  code?: string
  bio?: string
  relationship?: string
  photo?: string
  verification?: string
}
