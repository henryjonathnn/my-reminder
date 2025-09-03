import { component$, type QRL, Slot } from '@builder.io/qwik';

interface ModalProps {
  isOpen: boolean;
  onClose$?: QRL<() => void>;
  title?: string;
}

export const Modal = component$<ModalProps>(({ isOpen, onClose$, title }) => {
  if (!isOpen) return null;

  return (
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-black rounded-2xl p-8 w-full max-w-md mx-auto shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.02]">
        {title && (
          <h2 class="text-xl font-bold text-white mb-6">
            {title}
          </h2>
        )}
        <Slot />
      </div>
    </div>
  );
});