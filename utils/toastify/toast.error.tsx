import { ReactNode } from "react";
import { toast, TypeOptions } from "react-toastify";

export const errorToast = (message: ReactNode) => {
  toast(message, {
    type: "error",
    pauseOnHover: false,
    autoClose: 3000,
  });
};
