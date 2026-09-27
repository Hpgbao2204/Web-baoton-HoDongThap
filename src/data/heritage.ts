import type { Chapter, Fact, QuizQuestion } from './types'

/** Câu chuyện Hò Đồng Tháp, kể theo từng chặng. `sources` là id trong sources.ts. */
export const chapters: Chapter[] = [
  {
    id: 'khai-hoang',
    era: 'Đầu thế kỷ XIX',
    title: 'Sinh ra giữa mùa khẩn hoang',
    mood: 'day',
    body: [
      'Đồng Tháp Mười khi ấy là vùng trũng mênh mông, sình lầy, lau sậy. Người dân đến khai phá phải chống chọi với thiên nhiên khắc nghiệt và giặc ngoại xâm.',
      'Giữa những ngày chèo ghe, phát cỏ, làm ruộng, họ tự đặt lời và cất tiếng hò. Điệu hò Đồng Tháp hình thành như thế, từ sự giao thoa văn hoá của người Kinh, Chăm, Khmer và Hoa cùng sống ở miền Tây.',
    ],
    highlight: 'Không có một "ông tổ" của Hò Đồng Tháp. Tác giả là cả một cộng đồng.',
    sources: ['baodantoc-ngot-ngao', 'bvhttdl-2018'],
  },
  {
    id: 'vang-khap',
    era: 'Nửa đầu thế kỷ XX',
    title: 'Vang khắp miền Tây',
    mood: 'day',
    body: [
      'Điệu hò phát triển mạnh và trở nên nổi tiếng khắp đồng bằng sông Cửu Long.',
      'Lời hò lấy từ thơ lục bát, song thất lục bát, ca dao, thành ngữ. Người hò có thể mượn câu có sẵn hoặc ứng tác ngay theo việc đang làm, cảnh đang thấy.',
    ],
    sources: ['bvhttdl-2018', 'nhandan-muot-ma'],
  },
  {
    id: 'ra-bac',
    era: '1954 – 1958',
    title: 'Cô gái Thanh Bình mang tiếng hò ra Bắc',
    mood: 'dusk',
    body: [
      'Năm 1954, nghệ sĩ Kim Nhụy tập kết ra Bắc và mang theo điệu hò quê nhà. Năm 1957, Đài Tiếng nói Việt Nam thu giọng hò của bà trên đĩa 45 vòng.',
      'Năm 1958, Hò Đồng Tháp lên sóng chương trình "Dân ca và nhạc cổ truyền". Lần đầu tiên, cả nước nghe được điệu hò của vùng Đồng Tháp Mười.',
    ],
    highlight: 'Một chiếc đĩa 45 vòng năm 1957 đã giữ lại giọng hò được gọi là hay nhất thế kỷ XX.',
    sources: ['tuoitre-giong-ho', 'cand-hay-nhat'],
  },
  {
    id: 'the-gioi',
    era: 'Từ 1957',
    title: 'Tiếng hò đi qua hơn 60 quốc gia',
    mood: 'dusk',
    body: [
      'Băng thu giọng Kim Nhụy được gửi sang Pháp. GS.TS Trần Văn Khê nghe và nhận ra một làn điệu đặc biệt. Ông học lại, rồi mang Hò Đồng Tháp tới giảng đường, hội thảo ở hơn 60 quốc gia.',
      'Điều thú vị: suốt mấy chục năm ấy, ông chưa từng gặp người có giọng hò mà ông giới thiệu khắp thế giới. Đến cuối năm 2012, hai người mới gặp nhau.',
    ],
    sources: ['vov-nu-hoang', 'hoai-thuong-tvk'],
  },
  {
    id: 'lang-tieng',
    era: '1954 – 2010',
    title: 'Những năm lặng tiếng',
    mood: 'night',
    body: [
      'Ở quê nhà, biến động xã hội làm đời sống nông thôn xáo trộn. Người dân vùng Tháp Mười lo mưu sinh, lo chiến đấu, lối sống đổi thay, và điệu hò dần rơi vào quên lãng.',
      'Đến đầu thế kỷ XXI, nhiều người dân đất Sen Hồng còn không tin quê mình từng có điệu hò ấy. Những nghệ nhân còn sống chỉ nhớ lờ mờ làn điệu cũ.',
    ],
    highlight: 'Hơn 50 năm, Hò Đồng Tháp gần như vắng bóng trên các sân khấu.',
    sources: ['nhandan-hoi-sinh', 'cantho-ru-lai', 'thanhnien-bao-ton'],
  },
  {
    id: 'hoi-sinh',
    era: '2010 – 2012',
    title: 'Đi tìm và hồi sinh',
    mood: 'dusk',
    body: [
      'Năm 2010, nhạc sĩ Cao Văn Lý và Nguyễn Kim Cúc về Đồng Tháp thực hiện đề tài "Sưu tầm – Nghiên cứu – Phục hồi điệu Hò Đồng Tháp". Họ đi khắp 12 địa phương, gặp những nghệ nhân từ 63 đến 91 tuổi.',
      'Năm 2011, Hò Đồng Tháp trở lại Liên hoan âm nhạc dân gian Việt Nam và đoạt giải A với số điểm tuyệt đối. Năm 2012, công trình ra đời với hơn 200 bài hò và "lòng bản ứng dụng" để dạy lại cho người trẻ.',
    ],
    sources: ['thanhnien-bao-ton', 'nhandan-hoi-sinh', 'vietnamplus-phuc-hoi'],
  },
  {
    id: 'di-san',
    era: '30/10/2018',
    title: 'Di sản văn hoá phi vật thể quốc gia',
    mood: 'day',
    body: [
      'Bộ trưởng Bộ Văn hoá, Thể thao và Du lịch ký Quyết định số 4069/QĐ-BVHTTDL, đưa Hò Đồng Tháp vào Danh mục Di sản văn hoá phi vật thể quốc gia, loại hình nghệ thuật trình diễn dân gian.',
      'Cũng trong năm ấy, nghệ sĩ Kim Nhụy qua đời. Người đưa tiếng hò đi xa nhất đã kịp thấy điệu hò quê mình được hồi sinh.',
    ],
    sources: ['bvhttdl-2018', 'cand-vinh-biet'],
  },
  {
    id: 'hom-nay',
    era: 'Hôm nay',
    title: 'Tiếng hò tìm người trẻ',
    mood: 'night',
    body: [
      'Tỉnh Đồng Tháp đã đào tạo gần 1.000 người biết hò, tổ chức thi sáng tác, liên hoan, câu lạc bộ và biểu diễn giao lưu. Cô Song Anh, con gái nghệ sĩ Kim Nhụy, đứng lớp dạy hò cùng Sở VHTTDL tỉnh.',
      'Nam Âm tiếp nối bằng cách của người trẻ: kể lại câu chuyện, gom lại sách báo, và mời bạn thử lắng nghe một câu hò trăm năm.',
    ],
    sources: ['nhandan-hoi-sinh', 'nhandan-tim-ve', 'cuc-ntbd'],
  },
]

