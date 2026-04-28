import { toast } from "sonner";

type NotificationType = "success" | "error" | "warning" | "info";

export function useNotification() {
  const show = (message: string, type: NotificationType = "info") => {
    const options = {
      success: () => toast.success(message),
      error: () => toast.error(message),
      warning: () => toast.warning(message),
      info: () => toast.info(message),
    };

    options[type]();
  };

  const success = (message: string) => show(message, "success");
  const error = (message: string) => show(message, "error");
  const warning = (message: string) => show(message, "warning");
  const info = (message: string) => show(message, "info");

  return { show, success, error, warning, info };
}
