import axios from "@utils/configs/axios";
import { UserI, UserWithLocationI } from "types/user";

export const GetAllUsers = async () => {
  try {
    const response = await axios.get("/users");
    return response.data as UserWithLocationI[];
  } catch (error: any) {
    // console.log(error.data)
    return [];
  }
};
