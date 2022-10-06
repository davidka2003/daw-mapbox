import axios from "@utils/configs/axios";
import { loadingToast } from "@utils/toastify/toast.loading";
import { AxiosError } from "axios";
import { Signer } from "ethers";
import { UserI } from "types/user";
export const login = async (signer: Signer): Promise<UserI | null> => {
  const toast = loadingToast("Authorizing");
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
    toast("Successfully authorized");
    return response.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error.response && error.response.data.message) {
        toast(error.response.data.message, "error");
        return null;
      }
    }
    toast("Something went wrong", "error");
    return null;
  }
};
