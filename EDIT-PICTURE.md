# Hướng dẫn thay hình ảnh trên trang `index.html`

Tài liệu này liệt kê toàn bộ vị trí hình ảnh đang được dùng trên trang chủ và cách thay ảnh mà không làm ảnh hưởng đến bố cục, hiệu ứng chuyển ảnh hoặc giao diện responsive.

> Số dòng trong tài liệu là số dòng hiện tại và có thể thay đổi sau khi chỉnh sửa code. Khi không tìm thấy đúng dòng, hãy tìm bằng tên class, `src`, tên file ảnh hoặc nội dung được ghi trong cột **Vị trí cần tìm**.

## 1. Cách thay ảnh cơ bản

### Cách khuyến nghị: thêm file mới và đổi đường dẫn

1. Chép ảnh mới vào đúng thư mục, ví dụ:
   - Ảnh hoạt động garage: `pictures/dpauto/`
   - Logo thương hiệu: `pictures/brand/`
   - Ảnh bài viết: `pictures/knowledge/`
   - Ảnh dùng chung: `pictures/`
2. Đặt tên file bằng chữ thường, không dấu, không khoảng trắng. Ví dụ: `bao-duong-dinh-ky.webp`.
3. Đổi đường dẫn cũ trong `index.html`, `styles.css` hoặc `script.js` thành đường dẫn mới.
4. Sửa nội dung `alt` để mô tả đúng ảnh mới.
5. Lưu file và tải lại trang. Nếu trình duyệt vẫn hiện ảnh cũ, dùng `Ctrl + F5`.

Ví dụ thay một ảnh HTML:

```html
<!-- Trước -->
<img src="pictures/dpauto/anh-cu.jpg" alt="Khu vực bảo dưỡng">

<!-- Sau -->
<img src="pictures/dpauto/bao-duong-dinh-ky.webp" alt="Kỹ thuật viên bảo dưỡng xe tại Toàn Trung">
```

Đường dẫn trong website nên dùng dấu `/`, không dùng dấu `\` của Windows.

### Cách nhanh: ghi đè file cũ

Có thể thay trực tiếp file trong thư mục bằng một ảnh mới có **đúng tên và đúng phần mở rộng**. Cách này không cần sửa code, nhưng trình duyệt có thể lưu ảnh cũ trong bộ nhớ đệm. Hãy tải lại bằng `Ctrl + F5` sau khi thay.

## 2. Logo Toàn Trung ở đầu và cuối trang

Logo hiện tại được dùng tại hai vị trí trong `index.html`:

- Header, khoảng dòng 19: tìm `class="brand-logo"`.
- Footer, khoảng dòng 403: tìm `class="brand-logo footer-logo"`.

Cả hai đang dùng:

```html
src="pictures/logo-dpauto.png"
```

Nếu ghi đè file `pictures/logo-dpauto.png`, header và footer sẽ cùng được cập nhật. Nếu dùng tên file mới, cần đổi `src` ở **cả hai vị trí**.

Khuyến nghị: PNG hoặc WebP nền trong suốt, ảnh ngang, logo có khoảng trống vừa phải quanh nội dung.

## 3. Ảnh nền Hero

Trong `index.html`, tìm khối `.hero-slides` hoặc các dòng có `--slide-image` (hiện ở khoảng dòng 63–66):

```html
<div class="hero-slide is-active"
     style="--slide-image: url('pictures/dpauto/anh-hero-01.jpg')"
     role="img"
     aria-label="Mô tả ảnh"></div>
```

Thay phần nằm trong `url('...')` cho từng slide. Có thể thêm hoặc bớt slide, nhưng mỗi slide cần giữ class `hero-slide`. Slide đầu tiên giữ thêm class `is-active`.

Sau khi thay ảnh, cập nhật `aria-label` để mô tả đúng nội dung ảnh.

Khuyến nghị:

- Tỷ lệ ngang khoảng 16:9, tối thiểu 1.920 × 1.080 px.
- Chủ thể quan trọng nên nằm ở giữa hoặc lệch phải vì vùng chữ và lớp phủ tối nằm bên trái.
- Dùng JPG/WebP chất lượng tốt, dung lượng nên dưới khoảng 500 KB mỗi ảnh.
- Ảnh được hiển thị theo `background-size: cover`, nên một phần mép ảnh có thể bị cắt trên màn hình khác nhau.

## 4. Ảnh hoạt động trong phần Giới thiệu

Trong `index.html`, tìm `.station-gallery-track` (khoảng dòng 97–106).

Dải ảnh hiện có 5 ảnh thật, sau đó lặp lại đúng 5 ảnh đó để tạo chuyển động liên tục:

```html
<!-- Nhóm ảnh chính -->
<img src="pictures/dpauto/anh-01.jpg" alt="Mô tả ảnh">

