import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { UserI } from "../utils/api";
import { WalletContext } from "./WalletProvider";

export const useUser = () => {
  const { useUserState } = useContext(WalletContext);
  const [user, setUser] = useUserState;
  const updateUser = (user: UserI) => setUser(user);
  return { user: user ?? null, updateUser };
};
