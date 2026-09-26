import type { HeritageStatus, TimelineEvent, Topic } from './types'

/** Nhãn nguồn gốc hiển thị trên từng tư liệu. */
export const statusLabels: Record<HeritageStatus, { label: string; hint: string; tone: 'trad' | 'doc' | 'new' | 'pending' }> = {
  verified_original: { label: 'Bản gốc đã xác minh', hint: 'Được cố vấn chuyên môn xác nhận là tư liệu gốc.', tone: 'trad' },
  traditional_reference: { label: 'Tư liệu truyền thống', hint: 'Tư liệu tham chiếu từ nguồn sưu tầm, nghiên cứu.', tone: 'trad' },
  documented_practice: { label: 'Thực hành được ghi lại', hint: 'Ghi lại một lần hò, buổi dạy hay sinh hoạt thực tế.', tone: 'doc' },
  contemporary_interpretation: { label: 'Diễn giải đương đại', hint: 'Cách kể mới dựa trên tư liệu truyền thống.', tone: 'new' },
  contemporary_adaptation: { label: 'Phóng tác đương đại', hint: 'Sáng tác, phối mới lấy cảm hứng từ Hò.', tone: 'new' },
  pending: { label: 'Chờ xác minh', hint: 'Chưa qua bước duyệt của cố vấn.', tone: 'pending' },
}

/** Nội dung trang Khám phá. Đoạn nào gắn toVerify cần cố vấn duyệt trước khi công bố chính thức. */
export const topics: Topic[] = [
  {
    id: 'la-gi',
    title: 'Hò Đồng Tháp là gì?',
    lead: 'Một loại hình nghệ thuật trình diễn dân gian gắn với vùng Đồng Tháp Mười.',
    body: [
      'Hò Đồng Tháp được đưa vào Danh mục Di sản văn hoá phi vật thể quốc gia năm 2018, theo Quyết định số 4069/QĐ-BVHTTDL ngày 30/10/2018 của Bộ Văn hoá, Thể thao và Du lịch.',
      'Theo các tư liệu được công bố, điệu hò xuất hiện khoảng đầu thế kỷ XIX và phát triển mạnh, trở nên nổi tiếng khắp vùng đồng bằng sông Cửu Long trong nửa đầu thế kỷ XX.',
    ],
    toVerify: true,
  },
  {
    id: 'khong-gian',
    title: 'Đồng Tháp Mười',
    lead: 'Vùng trũng rộng lớn của sông nước, ruộng đồng và những đợt người đến khai hoang lập ấp.',
    body: [
      'Tiếng hò gắn với nhịp sống nơi đây: chèo ghe trên kênh rạch, làm lúa ngoài đồng, gặp nhau ở bến nước.',
      'Hiểu không gian này giúp người nghe biết vì sao một giọng hò lại "thuộc về" Đồng Tháp, thay vì chỉ là một điệu hò Nam Bộ chung chung.',
    ],
  },
  {
    id: 'doi-song',
    title: 'Hò trong đời sống và lao động',
    lead: 'Hò là cách người ta gọi nhau, trò chuyện và gửi gắm tâm tình giữa lúc làm việc.',
    body: [
      'Hò có thể là tiếng gọi vọng qua sông, là lời bày tỏ nỗi lòng, là cách giải khuây trong lúc làm việc nặng nhọc.',
      'Vì thế, Hò không nên bị thu gọn thành "một bài dân ca cũ" đứng yên trên sân khấu.',
    ],
  },
  {
    id: 'giong-ho',
    title: 'Giọng hò',
    lead: 'Câu hò dài, ngân chậm, nhịp lúc nhặt lúc khoan, lúc rất cao, lúc rất thấp.',
    body: [
      'Báo chí và tư liệu địa phương mô tả điệu Hò Đồng Tháp có câu rất dài, chia thành nhiều khúc hợp với tập quán sông nước, quãng giọng rộng.',
      'Các mô tả về điệu thức, thang âm và kỹ thuật cần được cố vấn chuyên môn xác nhận trước khi đưa vào tài liệu học.',
    ],
    toVerify: true,
  },
  {
    id: 'doi-dap',
    title: 'Đối đáp, giao duyên và hò một mình',
    lead: 'Một điểm cần phân biệt rõ.',
    body: [
      'Trong nghiên cứu của nhóm, người trẻ thường nhớ tới đối đáp và giao duyên như điểm chạm đầu tiên với Hò.',
      'Trong khi đó, một số tư liệu mô tả Hò Đồng Tháp thường được hò một mình. Mối quan hệ giữa hai điều này sẽ được cố vấn chuyên môn làm rõ trước khi công bố.',
      'Giao duyên là một lối vào câu chuyện, không phải định nghĩa của Hò Đồng Tháp.',
    ],
    toVerify: true,
  },
  {
    id: 'phan-biet',
    title: 'Phân biệt tư liệu gốc và sáng tạo mới',
    lead: 'Mỗi tư liệu trên web đều ghi rõ nguồn gốc.',
    body: [
      'Hình ảnh, âm nhạc phối mới hay câu chuyện kể lại có thể giúp người trẻ đến gần Hò hơn. Nhưng người xem cần biết đâu là tư liệu truyền thống, đâu là phần sáng tạo thêm.',
      'Vì vậy mỗi mục trong thư viện đều mang nhãn nguồn gốc: tư liệu truyền thống, thực hành được ghi lại, hay diễn giải đương đại.',
    ],
  },
]

