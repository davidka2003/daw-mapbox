import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "./WalletProvider";

export const useProvider = () => {
  const { useProviderState } = useContext(WalletContext);
  const [provider] = useProviderState;
  if (provider) {
    return provider;
  }
  return undefined;
};
