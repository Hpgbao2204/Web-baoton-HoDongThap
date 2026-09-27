# Nam Âm

> Vang tiếng hò, tỏ tiếng lòng.

**Nam Âm** (tiếng của phương Nam) là web bảo tồn và lan toả **Hò Đồng Tháp**, Di sản văn hoá phi vật thể quốc gia (2018).
Web kể lại câu chuyện điệu hò, giới thiệu những nghệ sĩ đã hò, đã giữ và đã hồi sinh nó, gom sách báo có dẫn nguồn, và mời người trẻ chơi thử.

## Chạy trên máy

Cần Node.js 20 trở lên.

```bash
npm install
npm run dev            # mở http://localhost:5173
npm run build          # xuất web tĩnh ra thư mục dist/
npm run build:preview  # gom cả web vào một file preview/nam-am.html
```

Thư mục `dist/` chạy được trên mọi hosting tĩnh (GitHub Pages, Netlify, Vercel…). Web dùng đường dẫn dạng `#/nghe-si` nên không cần cấu hình server.

## Các trang

| Đường dẫn | Trang | Nội dung |
| --- | --- | --- |
| `#/` | Trang chủ | Cảnh 3D sông nước, thẻ lật "Bạn có biết?", Kim Nhụy và đĩa hát 45 vòng, câu hò, dòng thời gian, nghệ sĩ, sách báo |
| `#/cau-chuyen` | Câu chuyện Hò | 8 chặng từ đầu thế kỷ XIX đến hôm nay; dòng sông 3D đổi giờ theo từng chặng; sáu nét đặc trưng của điệu hò |
| `#/nghe-si` | Nghệ sĩ | Người dân Đồng Tháp Mười, Kim Nhụy, Song Anh, Trần Văn Khê, Cao Văn Lý, Nguyễn Kim Cúc, Anh Đào, Cao Thị Thắng, Lư Nhất Vũ & Lê Giang |
| `#/nghe-si/:id` | Trang từng nghệ sĩ | Tiểu sử, dấu mốc, bài báo liên quan |
| `#/nghe-ho` | Nghe Hò | Nơi nghe bản thu, hướng dẫn nghe, câu hò năm 1957, tiếng ru phim "Nổi gió" |
| `#/sach-bao` | Sách & Báo | Sách nền tảng và bài báo, lọc theo chủ đề, loại, tìm kiếm |
| `#/thu-ho` | Thử Hò | Trắc nghiệm 6 câu và "cuộc hẹn 5 phút" bên sông |
| `#/hoat-dong` | Hoạt động | Chuỗi hoạt động Hẹn Hò: Hò Gọi → Hò Tỏ Lòng → Hò Tỏ Tình |
| `#/ve-nam-am` | Về Nam Âm | Thành viên, cố vấn, giảng viên hướng dẫn |

## Thêm dữ liệu

Mọi nội dung nằm trong `src/data/`. Sửa file ở đây là giao diện tự cập nhật.

| File | Dùng cho |
| --- | --- |
| `site.ts` | Tên, tagline, lời giới thiệu, menu |
| `artists.ts` | Nghệ sĩ: tiểu sử, dấu mốc, lời kể, ảnh |
| `sources.ts` | Bài báo, sách, nơi nghe bản thu |
| `heritage.ts` | Các chặng câu chuyện, đặc trưng điệu hò, thẻ "Bạn có biết?", trắc nghiệm, câu hò trích |
| `people.ts` | Thành viên nhóm, cố vấn, giảng viên |
| `campaign.ts` | Ba giai đoạn hoạt động |
| `types.ts` | Kiểu dữ liệu, mô tả từng trường |

### Thêm một bài báo

Thêm một mục vào mảng `sources` trong `src/data/sources.ts`. Trường `tags` chứa id nghệ sĩ (`kim-nhuy`, `song-anh`…) để bài tự hiện ở trang nghệ sĩ đó.

### Thêm ảnh nghệ sĩ hoặc thành viên

1. Bỏ ảnh vào `src/assets/artists/` hoặc `src/assets/team/` (nên cắt dọc 4:5, rộng khoảng 640px).
2. Import ảnh trong `artists.ts` hoặc `people.ts` rồi gán vào trường `photo`.
3. Chỉ dùng ảnh đã có sự đồng ý của gia đình hoặc người giữ bản quyền.

## Nguyên tắc nội dung

- Mọi thông tin văn hoá, tiểu sử đều ghi nguồn. Mục nào chưa chắc thì điền `toVerify` để web hiện dấu "Cần xác minh".
- Lời kể được báo chí thuật lại thì đánh dấu `paraphrase: true`, không trình bày như trích nguyên văn.
- Không đăng lại bản thu của đơn vị khác; chỉ dẫn liên kết tới trang gốc.

## Công nghệ

Vite, React, React Router, Three.js (cảnh sông nước 3D), CSS 3D (đĩa hát, thẻ lật), Web Audio (tiếng sông nước nền, không phải tiếng Hò).
Cảnh 3D tự dừng khi cuộn khuất và đứng yên khi máy bật chế độ giảm chuyển động.
