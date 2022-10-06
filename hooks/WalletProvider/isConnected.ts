import { useAppSelector } from "@hooks/redux/redux";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "./WalletProvider";

export const isConnected = () => {
  const { useConnectedState, useAuthorizedState } = useContext(WalletContext);
  const authorized = useAppSelector((state) => state.user.authorized);
  const [connected] = useConnectedState;
  return { connected, authorized };
};