export const timeline: TimelineEvent[] = [
  {
    year: 'Đầu thế kỷ XIX',
    title: 'Điệu hò xuất hiện',
    body: 'Theo tư liệu được công bố khi công nhận di sản, Hò Đồng Tháp hình thành cùng quá trình khai phá vùng đất.',
    toVerify: true,
  },
  {
    year: 'Nửa đầu thế kỷ XX',
    title: 'Vang khắp miền Tây',
    body: 'Điệu hò phát triển và trở nên nổi tiếng ở đồng bằng sông Cửu Long.',
    toVerify: true,
  },
  {
    year: '1954',
    title: 'Theo nghệ sĩ Kim Nhụy ra Bắc',
    body: 'Nghệ sĩ Kim Nhụy mang điệu Hò Đồng Tháp theo khi tập kết ra Bắc, góp phần đưa giọng hò đến khán giả cả nước.',
    source: 'Báo chí',
    toVerify: true,
  },
  {
    year: '1995',
    title: 'Dân ca Đồng Tháp',
    body: 'Lê Giang và Lư Nhất Vũ xuất bản công trình sưu tầm Dân ca Đồng Tháp.',
    source: 'Lê Giang & Lư Nhất Vũ (1995)',
  },
  {
    year: '2010 – 2011',
    title: 'Điền dã 12 địa phương',
    body: 'Nhóm của Cao Văn Lý (Phạm Lý) và Nguyễn Kim Cúc phỏng vấn nghệ nhân từ 63 đến 91 tuổi, ghi âm, ghi hình tư liệu.',
    source: 'Cao & Nguyễn (2012)',
  },
  {
    year: '2012',
    title: 'Sưu tầm, nghiên cứu, phục hồi',
    body: 'Công trình ghi nhận hơn 200 bài hò, khoảng 120 học viên và một liên hoan với 12 địa phương tham gia.',
    source: 'Cao & Nguyễn (2012)',
  },
  {
    year: '2018',
    title: 'Di sản văn hoá phi vật thể quốc gia',
    body: 'Quyết định số 4069/QĐ-BVHTTDL ngày 30/10/2018 đưa Hò Đồng Tháp vào danh mục quốc gia.',
    source: 'Bộ VHTTDL',
  },
  {
    year: '2026',
    title: 'Nam Âm và Hẹn Hò Đồng Tháp',
    body: 'Nhóm Nam Âm khảo sát 306 bạn trẻ tại TP.HCM, về Đồng Tháp ghi hình và phỏng vấn chuyên gia.',
  },
]

export const references = [
  'Lê Giang & Lư Nhất Vũ (1995), Dân ca Đồng Tháp.',
  'Cao Văn Lý (Phạm Lý) & Nguyễn Kim Cúc (2012), Sưu tầm – Nghiên cứu – Phục hồi điệu Hò Đồng Tháp.',
  'Bộ Văn hoá, Thể thao và Du lịch (2018), Quyết định số 4069/QĐ-BVHTTDL.',
  'UNESCO (2003), Công ước về Bảo vệ Di sản Văn hoá Phi vật thể.',
]
