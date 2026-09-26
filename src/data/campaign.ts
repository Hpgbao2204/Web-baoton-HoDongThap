import type { Mood } from '../three/moods'

/** Ba giai đoạn chiến dịch — tên mới nhất: Hò Gọi → Hò Tỏ Lòng → Hò Tỏ Tình. */
export const phases: {
  id: string
  name: string
  when: string
  mood: Mood
  purpose: string
  body: string
  tactics: string[]
}[] = [
  {
    id: 'ho-goi',
    name: 'Hò Gọi',
    when: 'Ban ngày, sông mở rộng',
    mood: 'day',
    purpose: 'Lần đầu nghe thấy',
    body: 'Tiếng gọi đầu tiên của Hò tới người trẻ. Khơi tò mò bằng những câu chuyện ngắn, gương mặt người giữ tiếng hò và khung cảnh sông nước.',
    tactics: ['Teaser', 'Video kể chuyện ngắn', 'Câu chuyện nghệ nhân', 'Phim tài liệu'],
  },
  {
    id: 'ho-to-long',
    name: 'Hò Tỏ Lòng',
    when: 'Chiều muộn, đi tìm và lắng nghe',
    mood: 'dusk',
    purpose: 'Hiểu và đáp lời',
    body: 'Đi sâu vào bối cảnh, để người trẻ thấy Hò liên quan tới mình, được hướng dẫn nghe và thử hò đáp.',
    tactics: ['Talkshow & Workshop Unitour', 'Nghe có hướng dẫn', 'Hò đáp có hướng dẫn', 'MV chủ đề', 'Nội dung tương tác'],
  },
  {
    id: 'ho-to-tinh',
    name: 'Hò Tỏ Tình',
    when: 'Đêm trăng, bến nước',
    mood: 'night',
    purpose: 'Cùng nhau trải nghiệm',
    body: 'Cuộc hẹn khép lại ở Đêm Trăng Bến Nước. "Tình" ở đây là tình quê, tình người, sự gắn bó với cộng đồng, không chỉ là tình yêu đôi lứa.',
    tactics: ['Music Show Đêm Trăng Bến Nước', 'Tiết mục Hò truyền thống', 'Khoảnh khắc Cùng Hò', 'Bài hát chủ đề'],
  },
]

export const story = [
  'Một chàng trai đi tìm cô gái từng đáp lại tiếng hò của anh trên sông.',
  'Trên đường tìm, anh lần theo manh mối, gặp những người giữ tiếng hò, học cách lắng nghe.',
  'Dần dần anh học được cách đáp lời, và nhận ra những con người, không gian gắn với Hò.',
  'Đến Đêm Trăng Bến Nước, cuộc hẹn của hai người mở rộng thành cuộc hẹn giữa người trẻ, Hò Đồng Tháp và cộng đồng.',
]
