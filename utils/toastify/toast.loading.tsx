import { ReactNode } from "react";
import { toast, TypeOptions } from "react-toastify";

export const loadingToast = (message: ReactNode) => {
  const toastId = toast.loading(message);
  console.log(message);
  return (updatedMessage: ReactNode, type: TypeOptions = "success") => {
    toast.update(toastId, {
      type,
      pauseOnHover: false,
      autoClose: 1000,
      render: updatedMessage,
      isLoading: false,
    });
  };
};
