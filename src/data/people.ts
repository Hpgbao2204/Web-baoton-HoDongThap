import type { Person } from './types'
import placeholderPhoto from '../assets/team/member-placeholder.jpg'

/**
 * Nhóm thực hiện Nam Âm.
 * Tạm thời cả 5 người dùng chung một ảnh. Khi có ảnh riêng: bỏ ảnh vào src/assets/team/
 * rồi import và thay vào trường `photo` của từng người.
 */
export const team: Person[] = [
  { id: 'vy', name: 'Tạ Khánh Vy', code: 'SS180582', role: 'Đang cập nhật', photo: placeholderPhoto },
  { id: 'ngan', name: 'Nguyễn Thanh Hồng Ngân', code: 'SS180172', role: 'Đang cập nhật', photo: placeholderPhoto },
  { id: 'nhi', name: 'Phạm Thị Tuyết Nhi', code: 'SS180126', role: 'Đang cập nhật', photo: placeholderPhoto },
  { id: 'phu', name: 'Sử Thanh Phú', code: 'SS180758', role: 'Đang cập nhật', photo: placeholderPhoto },
  { id: 'hieu', name: 'Nguyễn Hùng Hiếu', code: 'SS180903', role: 'Đang cập nhật', photo: placeholderPhoto },
]

export const supervisor: Person = {
  id: 'linh',
  name: 'Tạ Ngọc Linh',
  role: 'Giảng viên hướng dẫn',
  verification: 'Cần đối chiếu với tài liệu nộp gần nhất',
}

/**
 * Cố vấn chuyên môn. Quy trình duyệt nội dung:
 * Xác minh chuyên môn → Rà soát văn hoá → Phát triển nội dung.
 */
export const advisors: Person[] = [
  {
    id: 'song-anh',
    name: 'Nguyễn Thị Song Anh',
    role: 'Cố vấn chuyên môn',
    relationship:
      'Con gái duy nhất của cố nghệ sĩ Kim Nhụy. Học Hò Đồng Tháp trực tiếp từ mẹ từ khoảng năm tuổi, tham gia trình diễn, giảng dạy và truyền nghề.',
    bio: 'Phụ trách độ chính xác chuyên môn: nguồn gốc, bối cảnh, đặc trưng nghệ thuật, lối diễn xướng truyền thống, lời hò và nét giai điệu.',
    verification: 'Xác minh chuyên môn',
  },
  {
    id: 'duy-trung',
    name: 'Nguyễn Duy Trung',
    role: 'Cố vấn văn hoá',
    relationship: 'Góp ý về bối cảnh văn hoá, giá trị địa phương và thực hành cộng đồng.',
    bio: 'Giúp nội dung phù hợp với bối cảnh Đồng Tháp, tránh giản lược hay trình bày sai lệch.',
    verification: 'Rà soát văn hoá',
  },
  {
    id: 'bach-phan',
    name: 'Trần Bạch Phần',
    role: 'Cố vấn nội dung',
    relationship: 'Đồng hành phát triển câu chuyện và nội dung truyền thông.',
    bio: 'Chuyển tư liệu đã xác minh thành những câu chuyện dễ tiếp cận: đời sống cộng đồng, ký ức địa phương, con người và không gian văn hoá.',
    verification: 'Phát triển nội dung',
  },
]
