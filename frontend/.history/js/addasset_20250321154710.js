// Cloudinary upload function
function uploadImageToCloudinary(file) {
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryConfig.upload_preset);

  return fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.secure_url) {
        return data.secure_url; // Cloudinary image URL
      } else {
        throw new Error("Image upload failed");
      }
    })
    .catch((error) => {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Image upload failed");
    });
}

document
  .getElementById("showFormButton")
  .addEventListener("click", function () {
    const formContainer = document.getElementById("assetFormContainer");
    formContainer.style.display = "block";
  });

document.getElementById("assetForm").addEventListener("submit", addAsset);

async function addAsset(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const purchaseDate =
    new Date(document.getElementById("purchaseDate").value).getTime() / 1000;
  const value = document.getElementById("value").value;
  const description = document.getElementById("description").value;
  const note = document.getElementById("note").value;
  const imageUpload = document.getElementById("imageUpload").files[0];

  if (
    !name ||
    !purchaseDate ||
    !value ||
    !description ||
    !imageUpload ||
    !note
  ) {
    alert("Please fill in all the fields!");
    return;
  }

  try {
    const imageURL = await uploadImageToCloudinary(imageUpload);
    console.log("Image URL:", imageURL);

    // Your Ethereum contract code
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

    console.log("Asset added successfully:", receipt);
  } catch (error) {
    console.error("Error adding asset:", error);
  }
}