<!-- Nhóm lặp lại -->
<img src="pictures/dpauto/anh-01.jpg" alt="" aria-hidden="true">
```

Khi đổi ảnh, cần đổi ở **cả nhóm chính và nhóm lặp lại**, đồng thời giữ nguyên thứ tự. Nhóm lặp lại tiếp tục để `alt="" aria-hidden="true"`.

Khuyến nghị: ảnh ngang 4:3, tối thiểu 800 × 600 px; tránh đặt chủ thể sát mép vì ảnh dùng chế độ `object-fit: cover`.

## 5. Ảnh xem trước video YouTube

Trong `index.html`, tìm `.video-launch` hoặc `img.youtube.com` (khoảng dòng 114):

```html
<img src="https://img.youtube.com/vi/cn6TcsENj0U/maxresdefault.jpg"
     alt="Ảnh xem trước video Trạm Dịch Vụ Toàn Trung">
```

Chuỗi `cn6TcsENj0U` là ID video YouTube. Nếu đổi sang video khác, cần sửa ID tại **hai nơi**:

1. Ảnh xem trước trong `index.html`.
2. Đường dẫn iframe trong `script.js`, tìm `youtube-nocookie.com/embed/` (hiện khoảng dòng 104).

Ví dụ với ID video mới là `VIDEO_MOI`:

```html
src="https://img.youtube.com/vi/VIDEO_MOI/maxresdefault.jpg"
```

```js
iframe.src = 'https://www.youtube-nocookie.com/embed/VIDEO_MOI?autoplay=1&rel=0';
```

`styles.css` còn có một ảnh nền dự phòng tại `.video-launch` (khoảng dòng 116). Có thể thay đường dẫn trong `url("...")` nếu muốn ảnh dự phòng đồng bộ với video.

## 6. Ảnh các thẻ Dịch vụ Garage

Trong `index.html`, tìm `class="service-panel-image"` (khoảng dòng 130–168). Mỗi thẻ có một thẻ ảnh như sau:

```html
<img class="service-panel-image"
     src="pictures/dpauto/anh-dich-vu.jpg"
     alt="Mô tả dịch vụ">
```

Các ảnh xuất hiện theo thứ tự:

1. Bảo dưỡng định kỳ
2. Chăm sóc & detailing
3. Đồng sơn
4. Cứu hộ
5. Điện – Điện tử
6. Điều hòa
7. Phanh – Lốp – Thước lái
8. Máy – Gầm

Khuyến nghị:

- Ảnh tối thiểu 1.000 px ở cạnh dài.
- Ưu tiên ảnh có chủ thể ở vùng giữa; ảnh dùng `object-fit: cover` và sẽ thay đổi vùng cắt khi thẻ mở rộng.
- Tránh ảnh đã có quá nhiều chữ vì thẻ còn phủ tiêu đề và nội dung lên trên.
- Cập nhật `alt` theo đúng hạng mục sau khi thay.

Nếu một ảnh bị cắt sai trọng tâm, có thể thêm class riêng cho ảnh và đặt `object-position` trong `styles.css`, ví dụ:

```html
<img class="service-panel-image service-image-brake" src="pictures/dpauto/phanh-lop.webp" alt="Kiểm tra phanh và lốp">
```

```css
.service-image-brake {
  object-position: 65% center;
}
```

## 7. Logo đối tác cung cấp sản phẩm

Trong `index.html`, tìm `.partner-card` (khoảng dòng 184–190). Mỗi đối tác có cấu trúc:

```html
<figure class="partner-card" role="listitem">
  <div class="partner-logo">
    <img src="pictures/brand/ten-doi-tac.png" alt="Tên đối tác">
  </div>
