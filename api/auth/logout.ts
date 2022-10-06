import axios from "@utils/configs/axios";

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
