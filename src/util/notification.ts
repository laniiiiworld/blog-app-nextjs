import { ToastOptions } from './../../node_modules/react-toastify/dist/types.d';
import { toast } from 'react-toastify';

type ToastType = 'error' | 'warning' | 'success';

export function pushNotification(type: ToastType, msg: string) {
  const toastOptions: ToastOptions = {
    type: type,
    position: 'top-right',
    closeOnClick: true,
    autoClose: 3000,
  };
  toast[type](msg, toastOptions);
}