</figure>
```

Khi thay logo:

- Đổi `src` và nội dung `alt`.
- Ưu tiên PNG/WebP nền trong suốt, logo rõ nét và không bị cắt sát mép.
- Nên chuẩn hóa các file trên một khung ảnh ngang giống nhau, ví dụ 600 × 300 px, với khoảng đệm trong suốt quanh logo.

Ba logo hiện có class hiệu chỉnh riêng: `partner-card-70mai`, `partner-card-vincar` và `partner-card-yuemi`. Nếu thay các logo này bằng thương hiệu có hình dáng khác, hãy kiểm tra các class tương ứng trong `styles.css` và bỏ hoặc điều chỉnh kích thước riêng nếu cần.

## 8. Ảnh phần Vì sao chọn Toàn Trung

Ảnh này là ảnh nền CSS, không nằm trong thẻ `<img>`.

Trong `styles.css`, tìm `.why-photo` (hiện khoảng dòng 180):

```css
.why-photo {
  background-image: url("pictures/garage/garage-team.jpg");
  background-size: cover;
  background-position: center;
}
```

Thay đường dẫn trong `background-image`.

Khuyến nghị: ảnh dọc hoặc gần tỷ lệ 3:4, tối thiểu 1.200 × 1.600 px. Ảnh đang dùng `cover`, vì vậy nên để người và nội dung quan trọng gần trung tâm. Có thể đổi `background-position`, ví dụ `center 30%`, nếu cần đưa khuôn mặt hoặc bảng hiệu vào vùng nhìn thấy.

## 9. Ảnh trong Quy trình sửa chữa

Ảnh quy trình thay đổi theo từng bước bằng JavaScript. Vì vậy, nguồn chính cần sửa nằm trong `script.js`, không chỉ ở `index.html`.

Trong `script.js`, tìm mảng `processSteps` (hiện bắt đầu khoảng dòng 136). Mỗi bước có thuộc tính `image`:

```js
{
  heading: 'Tiếp nhận xe & lắng nghe nhu cầu',
  // ...
  image: 'pictures/dpauto/tiep-nhan-xe.webp',
  imageAlt: 'Khu vực tiếp nhận xe tại Toàn Trung'
}
```

Thay `image` và sửa `imageAlt` của cả 5 bước:

1. Tiếp nhận xe
2. Kiểm tra và chẩn đoán
3. Phương án và báo giá
4. Thực hiện và kiểm tra
5. Bàn giao

Trong `index.html`, ảnh `#process-image` ở khoảng dòng 241 là ảnh hiển thị ban đầu. Nên đặt nó giống ảnh của bước đầu tiên trong `processSteps` để trang không lóe ảnh khác lúc vừa tải.

Khuyến nghị: ảnh ngang 3:2 hoặc 16:10, tối thiểu 1.200 × 800 px. Chủ thể nên nằm ở trung tâm vì ảnh dùng `object-fit: cover`.

## 10. Ảnh trang trí thẻ bảo dưỡng 40.000 km

Thẻ 40.000 km dùng một ảnh nền mờ riêng. Trong `styles.css`, tìm `.maintenance-card.featured::after` (hiện khoảng dòng 244):

```css
.maintenance-card.featured::after {
  background: url("pictures/dpauto/anh-40000-km.jpg") 70% center / cover no-repeat;
}
```

Thay đường dẫn trong `url("...")`.

Khuyến nghị: dùng ảnh bánh xe, mâm xe, khoang máy hoặc chi tiết kỹ thuật có chủ thể nằm bên phải. CSS đang làm ảnh mờ và tạo lớp chuyển sắc để nội dung chữ vẫn dễ đọc.

## 11. Logo các dòng xe hỗ trợ

Trong `index.html`, tìm `.brand-logo-track` hoặc `.brand-logo-item` (khoảng dòng 293–322).

Dải logo gồm hai nhóm giống hệt nhau để chạy liên tục từ phải sang trái. Khi thêm, xóa hoặc thay logo, cần cập nhật **cả hai nhóm với cùng số lượng và cùng thứ tự**:

```html
<!-- Nhóm chính: có alt -->
<div class="brand-logo-item">
  <img src="pictures/brand/toyota.webp" alt="Toyota">
</div>

<!-- Nhóm lặp: alt để trống -->
<div class="brand-logo-item">
  <img src="pictures/brand/toyota.webp" alt="">
</div>
```

Khuyến nghị:

- PNG/WebP nền trong suốt.
- Không cắt sát logo; giữ đủ biểu tượng và chữ của hãng.
- Chuẩn hóa các file vào khung khoảng 500 × 300 px với khoảng đệm trong suốt.
- Không dùng ảnh nền trắng đặc nếu logo đã được đặt trên thẻ nền trắng.

## 12. Ảnh đại diện trong phần Trải nghiệm dịch vụ

Trong `index.html`, tìm `class="review-avatar"` (khoảng dòng 335–340):

```html
<img class="review-avatar" src="pictures/dpauto/khach-hang-01.webp" alt="">
```

Khuyến nghị:

- Ảnh vuông 1:1, tối thiểu 400 × 400 px.
- Khuôn mặt nằm gần trung tâm vì ảnh được cắt thành hình tròn bằng `object-fit: cover`.
- Nếu đây chỉ là ảnh minh họa, có thể giữ `alt=""`. Nếu là khách hàng thật và đã được phép hiển thị danh tính, có thể dùng `alt="Ảnh anh/chị ..."`.

`styles.css` hiện có một số điều chỉnh `object-position` theo vị trí từng thẻ. Sau khi thay toàn bộ avatar, nên kiểm tra lại trên desktop và mobile; nếu khuôn mặt bị lệch, điều chỉnh hoặc bỏ các quy tắc `.review-card:nth-child(...) .review-avatar`.

