document
  .getElementById("showFormButton")
  .addEventListener("click", function () {
    const formContainer = document.getElementById("assetFormContainer");
    formContainer.style.display = "block"; 
  });

async function uploadImageToFirebase(file) {
  const storageRef = ref(storage, "assets/" + file.name); 
  const uploadTask = uploadBytesResumable(storageRef, file);

  try {
    await uploadTask;
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Lỗi khi tải hình ảnh lên Firebase Storage:", error);
    throw new Error("Tải hình ảnh lên thất bại");
  }
}

async function addAsset(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const purchaseDate =
    new Date(document.getElementById("purchaseDate").value).getTime() / 1000;
  const value = document.getElementById("value").value;
  const description = document.getElementById("description").value;
  const note = document.getElementById("note").value;
  const imageUpload = document.getElementById("imageUpload").files[0];

  // Kiểm tra nếu người dùng chưa nhập đủ thông tin
  if (
    !name ||
    !purchaseDate ||
    !value ||
    !description ||
    !imageUpload ||
    !note
  ) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  const imageURL = await uploadImageToFirebase(imageUpload);

 
  try {
    const fromAddress = accounts[0].address;

    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await contract.methods
      .addAsset(name, purchaseDate, value, description, imageURL, note)
      .estimateGas({ from: fromAddress });

    const tx = {
      to: contractAddress,
      data: contract.methods
        .addAsset(name, purchaseDate, value, description, imageURL, note)
        .encodeABI(),
      gas: gasLimit,
      gasPrice: gasPrice,
      from: fromAddress,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Tài sản đã được thêm thành công:", receipt);
  } catch (err) {
    console.error("Lỗi khi thêm tài sản:", err);
  }
}
