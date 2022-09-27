import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  /* See Provider Options Section */
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "STD", // Required
      // infuraId: "4c0e23f7472b44e584ed2f82215fb895", // Required
      rpc: "https://eth-mainnet.g.alchemy.com/v2/YFfL3HGZ-Zr3CFtN9gW9ivcY0rwFu_3H",
      chainId: 1,
    },
  },
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      appName: "STD", // Required
      // infuraId: "4c0e23f7472b44e584ed2f82215fb895", // Required
      rpc: "https://eth-mainnet.g.alchemy.com/v2/YFfL3HGZ-Zr3CFtN9gW9ivcY0rwFu_3H",
      chainId: 1,
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
