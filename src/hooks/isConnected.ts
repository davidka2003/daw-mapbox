import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "./WalletProvider";

export const isConnected = () => {
  const { useConnectedState, useAuthorizedState } = useContext(WalletContext);
  const [connected] = useConnectedState;
  const [authorized] = useAuthorizedState;
  return { connected, authorized };
};
