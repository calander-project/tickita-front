import { useRef } from "react";

import { ToastService } from "@/services/toastService";

const useToast = () => {
  const toastService = ToastService.getInstance();

  const successToast = (message: string) => {
    toastService.addToast("success", message);
  };

  const errorToast = (message: string) => {
    toastService.addToast("error", message);
  };

  const warningToast = (message: string) => {
    toastService.addToast("warning", message);
  };

  const infoToast = (message: string) => {
    toastService.addToast("info", message);
  };

  const pendingToast = (message: string) => {
    toastService.addToast("pending", message);
  };

  const updateSuccessToast = (message: string) => {
    toastService.updateToastType("success", message);
  };

  const updateErrorToast = (message: string) => {
    toastService.updateToastType("error", message);
  };

  return {
    successToast,
    errorToast,
    warningToast,
    infoToast,
    pendingToast,
    updateSuccessToast,
    updateErrorToast,
  };
};

export default useToast;
