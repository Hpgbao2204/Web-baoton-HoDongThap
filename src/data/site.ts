export const site = {
  brand: 'Hẹn Hò Đồng Tháp',
  team: 'Nam Âm',
  tagline: 'Vang tiếng hò, tỏ tiếng lòng.',
  keyMessage:
    'Hò từng là không gian để người ta cất tiếng, lắng nghe và tìm đến nhau. Hẹn Hò mở lại không gian ấy để Hò bước vào đời sống người trẻ hôm nay.',
  heritage: {
    label: 'Di sản văn hoá phi vật thể quốc gia',
    decision: 'Quyết định số 4069/QĐ-BVHTTDL',
    date: '30/10/2018',
  },
}

export const nav = [
  { to: '/kham-pha', label: 'Khám phá Hò' },
  { to: '/nghe-ho', label: 'Nghe Hò' },
  { to: '/nguoi-giu-tieng-ho', label: 'Người giữ tiếng Hò' },
  { to: '/nghien-cuu', label: 'Nghiên cứu' },
  { to: '/thu-vien', label: 'Thư viện' },
  { to: '/thu-ho', label: 'Thử Hò' },
  { to: '/hen-ho', label: 'Chiến dịch' },
  { to: '/nam-am', label: 'Nam Âm' },
]

/** Ba bước hành trình công khai: Nghe → Hiểu → Cùng. */
export const journey = [
  {
    key: 'nghe',
    title: 'Nghe Hò',
    body: 'Bắt đầu từ giọng hò. Nghe trước khi đọc, để cái tai làm quen với một cách cất tiếng rất riêng của Đồng Tháp Mười.',
    to: '/nghe-ho',
  },
  {
    key: 'hieu',
    title: 'Hiểu Hò',
    body: 'Ai hò, hò ở đâu, hò lúc nào, hò cho ai nghe. Có bối cảnh, câu hò mới hết xa lạ.',
    to: '/kham-pha',
  },
  {
    key: 'cung',
    title: 'Cùng Hò',
    body: 'Chọn, đáp lời, thử cất tiếng. Hò vốn là chuyện của người với người, nên mời bạn bước vào.',
    to: '/thu-ho',
  },
]

/** Bốn lớp nghĩa của Hò, theo khung "tiếng nói + tình huống + mối quan hệ + không gian văn hoá". */
export const facets = [
  {
    word: 'Tiếng nói',
    body: 'Một cách cất giọng để gọi, để kể, để bày tỏ điều trong lòng.',
  },
  {
    word: 'Tình huống',
    body: 'Hò gắn với lúc chèo ghe, lúc làm đồng, lúc nghỉ tay. Câu hò sinh ra từ việc đang diễn ra.',
  },
  {
    word: 'Mối quan hệ',
    body: 'Có người cất tiếng thì có người lắng nghe. Hò nối người ở bờ này với người ở bờ kia.',
  },
  {
    word: 'Không gian',
    body: 'Sông rạch, ruộng lúa, bến nước của Đồng Tháp Mười, nơi tiếng hò vang xa và được nhớ lại.',
  },
]
