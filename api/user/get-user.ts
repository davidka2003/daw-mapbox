import axios from "@utils/configs/axios";
import { UserI } from "types/user";
import { type OwnedNft } from "alchemy-sdk";

export type GetUserI = {
  user: UserI | null;
  nfts: OwnedNft[];
};
export const GetUser = async (wallet: string): Promise<GetUserI> => {
  try {
    const response = await axios.get("/users/".concat(wallet));
    return response.data as GetUserI;
  } catch (error) {
    return {
      user: null,
      nfts: [],
    };
  }
};