/** Nghe Hò Đồng Tháp như thế nào: đặc điểm được báo chí và tư liệu mô tả. */
export const traits = [
  {
    name: 'Hò một mình',
    body: 'Khác nhiều điệu hò Nam Bộ, Hò Đồng Tháp được một người hò, không có lối hò đối đáp.',
    source: 'cuc-ntbd',
  },
  {
    name: 'Câu hò rất dài',
    body: 'Một câu chia thành nhiều khúc, hợp với nhịp chèo ghe và tập quán sông nước.',
    source: 'baotang-dongthap',
  },
  {
    name: 'Khoan nhặt, trầm bổng',
    body: 'Hò chậm, buông lơi. Nhịp lúc nhặt lúc khoan, có lúc thật thấp, có lúc thật cao.',
    source: 'baotang-dongthap',
  },
  {
    name: 'Quãng giọng rộng',
    body: 'Rất cao rồi rất thấp, nên nam và nữ không bao giờ hò hoà chung một giọng.',
    source: 'baotang-dongthap',
  },
  {
    name: 'Hơi oán',
    body: 'Điệu hò có quãng 4 tăng và chuyển hệ trong hơi oán, tạo nên nét buồn thương rất riêng.',
    source: 'baotang-dongthap',
  },
  {
    name: 'Lời từ lục bát',
    body: 'Lời lấy từ thơ lục bát, song thất lục bát, ca dao, thành ngữ; có thể ứng tác theo cảnh.',
    source: 'nhandan-muot-ma',
  },
]

