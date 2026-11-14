WEBSITE SINH NHẬT BÉ YÊU – LÊ THỊ MỸ DUYÊN

CẤU TRÚC:
- index.html: nội dung website và danh sách ảnh của 4 album
- style.css: giao diện, màu sắc, hiệu ứng và responsive
- script.js: đếm ngược, album ảnh, thư bí mật, nhạc, thổi nến, pháo hoa
- images/: nơi lưu ảnh dùng trong album

CÁCH CHẠY:
1. Giải nén ZIP.
2. Giữ index.html, style.css, script.js và thư mục images cùng cấp.
3. Mở index.html bằng Chrome hoặc Edge.

CÁCH THÊM ẢNH VÀO ALBUM (KHÔNG THÊM TRÊN WEBSITE):
1. Chép ảnh vào thư mục images.
2. Mở index.html bằng Notepad hoặc VS Code.
3. Tìm đoạn <script type="application/json" id="album-data">.
4. Trong album muốn thêm ảnh, nhập đường dẫn vào mảng "photos".

Ví dụ:
  {"name":"Khoảnh khắc đáng yêu","photos":["images/anh1.jpg","images/anh2.png"]}

Có 4 album theo thứ tự:
- Khoảnh khắc đáng yêu
- Những ngày nhiều tiếng cười
- Những chuyến đi
- Dành riêng cho em

Có thể dùng JPG, JPEG, PNG, WEBP. Đường dẫn và tên file phải đúng chính xác.
Mỗi trang hiển thị tối đa 4 ảnh. Muốn thêm ảnh chỉ cần chép ảnh vào images và sửa danh sách photos trong index.html. Ảnh sẽ giữ nguyên sau khi tải lại trang.

LƯU Ý KHI ĐƯA WEBSITE LÊN INTERNET:
Upload cả thư mục images cùng index.html, style.css và script.js lên hosting/repository. Không đổi vị trí thư mục nếu chưa sửa lại đường dẫn ảnh.


THEM VIDEO VAO ALBUM
-------------------
1. Dat anh vao thu muc images va video vao thu muc videos (cung cap voi index.html).
2. Mo index.html bang Notepad, tim khoi <script type="application/json" id="album-data">.
3. Them duong dan video vao mang "photos" cua album muon them. Vi du:
   {"name":"Khoanh khac dang yeu","photos":["images/anh1.jpg","videos/video1.mp4"]}
4. Luu index.html va mo lai trang web. Video se co nut phat/dung va dieu khien am thanh.

Dinh dang video khuyen dung: MP4 (H.264). Cung co the dung WebM.
Luu y: Khi dua website len mang, hay tai ca thu muc videos len cung index.html.
