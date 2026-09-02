import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const parseMsg = (msg, fallback = "Notification") => {
  if (!msg) return fallback;
  if (typeof msg === "string") return msg;
  if (typeof msg === "object") {
    return msg.message || msg.error || msg.data?.message || msg.data?.error || fallback;
  }
  return String(msg);
};

const notifySuccess = (message) => {
  const text = parseMsg(message, "Operation successful");
  toast.success(text, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const notifyError = (message) => {
  const text = parseMsg(message, "Something went wrong");
  toast.error(text, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export { ToastContainer, notifySuccess, notifyError };
