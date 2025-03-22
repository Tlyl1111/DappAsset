const contractAddress = "0xd2d6eb492865E8c032260d0727e23967D33B5B15";
const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_purchaseDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_imageURL",
        type: "string",
      },
      {
        internalType: "string",
        name: "_note",
        type: "string",
      },
    ],
    name: "addAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "assets",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "purchaseDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "imageURL",
        type: "string",
      },
      {
        internalType: "string",
        name: "note",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assetId",
        type: "uint256",
      },
    ],
    name: "deleteAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assetId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_purchaseDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "string",
        name: "_imageURL",
        type: "string",
      },
      {
        internalType: "string",
        name: "_note",
        type: "string",
      },
    ],
    name: "editAsset",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_assetId",
        type: "uint256",
      },
    ],
    name: "getAssetDetails",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "purchaseDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURL",
            type: "string",
          },
          {
            internalType: "string",
            name: "note",
            type: "string",
          },
        ],
        internalType: "struct AssetManager.Asset",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserAssets",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "purchaseDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "imageURL",
            type: "string",
          },
          {
            internalType: "string",
            name: "note",
            type: "string",
          },
        ],
        internalType: "struct AssetManager.Asset[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userAssets",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
let web3;
let accounts = [];
const wsWeb3 = new Web3(
  new Web3.providers.WebsocketProvider("wss://bsc-testnet-rpc.publicnode.com")
);
const contract = new wsWeb3.eth.Contract(contractABI, contractAddress);
const privateKey =
  "0x1fd809bb5ec8a9d8b9bc7e51bccb87f98dfd367973310effc3c98ef8b3948d05";

web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545/"
  )
);

const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dta5lkfxr/image/upload";
const cloudinaryUploadPreset = "imageurl";

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
accounts = web3.eth.accounts.wallet;

if (accounts && accounts.length > 0) {
  console.log("Địa chỉ tài khoản: ", accounts[0].address);
} else {
  console.error("No accounts available");
}

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


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   


