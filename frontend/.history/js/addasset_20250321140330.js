document
  .getElementById("showFormButton")
  .addEventListener("click", function () {
    const formContainer = document.getElementById("assetFormContainer");
    formContainer.style.display = "block"; 
  });
  
  document.getElementById("assetForm").addEventListener("submit", addAsset);

document.getElementById("uploadWidget").addEventListener("click", function () {
  var myWidget = cloudinary.createUploadWidget(
    {
      cloudName: "YOUR_CLOUD_NAME", // Thay bằng Cloud Name của bạn
      uploadPreset: "YOUR_UPLOAD_PRESET", // Thay bằng Upload Preset của bạn
      sources: ["local", "url", "camera"], // Cho phép tải lên từ máy tính, URL, hoặc camera
    },
    (error, result) => {
      if (result.event === "success") {
        console.log("Uploaded image:", result.info);
        const imageURL = result.info.secure_url; // Lấy URL của ảnh đã tải lên từ Cloudinary
        document.getElementById("imageURL").value = imageURL; // Điền URL vào input
      }
    }
  );
  myWidget.open(); // Mở widget để người dùng chọn ảnh
});

// Lắng nghe sự kiện khi form được submit
document
  .getElementById("assetForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Ngừng hành động mặc định của form

    const name = document.getElementById("name").value;
    const purchaseDate =
      new Date(document.getElementById("purchaseDate").value).getTime() / 1000;
    const value = document.getElementById("value").value;
    const description = document.getElementById("description").value;
    const note = document.getElementById("note").value;
    const imageURL = document.getElementById("imageURL").value; // Lấy URL của ảnh đã tải lên từ Cloudinary

    if (
      !name ||
      !purchaseDate ||
      !value ||
      !description ||
      !imageURL ||
      !note
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Tiến hành xử lý thêm tài sản vào Blockchain hoặc backend của bạn
    console.log(
      "Asset Added:",
      name,
      purchaseDate,
      value,
      description,
      imageURL,
      note
    );
  });
