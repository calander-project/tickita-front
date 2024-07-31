import { useRef } from "react";

import { ToastService } from "@/services/toastService";

export interface PendingToastTextType {
  pending: string;
  success: string;
  error: string;
}

const useToast = () => {
  const toastService = ToastService.getInstance();
  const toastId = useRef(0);
  const isPendingLoading = useRef(false);

  const successToast = (message: string) => {
    const id = String(toastId.current++);
    toastService.addToast(id, "success", message);
  };

  const errorToast = (message: string) => {
    const id = String(toastId.current++);
    toastService.addToast(id, "error", message);
  };

  const warningToast = (message: string) => {
    const id = String(toastId.current++);
    toastService.addToast(id, "warning", message);
  };

  const infoToast = (message: string) => {
    const id = String(toastId.current++);
    toastService.addToast(id, "info", message);
  };

  const pendingToast = (promise: any, text: PendingToastTextType) => {
    if (isPendingLoading.current) {
      const id = String(toastId.current++);
      toastService.addToast(id, "error", "api 요청 대기 중입니다!");
      return;
    }

    const id = String(toastId.current++);
    toastService.addToast(id, "pending", text.pending);

    isPendingLoading.current = true;

    return promise()
      .then((result: any) => {
        toastService.updateToast(id, "success", text.success);
        console.log(id);
        return result;
      })
      .catch((error: any) => {
        toastService.updateToast(id, "error", text.error);
        throw error;
      })
      .finally(() => {
        isPendingLoading.current = false;
      });
  };

  return {
    successToast,
    errorToast,
    warningToast,
    infoToast,
    pendingToast,
  };
};

export default useToast;
