import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import abi from "../constants/abi.json";
export const CONTRACT_ADDRESS = "0x7bf9f287e6b9f6c69d0b2f1f97b53882a12d2423";
export const zeroProvider = new ethers.providers.AlchemyProvider(
  /* "rinkeby" || */ "homestead",
  "lAUVi6q985u9TWjWjNzOrXYuaBu1Fp4u"
);
export const getContract = (provider: ethers.providers.Provider | ethers.Signer) => {
  return new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
};

const providerOptions = {
  /* See Provider Options Section */
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      infuraId: "4c0e23f7472b44e584ed2f82215fb895",
    },
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "4c0e23f7472b44e584ed2f82215fb895",
    },
  },
};

export const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions, // required
  // theme: "dark",
  // disableInjectedProvider: true,
});
