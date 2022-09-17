import { ethers } from "ethers";
import axios from "../utils/axios";

export const fetchUser = async (signer: ethers.Signer) => {
  const response = (
    await axios.post("/users/info", {
      wallet:
        "0x7Acf95EDE2a463D0F9347cF6C9b22a1bE082addA" ||
        (await signer.getAddress()),
    })
  ).data as {
    data: {
      token_date: string;
      status: "minted" | "reserved";
      is_random: boolean;
      is_donated: boolean;
    }[];
    error?: boolean;
    proof: string[];
  };
  return { ...response, isLoading: false, error: response.error ?? false };
};
