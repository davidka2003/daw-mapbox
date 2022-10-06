import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "./WalletProvider";

export const useSigner = () => {
  const { useSignerState } = useContext(WalletContext);
  const [signer] = useSignerState;
  if (signer) {
    return signer;
  }
  return undefined;
};
