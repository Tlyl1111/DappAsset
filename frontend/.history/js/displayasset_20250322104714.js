async function displayAssets() {
  try {
    const userAccount = accounts[0].address;
    const userAssets = await contract.methods
      .getUserAssets()
      .call({ from: userAccount });

    const assetsListDiv = document.getElementById("assetsList");
    assetsListDiv.innerHTML = "";

    if (userAssets.length === 0) {
      assetsListDiv.innerHTML = "<p>No assets found.</p>";
      return;
    }

    userAssets.forEach((asset, index) => {
      const assetElement = document.createElement("div");
      assetElement.classList.add("asset");

      assetElement.innerHTML = `
        <h4>${asset.name}</h4>
        <p><strong>Purchase Date:</strong> ${new Date(
          asset.purchaseDate * 1000
        ).toLocaleDateString()}</p>
        <p><strong>Value:</strong> ${web3.utils.fromWei(
          asset.value.toString(),
          "ether"
        )} ETH</p>
        <button onclick="viewAssetDetails(${index})">View Details</button>
        <hr>
      `;

      assetsListDiv.appendChild(assetElement);
    });
  } catch (error) {
    console.error("Error fetching assets:", error);
    alert("An error occurred while fetching the assets.");
  }
}

async function viewAssetDetails(assetIndex) {
  try {
    const userAccount = accounts[0].address;
    const userAssets = await contract.methods
      .getUserAssets()
      .call({ from: userAccount });
    const assetId = userAssets[assetIndex];

    const assetDetails = await contract.methods
      .getAssetDetails(assetId)
      .call({ from: userAccount });

    const assetInfoDiv = document.getElementById("assetInfo");
    assetInfoDiv.innerHTML = `
      <p><strong>Name:</strong> ${assetDetails.name}</p>
      <p><strong>Description:</strong> ${assetDetails.description}</p>
      <p><strong>Value:</strong> ${web3.utils.fromWei(
        assetDetails.value.toString(),
        "ether"
      )} ETH</p>
      <p><strong>Image:</strong> <img src="${assetDetails.imageURL}" alt="${
      assetDetails.name
    }" width="100" /></p>
      <p><strong>Note:</strong> ${assetDetails.note}</p>
    `;

    document.getElementById("assetDetails").style.display = "block";

    document.getElementById("deleteAssetButton").onclick = function () {
      deleteAsset(assetId);
    };
  } catch (error) {
    console.error("Error viewing asset details:", error);
    alert("An error occurred while fetching asset details.");
  }
}
