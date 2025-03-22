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

async function loadAssets() {
  try {
    // Fetch user assets from the smart contract
    const userAssets = await contract.methods.getUserAssets().call();

    // Get the container for displaying assets
    const assetsListDiv = document.getElementById("assetsList");
    assetsListDiv.innerHTML = ""; // Clear any previous assets

    // Loop through each asset and display its details
    for (let i = 0; i < userAssets.length; i++) {
      const assetId = userAssets[i];
      const assetDetails = await contract.methods
        .getAssetDetails(assetId)
        .call();

      // Image URL from the smart contract (already stored as Cloudinary URL)
      const imageUrl = assetDetails.imageURL;

      // Create a div for each asset
      const assetDiv = document.createElement("div");
      assetDiv.classList.add("asset");

      // Create and display asset information
      assetDiv.innerHTML = `
        <h4>Asset ${i + 1}</h4>
        <p><strong>Name:</strong> ${assetDetails.name}</p>
        <p><strong>Purchase Date:</strong> ${new Date(
          assetDetails.purchaseDate * 1000
        ).toLocaleDateString()}</p>
        <p><strong>Value:</strong> ${assetDetails.value}</p>
        <p><strong>Description:</strong> ${assetDetails.description}</p>
        <p><strong>Note:</strong> ${assetDetails.note}</p>
        <img src="${imageUrl}" alt="Asset Image" width="200" />
        <hr />
      `;

      // Append the created asset div to the assets list container
      assetsListDiv.appendChild(assetDiv);
    }
  } catch (error) {
    console.error("Error loading assets:", error);
    alert("An error occurred while loading assets.");
  }
}



loadAssets();



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   


