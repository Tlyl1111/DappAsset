const contractAddress = "0xdBf183743d88b72649A8f55D810F36C3e3815C19";
const contractABI = [];
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

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
accounts = web3.eth.accounts.wallet;

if (accounts && accounts.length > 0) {
  console.log("Địa chỉ tài khoản: ", accounts[0].address);
} else {
  console.error("No accounts available");
}

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID",
  measurementId: "YOUR_FIREBASE_MEASUREMENT_ID",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// Hàm tải lên hình ảnh lên Firebase Storage
async function uploadImageToFirebase(file) {
  const storageRef = storage.ref();
  const fileRef = storageRef.child("assets/" + file.name); // Tạo đường dẫn trong Storage

  try {
    await fileRef.put(file); // Tải lên hình ảnh
    const url = await fileRef.getDownloadURL(); // Lấy URL của hình ảnh đã tải lên
    return url;
  } catch (error) {
    console.error("Lỗi khi tải hình ảnh lên Firebase Storage:", error);
    throw new Error("Tải hình ảnh lên thất bại");
  }
}


