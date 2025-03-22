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

let searchKeyword = "";
let startDateFilter = null;
let endDateFilter = null;

document.getElementById("searchKeyword").addEventListener("keyup", function () {
  searchKeyword = this.value.toLowerCase();
  displayAssets(); 
});

document
  .getElementById("filterStartDate")
  .addEventListener("change", function () {
    startDateFilter = new Date(this.value).getTime() / 1000; 
    displayAssets();
  });

document
  .getElementById("filterEndDate")
  .addEventListener("change", function () {
    endDateFilter = new Date(this.value).getTime() / 1000; 
    displayAssets();
  });

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
      const purchaseDate = new Date(
        parseInt(asset.purchaseDate) * 1000
      ).toLocaleDateString(); 

      assetElement.innerHTML = `
        <h4>${asset.name}</h4>
        <p><strong>Purchase Date:</strong> ${purchaseDate}</p>
        <p><strong>Value:</strong> ${
          asset.value}</p>
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

    const assetDetails = await contract.methods
      .getAssetDetails(assetIndex)
      .call({ from: userAccount });

    const assetInfoDiv = document.getElementById("assetInfo");
    const purchaseDate = new Date(
      parseInt(assetDetails.purchaseDate) * 1000
    ).toLocaleDateString();

    assetInfoDiv.innerHTML = `
      <p><strong>Name:</strong> ${assetDetails.name}</p>
      <p><strong>Description:</strong> ${assetDetails.description}</p>
      <p><strong>Purchase Date:</strong> ${purchaseDate}</p>
      <p><strong>Value:</strong> ${
        assetDetails.value}</p>
      <p><strong>Image:</strong> <img src="${assetDetails.imageURL}" alt="${
      assetDetails.name
    }" width="100" /></p>
      <p><strong>Note:</strong> ${assetDetails.note}</p>
    `;

    document.getElementById("assetDetails").style.display = "block";

    document.getElementById("deleteAssetButton").onclick = function () {
      deleteAsset(assetIndex);
    };
  } catch (error) {
    console.error("Error viewing asset details:", error);
    alert("An error occurred while fetching asset details.");
  }
}

window.addEventListener("load", displayAssets);


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   