/** Thẻ "Bạn có biết?" — mặt trước là câu hỏi gợi tò mò, mặt sau là câu trả lời. */
export const facts: Fact[] = [
  { front: 'Hò Đồng Tháp có hò đối đáp không?', back: 'Không. Hò Đồng Tháp được hò một mình, khác hẳn nhiều điệu hò Nam Bộ khác.', source: 'cuc-ntbd' },
  { front: 'Ai đưa Hò Đồng Tháp ra thế giới?', back: 'GS.TS Trần Văn Khê giới thiệu điệu hò ở hơn 60 quốc gia, từ một cuộn băng thu giọng Kim Nhụy.', source: 'vov-nu-hoang' },
  { front: 'Điệu hò từng "biến mất" bao lâu?', back: 'Hơn 50 năm. Đến năm 2011 mới trở lại liên hoan và đoạt giải A tuyệt đối.', source: 'nhandan-hoi-sinh' },
  { front: 'Vì sao nam nữ không hò chung?', back: 'Vì quãng giọng quá rộng: lúc rất cao, lúc rất thấp, không thể hoà cùng một giọng.', source: 'baotang-dongthap' },
  { front: 'Giọng Kim Nhụy từng xuất hiện trong phim?', back: 'Có. Tiếng ru mở đầu phim "Nổi gió" (1966) là giọng của bà.', source: 'vov-hat-ru' },
  { front: 'Bao nhiêu người đã học hò?', back: 'Tỉnh Đồng Tháp đã đào tạo gần 1.000 người biết hò Đồng Tháp.', source: 'nhandan-hoi-sinh' },
]

export const quiz: QuizQuestion[] = [
  {
    q: 'Hò Đồng Tháp thường được hò theo cách nào?',
    options: ['Hai người hò đối đáp', 'Một người hò một mình', 'Cả nhóm đồng ca'],
    answer: 1,
    explain: 'Hò Đồng Tháp được hò một mình, không có lối hò đối đáp như nhiều điệu hò Nam Bộ khác.',
  },
  {
    q: 'Ai được mệnh danh là "Nữ hoàng hò Đồng Tháp"?',
    options: ['Nghệ sĩ Kim Nhụy', 'Ca sĩ Anh Đào', 'Nghệ sĩ Cao Thị Thắng'],
    answer: 0,
    explain: 'Nghệ sĩ Kim Nhụy (~1930–2018), người đưa câu hò Đồng Tháp lên sóng Đài Tiếng nói Việt Nam năm 1958.',
  },
  {
    q: 'Hò Đồng Tháp trở thành Di sản văn hoá phi vật thể quốc gia năm nào?',
    options: ['2011', '2018', '2021'],
    answer: 1,
    explain: 'Quyết định số 4069/QĐ-BVHTTDL ngày 30/10/2018.',
  },
  {
    q: 'GS Trần Văn Khê đã giới thiệu điệu hò ở khoảng bao nhiêu quốc gia?',
    options: ['Khoảng 10', 'Hơn 60', 'Hơn 200'],
    answer: 1,
    explain: 'Hơn 60 quốc gia, dù suốt nhiều năm ông chưa từng gặp nghệ sĩ Kim Nhụy.',
  },
  {
    q: 'Lời hò Đồng Tháp thường lấy từ đâu?',
    options: ['Thơ lục bát, song thất lục bát, ca dao', 'Thơ Đường luật', 'Lời bài hát nước ngoài'],
    answer: 0,
    explain: 'Lời hò lấy từ thơ lục bát, song thất lục bát, ca dao, thành ngữ, và có thể ứng tác theo cảnh.',
  },
  {
    q: 'Ai đã lặn lội khắp 12 địa phương để phục hồi điệu hò?',
    options: ['Nhạc sĩ Lư Nhất Vũ', 'Nhạc sĩ Cao Văn Lý và Nguyễn Kim Cúc', 'GS Trần Văn Khê'],
    answer: 1,
    explain: 'Đề tài "Sưu tầm – Nghiên cứu – Phục hồi điệu Hò Đồng Tháp" (2010–2012) của hai nhạc sĩ Cao Văn Lý và Nguyễn Kim Cúc.',
  },
]

/** Một câu hò được báo chí trích lại, gắn với giọng hò Kim Nhụy năm 1957. */
export const verse = {
  lines: ['Giọt lệ chia ly trĩu nặng lòng người chiến sĩ', 'Buổi trùng phùng ta giữ kỹ trong tim', 'Dù cho đá nổi mây chìm', 'Đố ai ngăn được cánh chim về đàn'],
  caption: 'Câu hò nghệ sĩ Kim Nhụy cất lên năm 1957, được báo chí trích lại.',
  source: 'tuoitre-giong-ho',
}

export const lullaby = {
  lines: ['Ầu ơ, bên kia sông bụi tre khô', 'Bên đây sông cây chuối ngã…'],
  caption: 'Tiếng ru của Kim Nhụy mở đầu phim "Nổi gió" (1966). Đây là hát ru, không phải hò, nhưng cùng một giọng ca huyền thoại.',
  source: 'vov-hat-ru',
}
