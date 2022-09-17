import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "./WalletProvider";

export const isConnected = () => {
  const { useConnectedState } = useContext(WalletContext);
  const [connected] = useConnectedState;
  return connected;
};
