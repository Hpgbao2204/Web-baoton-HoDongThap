# Hẹn Hò Đồng Tháp

> Vang tiếng hò, tỏ tiếng lòng.

Web của nhóm **Nam Âm** về **Hò Đồng Tháp**: thư viện số, câu chuyện nghiên cứu và trải nghiệm tương tác.
Hành trình của người xem đi theo ba bước **Nghe Hò → Hiểu Hò → Cùng Hò**.

## Chạy trên máy

Cần Node.js 20 trở lên.

```bash
npm install
npm run dev            # mở http://localhost:5173
npm run build          # xuất web tĩnh ra thư mục dist/
npm run build:preview  # gom cả web vào một file preview/hen-ho-dong-thap.html
```

Thư mục `dist/` chạy được trên mọi hosting tĩnh (GitHub Pages, Netlify, Vercel…). Web dùng đường dẫn dạng `#/nghe-ho` nên không cần cấu hình server.

## Các trang

| Đường dẫn | Trang | Nội dung |
| --- | --- | --- |
| `#/` | Trang chủ | Cảnh 3D sông nước, bốn lớp nghĩa của Hò, nghe thử, số liệu người trẻ, hành trình, ba giai đoạn chiến dịch |
| `#/kham-pha` | Khám phá Hò | Các chủ đề văn hoá, dòng thời gian, tài liệu nền tảng |
| `#/nghe-ho` | Nghe Hò | Trình phát, hướng dẫn nghe, kho bản ghi |
| `#/nguoi-giu-tieng-ho` | Người giữ tiếng Hò | Ba cố vấn và quy trình duyệt nội dung |
| `#/nghien-cuu` | Nghiên cứu | Quy trình, số liệu khảo sát n = 306, mô hình S–O–R, rào cản và điểm chạm |
| `#/thu-vien` | Thư viện | Lọc theo loại, theo nguồn gốc, tìm kiếm, bảng nguồn gốc từng tư liệu |
| `#/thu-ho` | Thử Hò | "Một cuộc hẹn 5 phút": nghe, chọn bối cảnh, đoán ý, hò đáp, ghi nhớ |
| `#/hen-ho` | Chiến dịch | Hò Gọi → Hò Tỏ Lòng → Hò Tỏ Tình, dòng sông đổi màu theo từng chặng |
| `#/nam-am` | Nam Âm | Năm thành viên và giảng viên hướng dẫn |

## Thêm dữ liệu

Mọi nội dung nằm trong `src/data/`. Sửa file ở đây là giao diện tự cập nhật, không cần đụng vào trang.

| File | Dùng cho |
| --- | --- |
| `site.ts` | Tên, tagline, thông điệp, menu, hành trình |
| `people.ts` | Thành viên, giảng viên, cố vấn |
| `heritage.ts` | Chủ đề trang Khám phá, dòng thời gian, tài liệu tham khảo, nhãn nguồn gốc |
| `research.ts` | Số liệu khảo sát và mô hình |
| `archive.ts` | Tư liệu thư viện (âm thanh, video, ảnh, phỏng vấn…) |
| `campaign.ts` | Ba giai đoạn và câu chuyện chiến dịch |
| `types.ts` | Kiểu dữ liệu, mô tả từng trường |

### Ảnh thành viên

Hiện cả năm người dùng chung ảnh `src/assets/team/member-placeholder.jpg`. Khi có ảnh riêng:

1. Bỏ ảnh vào `src/assets/team/` (ví dụ `vy.jpg`, nên cắt dọc tỉ lệ 4:5, rộng khoảng 640px).
2. Trong `src/data/people.ts`: `import vyPhoto from '../assets/team/vy.jpg'` rồi đặt `photo: vyPhoto`.
3. Đổi `role: 'Đang cập nhật'` thành vai trò thật.

### Thêm một bản ghi Hò

Đặt file âm thanh vào `public/audio/` rồi thêm vào mảng `archive` trong `src/data/archive.ts`:

```ts
{
  id: 'ho-tren-ghe-01',
  title: 'Hò trên ghe',
  type: 'audio',
  status: 'traditional_reference',      // xem statusLabels trong heritage.ts
  summary: 'Một câu hò ghi tại …',
  performer: 'Tên người hò',
  durationSeconds: 184,
  audioUrl: 'audio/ho-tren-ghe-01.mp3',
  lyrics: 'Chỉ điền khi đã được cố vấn xác minh',
  provenance: {
    source: '…',
    recordedAt: '2026-09-09',
    location: 'Đồng Tháp',
    verifiedBy: ['Nguyễn Thị Song Anh'],
    rights: '…',
    consent: 'Đã đồng ý',
  },
}
```

Khi `archive` có ít nhất một mục, các thẻ "Mục mẫu" tự ẩn. Bản ghi âm thanh đầu tiên sẽ xuất hiện ở trình phát trang chủ.

## Nguyên tắc nội dung

- Luôn phân biệt **tư liệu truyền thống** với **sáng tạo đương đại** bằng nhãn nguồn gốc.
- Không tự điền lời hò, tên nghệ nhân, nguồn hay quyền sử dụng khi chưa được xác minh.
- Mục nào chưa chắc thì gắn `toVerify: true` để web hiện dấu "Cần xác minh".
- Dự án góp phần giúp người trẻ nhận biết, hiểu và tham gia. Tránh viết "cứu", "hồi sinh" hay "bảo tồn" theo nghĩa nhân quả.

## Công nghệ

Vite, React, React Router, Three.js (cảnh sông nước 3D), Web Audio (tiếng sông nước nền, không phải tiếng Hò).
Cảnh 3D tự dừng khi cuộn khuất và đứng yên khi máy bật chế độ giảm chuyển động.
