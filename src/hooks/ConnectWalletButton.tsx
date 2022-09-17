import React from "react";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { web3Modal } from "../utils/provider";
import { getProvider, getSigner, WalletContext } from "./WalletProvider";
import AnimatedButton from "../shared/buttons/animated.button";

const ConnectWalletButton = ({ className }: { className: string }) => {
  const context = useContext(WalletContext);
  const [instance, setInstance] = context.useInstanceState;
  const [connected, setConnected] = context.useConnectedState;
  const [provider, setProvider] = context.useProviderState;
  const [signer, setSigner] = context.useSignerState;
  const [authorized, setAuthorized] = context.useAuthorizedState;
  const [address, setAddress] = context.useAddressState;
  const connectHandler = async () => {
    try {
      const instance = await web3Modal.connect();
      const provider = getProvider(instance);
      const signer = getSigner(provider);
      const address = await signer.getAddress();
      setAddress(address);
      setSigner(signer);
      setProvider(provider);
      setInstance(instance);
      setConnected(true);
    } catch (error) {
      console.error(error);
    }
  };
  const loginHandler = async () => {
    console.log("login");
  };
  const logoutHandler = async () => {
    console.log("logout");
  };
  const onclickHandler = () => {
    if (!connected) return connectHandler();
    if (connected && !authorized) return loginHandler();
    if (connected && authorized) return logoutHandler();
  };
  const buttonTitle = () => {
    if (!connected) return "Connect wallet";
    if (connected && !authorized) return "Login with wallet";
    if (connected && authorized) return "Disconnect";
  };
  return (
    <AnimatedButton>
      <button type={"button"} onClick={onclickHandler} className={className}>
        {buttonTitle()}
      </button>
    </AnimatedButton>
  );
};

export default ConnectWalletButton;
