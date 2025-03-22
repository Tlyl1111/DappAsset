async function deleteAsset(assetId) {
  try {
    const userAccount = accounts[0].address;

    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await contract.methods
      .deleteAsset(assetId)
      .estimateGas({ from: userAccount });

    const tx = {
      to: contractAddress,
      data: contract.methods.deleteAsset(assetId).encodeABI(),
      gas: gasLimit,
      gasPrice: gasPrice,
      from: userAccount,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Asset deleted successfully:", receipt);
    alert("Asset deleted successfully!");

    displayAssets();

    document.getElementById("assetDetails").style.display = "none";
  } catch (error) {
    console.error("Error deleting asset:", error);
    alert("An error occurred while deleting the asset.");
  }
}
window.addEventListener("load", displayAssets);