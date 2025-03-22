// Hàm để thêm tài sản
async function addAsset() {
  // Lấy giá trị từ form
  const name = document.getElementById("name").value;
  const purchaseDate =
    new Date(document.getElementById("purchaseDate").value).getTime() / 1000; // Chuyển đổi thành Unix timestamp
  const value = document.getElementById("value").value;
  const description = document.getElementById("description").value;
  const imageURL = document.getElementById("imageURL").value;
  const note = document.getElementById("note").value;

  // Kiểm tra nếu tất cả các trường đều đã được nhập
  if (!name || !purchaseDate || !value || !description || !imageURL || !note) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  try {
    const fromAddress = accounts[0].address;

    // Ước lượng gas cho giao dịch
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
    alert("Tài sản đã được thêm thành công!");
  } catch (error) {
    console.error("Lỗi khi thêm tài sản:", error);
    alert("Đã có lỗi xảy ra khi thêm tài sản.");
  }
}