## 13. Ảnh phần Kiến thức chăm xe

Trong `index.html`, tìm `.article-visual` (khoảng dòng 371–379). Hiện có 3 ảnh tương ứng với 3 bài:

1. Kiểm tra dầu động cơ: `pictures/knowledge/daudongco.png`
2. Kiểm tra độ chụm: `pictures/knowledge/độ chụm.png`
3. Điều hòa ô tô: `pictures/knowledge/điều hòa ô tô.png`

Ví dụ:

```html
<a class="article-visual" href="#knowledge" aria-label="Đọc bài ...">
  <img src="pictures/knowledge/anh-bai-viet.webp"
       alt="Mô tả nội dung ảnh"
       loading="lazy">
</a>
```

Khuyến nghị: ảnh ngang khoảng 16:10, tối thiểu 1.200 × 750 px. Ảnh thông thường dùng `object-fit: cover`. Riêng thẻ có class `article-visual-diagram` dùng `object-fit: contain`, phù hợp với sơ đồ hoặc infographic cần hiển thị đầy đủ chi tiết.

## 14. Icon Gọi điện và Zalo

Các icon được dùng ở cả nút nổi desktop và thanh hành động mobile, khoảng dòng 412–418 trong `index.html`:

- Gọi điện: `pictures/icon-phone-clean.png`
- Zalo: `pictures/logo-zalo-clean.png`

Mỗi file xuất hiện hai lần. Nếu đổi sang tên file mới, hãy sửa cả nút desktop và nút mobile. Nếu ghi đè đúng tên cũ, cả hai giao diện tự cập nhật.

Khuyến nghị: PNG/WebP vuông, nền trong suốt, tối thiểu 256 × 256 px. Icon cần có khoảng đệm đều và không chứa viền hoặc nền thừa trong chính file ảnh.

## 15. Bản đồ Google Maps

Bản đồ ở phần Trạm Dịch Vụ là một `<iframe>`, không phải ảnh. Muốn đổi địa điểm ghim, hãy tìm iframe có `google.com/maps/embed` trong `index.html` và thay thuộc tính `src` bằng mã nhúng mới lấy từ Google Maps: **Chia sẻ → Nhúng bản đồ → Sao chép HTML**.

Không dùng link rút gọn dạng `maps.app.goo.gl` trực tiếp làm `src` của iframe.

## 16. Kích thước ảnh tham khảo

| Khu vực | Tỷ lệ phù hợp | Kích thước tối thiểu gợi ý | Kiểu file |
|---|---:|---:|---|
| Hero | 16:9 | 1.920 × 1.080 px | WebP/JPG |
| Dải ảnh Giới thiệu | 4:3 | 800 × 600 px | WebP/JPG |
| Thẻ Dịch vụ | 4:3 hoặc ảnh dọc | cạnh dài 1.000 px | WebP/JPG |
| Vì sao chọn Toàn Trung | 3:4 | 1.200 × 1.600 px | WebP/JPG |
| Quy trình sửa chữa | 3:2 hoặc 16:10 | 1.200 × 800 px | WebP/JPG |
| Ảnh thẻ 40.000 km | linh hoạt | 1.200 × 800 px | WebP/JPG |
| Logo đối tác/hãng xe | khung ngang có đệm | 500 × 300 px | PNG/WebP trong suốt |
| Avatar bình luận | 1:1 | 400 × 400 px | WebP/JPG |
| Bài viết | 16:10 | 1.200 × 750 px | WebP/JPG/PNG |
| Icon Gọi/Zalo | 1:1 | 256 × 256 px | PNG/WebP trong suốt |

## 17. Checklist sau khi thay ảnh

- [ ] Ảnh hiển thị đúng, không có biểu tượng ảnh lỗi.
- [ ] Đường dẫn dùng `/` và đúng chữ hoa/chữ thường.
- [ ] Thuộc tính `alt` mô tả đúng ảnh mới.
- [ ] Hero vẫn tự chuyển đủ các slide.
- [ ] Dải ảnh Giới thiệu không bị khựng do hai nhóm khác nhau.
- [ ] Dải logo hãng xe có hai nhóm giống nhau và chạy liên tục.
- [ ] Ảnh Quy trình đổi đúng theo từng bước.
- [ ] Logo không bị cắt mất chữ hoặc biểu tượng.
- [ ] Khuôn mặt trong avatar không bị cắt lệch.
- [ ] Kiểm tra nhanh ở desktop và màn hình mobile 390 px.
- [ ] Dùng `Ctrl + F5` nếu trình duyệt còn hiển thị ảnh cũ.

