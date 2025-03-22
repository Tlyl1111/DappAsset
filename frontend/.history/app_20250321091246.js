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
  apiKey: "AIzaSyDmYeeSN_tPB-uf-qjZlGD3-62mQ-DGnVY",
  authDomain: "dapp-asset.firebaseapp.com",
  projectId: "dapp-asset",
  storageBucket: "dapp-asset.firebasestorage.app",
  messagingSenderId: "915500409967",
  appId: "1:915500409967:web:ceec38949259d1a8de199a",
  measurementId: "G-K1EYS1XDCP",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();




