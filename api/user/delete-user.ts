import axios from "@utils/configs/axios";
import { loadingToast } from "@utils/toastify/toast.loading";
import { AxiosError } from "axios";
import { LocationT, UserI } from "types/user";

export const deleteUser = async () => {
  const toast = loadingToast("Deleting");
  try {
    const response = await axios.delete("users/delete", { withCredentials: true });
    toast("Deleted");
    return response.data as UserI;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        toast("Session expired", "error");
        return null;
      }
    }
    toast("An error occured", "error");
    return null;
  }
};
