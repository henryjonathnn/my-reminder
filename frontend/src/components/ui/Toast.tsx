import { component$ } from '@builder.io/qwik';

interface ToastProps {
  message: string;
  show: boolean;
}

export const Toast = component$<ToastProps>(({ message, show }) => {
  if (!show) return null;

  return (
    <div class="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-down z-50">
      {message}
    </div>
  );
});