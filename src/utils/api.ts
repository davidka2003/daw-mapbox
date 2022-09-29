import axios from "./axios";
import { OwnedNft } from "alchemy-sdk";
import { Signer } from "ethers";
type LocationT = {
  lat: number;
  lng: number;
};
export interface UserI {
  id: string;
  wallet: string;
  location: LocationT;
}
export const GetAllUsers = async () => {
  try {
    const response = await axios.get("/users");
    return response.data as UserI[];
  } catch (error: any) {
    // console.log(error.data)
    return [];
  }
};

type GetUserI = {
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
export const updateLocation = async (location: LocationT) => {
  try {
    const response = await axios.patch(
      "users/location",
      {
        ...location,
      },
      { withCredentials: true }
    );
    return response.data as UserI;
  } catch (error) {
    return null;
  }
};

export const login = async (signer: Signer): Promise<UserI | null> => {
  try {
    const {
      data: { nonce },
    } = await axios.get<{ nonce: string }>("/auth/nonce", {
      withCredentials: true,
    });
    const wallet = await signer.getAddress();
    const signature = await signer.signMessage(nonce);
    const response = await axios.post<UserI>(
      "/auth/authorize",
      {
        wallet,
        signature,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const logout = async () => {
  try {
    await axios.delete("/auth/logout", {
      withCredentials: true,
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
