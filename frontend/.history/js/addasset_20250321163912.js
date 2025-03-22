const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dta5lkfxr/image/upload";
const cloudinaryUploadPreset = "imageurl";

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
    const purchaseDateInput = document.getElementById("purchaseDate").value;
    const value = document.getElementById("value").value;
    const description = document.getElementById("description").value;
    const imageUpload = document.getElementById("imageUpload").files[0];
    const note = document.getElementById("note").value;

    // Check if all fields are filled
    if (
      !name ||
      !purchaseDateInput ||
      !value ||
      !description ||
      !imageUpload ||
      !note
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Convert purchase date to timestamp (in seconds)
      const purchaseDate = new Date(purchaseDateInput).getTime() / 1000; // Get timestamp in seconds

      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", imageUpload);
      formData.append("upload_preset", cloudinaryUploadPreset); // Use your Cloudinary preset here

      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const cloudinaryResponse = await response.json();
      const imageUrl = cloudinaryResponse.secure_url; // Get image URL from Cloudinary response

      console.log("Image URL:", imageUrl); // Check if the image URL is correctly retrieved

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
