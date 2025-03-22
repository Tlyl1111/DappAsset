# Documentation

### addAsset()
**Endpoint:** /addAsset  
**Method:** POST  
**Mô tả:** Thêm một tài sản mới vào hệ thống cho người dùng hiện tại.

**Tham số yêu cầu:**
- name (string): Tên tài sản  
- purchaseDate (uint256): Ngày mua (timestamp)  
- value (uint256): Giá trị tài sản  
- description (string): Mô tả tài sản  
- imageURL (string): Đường dẫn hình ảnh minh họa tài sản  
- note (string): Ghi chú thêm

**Phản hồi:**
- 200 OK – Tài sản được thêm thành công  
- 400 Bad Request – Dữ liệu không hợp lệ hoặc thiếu thông tin

### editAsset()
**Endpoint:** /editAsset  
**Method:** POST  
**Mô tả:** Chỉnh sửa thông tin tài sản đã có.

**Tham số yêu cầu:**
- assetId (uint256): ID của tài sản  
- name (string): Tên tài sản mới  
- purchaseDate (uint256): Ngày mua mới  
- value (uint256): Giá trị mới  
- description (string): Mô tả mới  
- imageURL (string): Đường dẫn hình ảnh mới  
- note (string): Ghi chú mới

**Phản hồi:**
- 200 OK – Tài sản được cập nhật thành công  
- 400 Bad Request – assetId không hợp lệ hoặc không tồn tại

### deleteAsset()
**Endpoint:** /deleteAsset  
**Method:** POST  
**Mô tả:** Xóa một tài sản thuộc sở hữu của người dùng.

**Tham số yêu cầu:**
- assetId (uint256): ID của tài sản cần xóa

**Phản hồi:**
- 200 OK – Tài sản đã được xóa  
- 400 Bad Request – assetId không hợp lệ hoặc không tồn tại  
- 403 Forbidden – Người dùng không sở hữu tài sản này

### getAssetDetails() 
**Endpoint:** /getAssetDetails  
**Method:** GET  
**Mô tả:** Lấy chi tiết thông tin của một tài sản.

**Tham số yêu cầu:**
- assetId (uint256): ID tài sản cần truy xuất

**Phản hồi:**
- 200 OK – Trả về chi tiết tài sản  
- 404 Not Found – Không tìm thấy tài sản

### getUserAssets() 
**Endpoint:** /getUserAssets  
**Method:** GET  
**Mô tả:** Lấy danh sách tất cả các tài sản thuộc sở hữu của người dùng hiện tại.

**Tham số yêu cầu:** Không có

**Phản hồi:**
- 200 OK – Trả về danh sách các tài sản của người dùng  
- 204 No Content – Người dùng không có tài sản nào

### Ghi chú nội bộ

- isOwner(assetId): Hàm kiểm tra người gọi có sở hữu tài sản hay không  
- removeAssetFromUserList(assetId): Hàm xóa assetId khỏi danh sách của người dùng
