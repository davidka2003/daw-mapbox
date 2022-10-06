import axios from "@utils/configs/axios";
import { LocationT, UserI } from "types/user";

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
