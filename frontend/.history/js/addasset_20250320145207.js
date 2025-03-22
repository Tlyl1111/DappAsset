document.getElementById("addAssetForm").onsubmit = async function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const purchaseDate = parseInt(document.getElementById("purchaseDate").value);
  const value = parseInt(document.getElementById("value").value);
  const description = document.getElementById("description").value;
  const imageURL = document.getElementById("imageURL").value;
  const note = document.getElementById("note").value;

  try {
    const tx = await contract.methods
      .addAsset(name, purchaseDate, value, description, imageURL, note)
      .send({ from: currentAccount });
    console.log("Transaction success:", tx);
    loadUserAssets();
  } catch (err) {
    console.log("Error in transaction:", err);
  }
};

async function loadUserAssets() {
  try {
    const assets = await contract.methods
      .getUserAssets()
      .call({ from: currentAccount });
    let assetsList = "";
    assets.forEach((asset, index) => {
      assetsList += `
                        <div>
                            <h3>Asset ${index + 1}</h3>
                            <p><strong>Name:</strong> ${asset.name}</p>
                            <p><strong>Purchase Date:</strong> ${new Date(
                              asset.purchaseDate * 1000
                            ).toLocaleString()}</p>
                            <p><strong>Value:</strong> ${asset.value} VND</p>
                            <p><strong>Description:</strong> ${
                              asset.description
                            }</p>
                            <p><strong>Image:</strong> <img src="${
                              asset.imageURL
                            }" alt="Asset Image" width="100"></p>
                            <p><strong>Note:</strong> ${asset.note}</p>
                            <hr>
                        </div>
                    `;
    });
    document.getElementById("assetsList").innerHTML = assetsList;
  } catch (err) {
    console.log("Error loading assets:", err);
  }
}

loadUserAssets();
