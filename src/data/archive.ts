import type { ArchiveItem } from './types'

/**
 * THƯ VIỆN SỐ
 * ------------------------------------------------------------
 * `archive` là nơi đặt tư liệu thật. Hiện chưa có dữ liệu nên để trống.
 * `sampleArchive` là các mục MẪU để thấy bố cục — web chỉ hiện chúng khi `archive` rỗng,
 * và luôn gắn nhãn "Mục mẫu". Khi thêm tư liệu thật vào `archive`, các mục mẫu tự ẩn.
 *
 * Quy tắc: không điền lời hò, tên nghệ nhân hay nguồn khi chưa được cố vấn xác minh.
 */
export const archive: ArchiveItem[] = []

export const sampleArchive: ArchiveItem[] = [
  {
    id: 'mau-01',
    title: 'Hò trên ghe',
    type: 'audio',
    status: 'traditional_reference',
    summary: 'Vị trí dành cho một bản ghi hò truyền thống, kèm lời và chú thích bối cảnh.',
    performer: 'Chờ cập nhật',
    durationSeconds: 184,
    context: 'Sông nước, chèo ghe',
    themes: ['sông nước', 'lao động'],
    provenance: { source: 'Chờ cập nhật', location: 'Đồng Tháp', verifiedBy: [], rights: 'Chưa xác định' },
    sample: true,
  },
  {
    id: 'mau-02',
    title: 'Buổi truyền dạy tại Đồng Tháp',
    type: 'video',
    status: 'documented_practice',
    summary: 'Vị trí cho video ghi lại một buổi dạy hò từ chuyến điền dã ngày 09/09.',
    durationSeconds: 420,
    context: 'Truyền dạy',
    themes: ['truyền nghề'],
    provenance: { collectedBy: 'Nhóm Nam Âm', recordedAt: '2026-09-09', location: 'Đồng Tháp', verifiedBy: [] },
    sample: true,
  },
  {
    id: 'mau-03',
    title: 'Trò chuyện cùng cố vấn chuyên môn',
    type: 'interview',
    status: 'pending',
    summary: 'Vị trí cho trích đoạn phỏng vấn về ký ức, cách học hò và điều người trẻ nên biết.',
    context: 'Phỏng vấn chuyên gia',
    themes: ['ký ức', 'truyền nghề'],
    provenance: { collectedBy: 'Nhóm Nam Âm', verifiedBy: [], consent: 'Chờ xác nhận' },
    sample: true,
  },
  {
    id: 'mau-04',
    title: 'Bến nước lúc trăng lên',
    type: 'image',
    status: 'contemporary_interpretation',
    summary: 'Vị trí cho ảnh key visual Đêm Trăng Bến Nước. Đây là sáng tạo mới, không phải tư liệu gốc.',
    context: 'Key visual chiến dịch',
    themes: ['bến nước', 'đêm trăng'],
    provenance: { basedOn: 'Chờ cập nhật', creativeChanges: 'Minh hoạ 2D kết hợp ảnh nhân vật', verifiedBy: [] },
    sample: true,
  },
  {
    id: 'mau-05',
    title: 'Dân ca Đồng Tháp (1995)',
    type: 'document',
    status: 'traditional_reference',
    summary: 'Vị trí cho trang thông tin công trình sưu tầm của Lê Giang và Lư Nhất Vũ.',
    context: 'Tài liệu tham khảo',
    themes: ['sưu tầm'],
    provenance: { source: 'Lê Giang & Lư Nhất Vũ (1995)', verifiedBy: [] },
    sample: true,
  },
  {
    id: 'mau-06',
    title: 'Người trẻ nghe Hò lần đầu',
    type: 'research',
    status: 'documented_practice',
    summary: 'Vị trí cho tóm tắt phát hiện từ khảo sát 306 bạn trẻ và phỏng vấn sâu.',
    context: 'Nghiên cứu của Nam Âm',
    themes: ['người trẻ'],
    provenance: { collectedBy: 'Nhóm Nam Âm', location: 'TP. Hồ Chí Minh', verifiedBy: [] },
    sample: true,
  },
]

export const typeLabels: Record<ArchiveItem['type'], string> = {
  audio: 'Âm thanh',
  video: 'Video',
  image: 'Hình ảnh',
  interview: 'Phỏng vấn',
  document: 'Tài liệu',
  research: 'Nghiên cứu',
  story: 'Câu chuyện',
}
