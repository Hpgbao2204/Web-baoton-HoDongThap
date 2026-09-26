import type { Artist } from './types'

/**
 * NHỮNG NGƯỜI GIỮ TIẾNG HÒ
 * Thông tin tổng hợp từ báo chí (xem sources.ts, lọc theo tag = id nghệ sĩ).
 * Ảnh chân dung: chỉ thêm khi có quyền sử dụng. Đặt ảnh vào src/assets/artists/ rồi import vào `photo`.
 */
export const artists: Artist[] = [
  {
    id: 'nguoi-dan',
    monogram: 'Hò',
    name: 'Người dân Đồng Tháp Mười',
    title: 'Những người hò đầu tiên',
    role: 'Chủ thể của di sản',
    years: 'Từ thế kỷ XIX',
    hometown: 'Đồng Tháp Mười',
    group: 'nguon-coi',
    lead: 'Hò Đồng Tháp không có một "ông tổ". Điệu hò sinh ra từ những người chèo ghe, làm ruộng, khai hoang giữa vùng trũng mênh mông.',
    story: [
      'Theo các nhà nghiên cứu, điệu hò hình thành khoảng đầu thế kỷ XIX, cùng lúc người dân đến khai phá vùng Đồng Tháp Mười. Để chống chọi với thiên nhiên khắc nghiệt và giặc ngoại xâm, họ tự đặt lời, tự cất tiếng hò.',
      'Báo Dân tộc và Phát triển ghi nhận điệu hò là kết quả giao thoa văn hoá của nhiều cộng đồng cùng sống ở miền Tây: người Kinh, Chăm, Khmer và Hoa.',
      'Những người hò ấy phần lớn không để lại tên. Nhưng chính họ đã truyền lại điệu hò qua bao thế hệ, để đến thế kỷ XX, Hò Đồng Tháp nổi tiếng khắp đồng bằng sông Cửu Long.',
    ],
    timeline: [
      { year: 'Đầu thế kỷ XIX', text: 'Điệu hò hình thành cùng quá trình khẩn hoang.' },
      { year: 'Nửa đầu thế kỷ XX', text: 'Hò Đồng Tháp vang khắp miền Tây.' },
      { year: '1954 – 1960', text: 'Biến động xã hội, đời sống xáo trộn, điệu hò dần lặng tiếng.' },
    ],
  },
  {
    id: 'kim-nhuy',
    monogram: 'KN',
    name: 'Kim Nhụy',
    title: 'Nữ hoàng hò Đồng Tháp',
    role: 'Cố nghệ sĩ',
    years: '~1930 – 2018',
    hometown: 'Bình Thành, Thanh Bình, Đồng Tháp',
    group: 'huyen-thoai',
    featured: true,
    lead: 'Cô bé mồ côi đi mót lúa bên bờ ruộng Thanh Bình trở thành giọng hò được giới chuyên môn gọi là hay nhất thế kỷ XX.',
    story: [
      'Nghệ sĩ Kim Nhụy tên đầy đủ là Nguyễn Thị Kim Nhụy, sinh ra và lớn lên ở xứ Bình Thành, huyện Thanh Bình, Đồng Tháp, trong một gia đình nông dân nghèo đông con. Bà mồ côi từ năm hai tuổi. Mới năm tuổi đã phải đi cắm câu, mót lúa, và cũng từ đó bà nghe các dì, các chị hò trên đồng, trên sông rồi thuộc lòng những câu hò của quê mình.',
      'Năm 1945, bà theo kháng chiến, vào Đoàn Văn công tỉnh đội Long Châu Sa. Năm 1954, bà tập kết ra Bắc và mang theo điệu Hò Đồng Tháp.',
      'Năm 1957, Đài Tiếng nói Việt Nam thu một số bài hò của bà trên đĩa 45 vòng và mời bà vào ban ca nhạc của Đài. Năm 1958, giọng hò Đồng Tháp của bà vang lên trong chương trình "Dân ca và nhạc cổ truyền", làm rung động hàng triệu trái tim.',
      'Băng thu giọng hò của bà được gửi sang Pháp. GS.TS Trần Văn Khê nghe và nhận ra đây là một làn điệu đặc biệt. Ông học lại điệu hò, rồi giới thiệu Hò Đồng Tháp cùng tên tuổi Kim Nhụy ở hơn 60 quốc gia, dù khi ấy chưa từng gặp bà.',
      'Bà còn được gọi là huyền thoại hát ru Nam Bộ. Tiếng ru mở đầu phim "Nổi gió" (1966) là một trong số ít bản ghi giọng ru của bà còn giữ được đến nay.',
      'Nghệ sĩ Kim Nhụy qua đời ngày 18/7/2018 tại TP. Hồ Chí Minh, hưởng thọ 88 tuổi. Cùng năm ấy, Hò Đồng Tháp được công nhận là Di sản văn hoá phi vật thể quốc gia.',
    ],
    timeline: [
      { year: '~1930', text: 'Sinh ra ở Bình Thành, Thanh Bình, Đồng Tháp.' },
      { year: '1945', text: 'Theo kháng chiến, vào Đoàn Văn công tỉnh đội Long Châu Sa.' },
      { year: '1954', text: 'Tập kết ra Bắc, mang theo điệu Hò Đồng Tháp.' },
      { year: '1957', text: 'Đài Tiếng nói Việt Nam thu giọng hò trên đĩa 45 vòng.' },
      { year: '1958', text: 'Hò Đồng Tháp lên sóng chương trình "Dân ca và nhạc cổ truyền".' },
      { year: '1966', text: 'Tiếng ru mở đầu phim "Nổi gió".' },
      { year: '2012', text: 'Gặp GS Trần Văn Khê trong buổi chuyên đề "Điệu hò Đồng Tháp ngày xưa".' },
      { year: '18/7/2018', text: 'Qua đời tại TP. Hồ Chí Minh, hưởng thọ 88 tuổi.' },
    ],
    quote: {
      text: 'Giọng hò ấy như mê hoặc ông, không phải vì lời hay vì điệu, mà vì chất giọng rất riêng, như chứa cả tình cảm của người Việt, của một cô gái thôn quê.',
      by: 'GS.TS Trần Văn Khê, theo lời báo chí thuật lại',
      paraphrase: true,
    },
    toVerify: 'Năm sinh tính theo tuổi thọ 88 được báo chí đưa tin; cần đối chiếu với gia đình.',
  },
  {
    id: 'song-anh',
    monogram: 'SA',
    name: 'Nguyễn Thị Song Anh',
    title: 'Người nối giọng hò của mẹ',
    role: 'Nghệ nhân · Cố vấn chuyên môn của Nam Âm',
    years: 'Sinh 1959',
    group: 'truyen-nghe',
    featured: true,
    lead: 'Con gái duy nhất của nghệ sĩ Kim Nhụy, học hò từ mẹ từ năm năm tuổi và hôm nay đứng lớp dạy hò cho người trẻ Đồng Tháp.',
    story: [
      'Cô Song Anh sinh ngày 6/4/1959, là con gái duy nhất của cố nghệ sĩ Kim Nhụy. Cô học Hò Đồng Tháp trực tiếp từ mẹ từ khoảng năm năm tuổi và tiếp tục được mẹ chỉ dạy suốt những năm sau.',
      'Dù được xem là người học trò giỏi và xứng đáng kế tục mẹ, cô không theo con đường biểu diễn chuyên nghiệp. Nghệ sĩ Kim Nhụy luôn dạy con cháu rằng học hành, kiến thức là chìa khoá để vào đời.',
      'Nhưng giọng hò ngọt ngào, sâu lắng vẫn ở lại. Cô là người giữ băng thu giọng hò năm 1957 của mẹ, và đang phối hợp cùng Sở Văn hoá, Thể thao và Du lịch Đồng Tháp mở lớp dạy hò cho các đơn vị trong tỉnh.',
      'Với nhóm Nam Âm, cô là cố vấn chuyên môn, người kiểm tra độ chính xác về nguồn gốc, lối hò truyền thống, lời hò và nét giai điệu.',
    ],
    timeline: [
      { year: '1959', text: 'Sinh ngày 6/4.' },
      { year: '~1964', text: 'Bắt đầu học hò từ mẹ, nghệ sĩ Kim Nhụy.' },
      { year: 'Hiện nay', text: 'Mở lớp dạy hò cùng Sở VHTTDL Đồng Tháp; cố vấn chuyên môn của Nam Âm.' },
    ],
  },
  {
    id: 'tran-van-khe',
    monogram: 'TK',
    name: 'Trần Văn Khê',
    title: 'Người đưa tiếng hò ra thế giới',
    role: 'Giáo sư, Tiến sĩ âm nhạc học',
    years: '1921 – 2015',
    group: 'lan-toa',
    lead: 'Từ Paris, ông nghe băng thu giọng hò Kim Nhụy và mang điệu Hò Đồng Tháp tới giảng đường của hơn 60 quốc gia.',
    story: [
      'GS.TS Trần Văn Khê là nhà nghiên cứu âm nhạc dân tộc nổi tiếng, nhiều năm giảng dạy và giới thiệu âm nhạc Việt Nam ở nước ngoài.',
      'Năm 1957, băng thu giọng hò Đồng Tháp của nghệ sĩ Kim Nhụy được gửi sang Pháp. Ông nhận ra đây là một làn điệu đặc biệt, học lại điệu hò, rồi giới thiệu Hò Đồng Tháp cùng tên tuổi Kim Nhụy ở hơn 60 quốc gia, dù chưa từng gặp bà.',
      'Phải đến cuối năm 2012, trong buổi chuyên đề "Điệu hò Đồng Tháp ngày xưa" tổ chức tại nhà ông, hai người mới gặp và cùng trò chuyện về điệu hò.',
    ],
    timeline: [
      { year: '1957', text: 'Nhận băng thu giọng hò Kim Nhụy tại Pháp.' },
      { year: 'Nhiều thập kỷ', text: 'Giới thiệu Hò Đồng Tháp ở hơn 60 quốc gia.' },
      { year: '2012', text: 'Buổi chuyên đề "Điệu hò Đồng Tháp ngày xưa", gặp Kim Nhụy.' },
    ],
  },
  {
    id: 'cao-van-ly',
    monogram: 'CL',
    name: 'Cao Văn Lý (Phạm Lý)',
    title: 'Người "ru lại câu hò"',
    role: 'Nhạc sĩ, nhà nghiên cứu âm nhạc dân gian',
    hometown: 'Hồng Ngự, Đồng Tháp',
    group: 'phuc-hoi',
    featured: true,
    lead: 'Ở tuổi "cổ lai hy", ông vẫn lặn lội khắp 12 địa phương để nghe bà con hò, ký âm và hồi sinh một làn điệu đang bị quên.',
    story: [
      'Nhạc sĩ Cao Văn Lý, bút danh Phạm Lý, quê Hồng Ngự, nguyên giảng viên Nhạc viện TP. Hồ Chí Minh. Hò Đồng Tháp lùi vào ký ức đến mức nhiều người dân đất Sen Hồng không tin quê mình từng có điệu hò ấy. Ông quyết chứng minh điều ngược lại.',
      'Năm 2010, tỉnh Đồng Tháp duyệt đề tài "Sưu tầm – Nghiên cứu – Phục hồi điệu Hò Đồng Tháp" do ông và nhạc sĩ Nguyễn Kim Cúc thực hiện. Từ tháng 6/2010 đến tháng 11/2011, ông đi khắp 12 huyện, thị, thành, gặp những nghệ nhân từ 63 đến 91 tuổi.',
      'Nhiều nghệ nhân chỉ còn nhớ lờ mờ làn điệu cũ, còn người trẻ thì hò sai nhịp hoặc thành một điệu khác. Đêm về, ông miệt mài bên tài liệu, phân biệt hò Đồng Tháp với hò Cần Thơ, hò Bến Tre để khẳng định nét riêng của quê mình.',
      'Ông hoàn thiện "lòng bản ứng dụng", ấn hành tài liệu kèm đĩa CD và truyền dạy cho hơn 300 nghệ sĩ trẻ ở địa phương. Công trình này là nền tảng để tỉnh lập hồ sơ đề nghị công nhận di sản.',
    ],
    timeline: [
      { year: '2010', text: 'Đề tài sưu tầm – phục hồi được tỉnh duyệt.' },
      { year: '06/2010 – 11/2011', text: 'Điền dã 12 địa phương, gặp nghệ nhân 63–91 tuổi.' },
      { year: '2011', text: 'Hò Đồng Tháp đoạt giải A tuyệt đối tại Liên hoan âm nhạc dân gian.' },
      { year: '2012', text: 'Ấn hành công trình, hơn 200 bài hò, lòng bản ứng dụng kèm CD.' },
    ],
  },
  {
    id: 'nguyen-kim-cuc',
    monogram: 'KC',
    name: 'Nguyễn Kim Cúc',
    title: 'Người cùng đi tìm điệu hò',
    role: 'Nhạc sĩ, đồng tác giả đề tài phục hồi',
    group: 'phuc-hoi',
    lead: 'Cùng nhạc sĩ Cao Văn Lý rời TP. Hồ Chí Minh về Đồng Tháp, lo sợ điệu hò xưa sẽ mất hẳn.',
    story: [
      'Nhạc sĩ Nguyễn Kim Cúc là đồng tác giả đề tài "Sưu tầm – Nghiên cứu – Phục hồi điệu Hò Đồng Tháp" cùng nhạc sĩ Cao Văn Lý.',
      'Hai người về Đồng Tháp điền dã từ tháng 6/2010 đến tháng 11/2011, gặp gỡ các nghệ nhân lớn tuổi ở 12 địa phương để ghi âm, ghi hình và ký âm lại những câu hò còn sót lại.',
    ],
  },
  {
    id: 'anh-dao',
    monogram: 'AĐ',
    name: 'Anh Đào',
    title: 'Một "cây hò Đồng Tháp"',
    role: 'Ca sĩ',
    group: 'lan-toa',
    lead: 'Học hò với thầy Cao Văn Lý, nay mang điệu hò đi biểu diễn khắp nơi.',
    story: [
      'Ca sĩ Anh Đào được đánh giá có chất giọng dân ca riêng. Hơn mười năm trước, chị được thầy Cao Văn Lý dạy hò và trở thành một trong những "cây hò Đồng Tháp" không thể thiếu trong các chương trình biểu diễn.',
      'Hiện là ca sĩ tự do, ngoài biểu diễn, chị còn đưa Hò Đồng Tháp đến nhiều vùng miền. Năm 2014, chị cùng nghệ sĩ Cao Thị Thắng trình diễn cho học sinh TP. Hồ Chí Minh tại Bảo tàng Thành phố.',
    ],
  },
  {
    id: 'cao-thi-thang',
    monogram: 'CT',
    name: 'Cao Thị Thắng',
    title: 'Giọng hò trên sân khấu hôm nay',
    role: 'Nghệ sĩ Đồng Tháp',
    group: 'lan-toa',
    lead: 'Một trong những nghệ sĩ Đồng Tháp đưa điệu hò đến với học sinh thành phố.',
    story: [
      'Sáng 21/3/2014, nghệ sĩ Cao Thị Thắng cùng ca sĩ Anh Đào trình diễn trong buổi sinh hoạt chuyên đề "Giới thiệu Hò Đồng Tháp" dành cho học sinh tại Bảo tàng TP. Hồ Chí Minh.',
    ],
    toVerify: 'Đang bổ sung tiểu sử.',
  },
  {
    id: 'lu-nhat-vu-le-giang',
    monogram: 'V&G',
    name: 'Lư Nhất Vũ & Lê Giang',
    title: 'Đôi vợ chồng sưu tầm dân ca',
    role: 'Nhạc sĩ & nhà thơ, nhà nghiên cứu',
    group: 'phuc-hoi',
    lead: 'Cả đời gom nhặt hò, lý, hát ru Nam Bộ. Cuốn "Dân ca Đồng Tháp" của hai ông bà là tư liệu nền tảng về vùng đất này.',
    story: [
      'Nhạc sĩ Lư Nhất Vũ và nhà thơ Lê Giang là đôi vợ chồng gắn bó cả đời với việc sưu tầm, biên soạn dân ca Nam Bộ: Dân ca Bến Tre, Dân ca Kiên Giang, Dân ca Cửu Long, Dân ca Sông Bé, Dân ca Hậu Giang, Hò trong dân ca người Việt…',
      'Năm 1995, hai ông bà công bố công trình "Dân ca Đồng Tháp". Năm 2005, công trình "Hát ru Việt Nam" được Hội Nhạc sĩ Việt Nam trao giải.',
      'Người trẻ có thể quen nhạc sĩ Lư Nhất Vũ qua "Bài ca đất phương Nam". Ông qua đời năm 2025.',
    ],
  },
]

export const groupLabels: Record<Artist['group'], string> = {
  'nguon-coi': 'Nguồn cội',
  'huyen-thoai': 'Huyền thoại',
  'truyen-nghe': 'Truyền nghề',
  'phuc-hoi': 'Sưu tầm & phục hồi',
  'lan-toa': 'Lan toả',
}

export const artistById = (id: string) => artists.find((a) => a.id === id)
