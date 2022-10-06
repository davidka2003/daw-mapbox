import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "./WalletProvider";

export const useAddress = () => {
  const { useAddressState } = useContext(WalletContext);
  const [address] = useAddressState;
  if (address) {
    return address;
  }
  return null;
};
