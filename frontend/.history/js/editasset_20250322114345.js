let editingAssetId = null;

function openEditAssetForm(assetId, assetDetails) {

  editingAssetId = assetId;


  document.getElementById("editName").value = assetDetails.name;
  document.getElementById("editDescription").value = assetDetails.description;
  document.getElementById("editValue").value = assetDetails.value;
  document.getElementById("editImageURL").value = assetDetails.imageURL;
  document.getElementById("editNote").value = assetDetails.note;

  document.getElementById("assetDetails").style.display = "none";
  document.getElementById("editAssetFormContainer").style.display = "block";
}

document
  .getElementById("editAssetForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("editName").value;
    const description = document.getElementById("editDescription").value;
    const value = web3.utils.toWei(
      document.getElementById("editValue").value,
      "ether"
    );
    const imageURL = document.getElementById("editImageURL").value;
    const note = document.getElementById("editNote").value;

    try {
      const userAccount = accounts[0].address;

      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = await contract.methods
        .editAsset(editingAssetId, name, 0, value, description, imageURL, note) // Modify if needed
        .estimateGas({ from: userAccount });

      const tx = {
        to: contractAddress,
        data: contract.methods
          .editAsset(
            editingAssetId,
            name,
            0,
            value,
            description,
            imageURL,
            note
          )
          .encodeABI(),
        gas: gasLimit,
        gasPrice: gasPrice,
        from: userAccount,
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      console.log("Asset edited successfully:", receipt);
      alert("Asset edited successfully!");

      cancelEdit();
      displayAssets();
    } catch (error) {
      console.error("Error editing asset:", error);
      alert("An error occurred while editing the asset.");
    }
  });

function cancelEdit() {
  document.getElementById("editAssetFormContainer").style.display = "none";
  document.getElementById("assetDetails").style.display = "block";
}
