/** Số liệu nghiên cứu định lượng (n = 306, 18–24 tuổi, sống/học/làm việc tại TP.HCM). */

export const sample = {
  n: 306,
  age: '18–24',
  place: 'TP. Hồ Chí Minh',
  items: 23,
  scale: 'Likert 5 mức',
}

export const awareness = [
  { key: 'heard', label: 'Đã từng nghe', value: 25.5 },
  { key: 'unsure', label: 'Không chắc', value: 36.3 },
  { key: 'never', label: 'Chưa từng nghe', value: 38.2 },
]

export const priorKnowledge = { n: 189, value: 60.3, label: 'tự chấm hiểu biết chỉ 1–2 trên 5' }

export const postExposure = [
  { label: 'Hiểu Hò gắn với đời sống và giao tiếp hằng ngày', value: 88.9 },
  { label: 'Nhận ra Đồng Tháp Mười là không gian văn hoá của Hò', value: 91.8 },
  { label: 'Thấy mối liên hệ giữa Hò với đời sống, lao động, giao tiếp', value: 92.8 },
]

export const paths = [
  {
    id: 'H1',
    from: 'S1',
    to: 'O',
    beta: 0.26,
    f2: 0.071,
    size: 'nhỏ',
    plain: 'Cách kể chuyện và trình bày hình ảnh, âm thanh rõ ràng có liên hệ với phản hồi bên trong của người xem.',
  },
  {
    id: 'H2',
    from: 'S2',
    to: 'O',
    beta: 0.505,
    f2: 0.269,
    size: 'trung bình',
    plain: 'Cơ hội tương tác và được hướng dẫn tham gia có liên hệ mạnh hơn với phản hồi đó, trong nhóm được khảo sát.',
  },
  {
    id: 'H3',
    from: 'O',
    to: 'R1',
    beta: 0.729,
    f2: 1.136,
    size: 'lớn',
    plain: 'Khi thấy Hò gần gũi và chạm được cảm xúc, người trẻ có ý định tìm hiểu, nghe thêm hay tham gia cao hơn.',
  },
]

export const constructs = {
  S1: { name: 'Kể chuyện & trình bày', en: 'Narrative & Media Presentation Features' },
  S2: { name: 'Tương tác có hướng dẫn', en: 'Interactive & Guided Participation Opportunities' },
  O: { name: 'Phản hồi bên trong', en: 'Internal Psychological Response' },
  O1: { name: 'Thấy liên quan', en: 'Perceived Relevance' },
  O2: { name: 'Cộng hưởng cảm xúc', en: 'Emotional Resonance' },
  R1: { name: 'Ý định tham gia', en: 'Participation Intention' },
}

export const rSquared = { O: 0.504, R1: 0.532 }

export const process = [
  { title: 'Tổng quan tài liệu', body: 'Bối cảnh văn hoá, truyền thông di sản, rào cản tiếp cận, cảm xúc và ý định tham gia.' },
  { title: 'Phỏng vấn chuyên gia', body: 'Xác lập thông tin văn hoá, ranh giới diễn giải và các điểm chạm cho người trẻ.' },
  { title: 'Khảo sát 306 bạn trẻ', body: 'Trải nghiệm ngắn có nghe, nhìn và tương tác, sau đó trả lời 23 câu hỏi.' },
  { title: 'Phỏng vấn người trẻ', body: 'Hiểu vì sao họ thấy gần hay xa, cảm xúc ra sao, điều gì khiến họ muốn tiếp tục.' },
  { title: 'Tổng hợp & chiến lược', body: 'Chuyển bằng chứng thành hành trình Nghe Hò, Hiểu Hò, Cùng Hò.' },
]

export const barriers = [
  'Hình ảnh, cách trình bày bị cho là cũ',
  'Nội dung quá dài, mở đầu thiếu sức hút',
  'Thiếu bối cảnh để hiểu mình đang nghe gì',
  'Ít xuất hiện trong đời sống, mạng xã hội thường ngày',
  'Cảm giác Hò là chuyện của thế hệ trước',
]

export const entryPoints = [
  'Tiếng mở câu, quãng giọng rất riêng',
  'Khung cảnh sông nước',
  'Hò trên ghe',
  'Đời sống lao động',
  'Đối đáp',
  'Giao duyên',
]
