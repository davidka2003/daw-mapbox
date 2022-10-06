import axios from "@utils/configs/axios";
import { loadingToast } from "@utils/toastify/toast.loading";
import { AxiosError } from "axios";
import { LocationT, UserI } from "types/user";

export const updateUser = async (user: UserI) => {
  const toast = loadingToast("Saving");
  try {
    const response = await axios.patch(
      "users/update",
      {
        ...user,
      },
      { withCredentials: true }
    );
    toast("Saved");
    return response.data as UserI;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error.response?.status === 403) {
        toast("Session expired", "error");
        return null;
      }
      if (error.response?.data.message) {
        toast(error.response?.data.message, "error");
        return null;
      }
    }
    toast("An error occured", "error");
    return null;
  }
};
