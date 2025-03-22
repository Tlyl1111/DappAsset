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
      cloudName: "YOUR_CLOUD_NAME", 
      uploadPreset: "YOUR_UPLOAD_PRESET",
      sources: ["local", "url", "camera"], 
    },
    (error, result) => {
      if (result.event === "success") {
        console.log("Uploaded image:", result.info);
        const imageURL = result.info.secure_url;
        document.getElementById("imageURL").value = imageURL; 
      }
    }
  );
  myWidget.open(); 
});


async function addAsset(event) {
    event.preventDefault();  

    const name = document.getElementById("name").value;
    const purchaseDate = new Date(document.getElementById("purchaseDate").value).getTime() / 1000;
    const value = document.getElementById("value").value;
    const description = document.getElementById("description").value;
    const note = document.getElementById("note").value;
    const imageUpload = document.getElementById("imageUpload").files[0];

    // Kiểm tra các trường dữ liệu
    if (!name || !purchaseDate || !value || !description || !imageUpload || !note) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    // Gọi hàm upload hình ảnh lên Firebase
    const imageURL = await uploadImageToFirebase(imageUpload);
    console.log("imageURL:", imageURL); // Kiểm tra đường dẫn ảnh

    try {
        const fromAddress = accounts[0].address;

        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = await contract.methods.addAsset(name, purchaseDate, value, description, imageURL, note).estimateGas({ from: fromAddress });

        const tx = {
            to: contractAddress,
            data: contract.methods.addAsset(name, purchaseDate, value, description, imageURL, note).encodeABI(),
            gas: gasLimit,
            gasPrice: gasPrice,
            from: fromAddress
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log("Tài sản đã được thêm thành công:", receipt);
    } catch (err) {
        console.error("Lỗi khi thêm tài sản:", err);
    }
}
