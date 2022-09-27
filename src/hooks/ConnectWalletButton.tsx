import React from "react";
import { ethers, Signer } from "ethers";
import { useContext, useEffect, useState } from "react";
import { web3Modal } from "../utils/provider";
import { getProvider, getSigner, WalletContext } from "./WalletProvider";
import AnimatedButton from "../shared/buttons/animated.button";
import { login, logout } from "../utils/api";

const ConnectWalletButton = ({ className }: { className: string }) => {
  const context = useContext(WalletContext);
  const [instance, setInstance] = context.useInstanceState;
  const [connected, setConnected] = context.useConnectedState;
  const [provider, setProvider] = context.useProviderState;
  const [signer, setSigner] = context.useSignerState;
  const [authorized, setAuthorized] = context.useAuthorizedState;
  const [address, setAddress] = context.useAddressState;
  const [user, setUser] = context.useUserState;
  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectHandler();
    }
  }, [web3Modal]);
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
      await loginHandler(signer);
    } catch (error) {
      console.error(error);
    }
  };
  const loginHandler = async (signer: Signer) => {
    console.log("login");
    if (!signer) {
      return;
    }
    const user = await login(signer);
    if (!user) {
      return;
    }
    setAuthorized(true);
    setUser(user);
    console.log(user);
  };
  const logoutHandler = async () => {
    console.log("logout");
    const { success } = await logout();
    if (!success) {
      return;
    }
    // console.log(instance);
    await web3Modal.clearCachedProvider();
    // await signer?.signMessage("saddas");
    setConnected(false);
    setAuthorized(false);
  };
  const onclickHandler = () => {
    if (!connected) return connectHandler();
    if (connected && !authorized && signer) return loginHandler(signer);
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
