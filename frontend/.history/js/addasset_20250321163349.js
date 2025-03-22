const cloudinaryUrl =
  "cloudinary://674591865752238:sXOsVbaYqYUW65zqwOyoTbAv49Y@dta5lkfxr";
const cloudinaryUploadPreset = "imageurl";

// Show the form when the "Add Asset" button is clicked
document
  .getElementById("showFormButton")
  .addEventListener("click", function () {
    document.getElementById("assetFormContainer").style.display = "block";
  });

// Handle the form submission
document
  .getElementById("assetForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const purchaseDate = document.getElementById("purchaseDate").value;
    const value = document.getElementById("value").value;
    const description = document.getElementById("description").value;
    const imageUpload = document.getElementById("imageUpload").files[0];
    const note = document.getElementById("note").value;

    // Check if all fields are filled
    if (
      !name ||
      !purchaseDate ||
      !value ||
      !description ||
      !imageUpload ||
      !note
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", imageUpload);
      formData.append("upload_preset", cloudinaryUploadPreset);

      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const cloudinaryResponse = await response.json();
      const imageUrl = cloudinaryResponse.secure_url; // Get image URL from Cloudinary response

      // Get Ethereum account
      const accounts = await web3.eth.getAccounts();
      const userAccount = accounts[0];

      // Estimate gas and send transaction to add asset
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = await contract.methods
        .addAsset(name, purchaseDate, value, description, imageUrl, note)
        .estimateGas({ from: userAccount });

      const tx = {
        to: contractAddress,
        data: contract.methods
          .addAsset(name, purchaseDate, value, description, imageUrl, note)
          .encodeABI(),
        gas: gasLimit,
        gasPrice: gasPrice,
        from: userAccount,
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      console.log("Asset added successfully:", receipt);
      alert("Asset added successfully!");
    } catch (error) {
      console.error("Error adding asset:", error);
      alert("An error occurred while adding the asset.");
    }
  });
