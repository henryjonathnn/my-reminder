import { component$, type QRL } from '@builder.io/qwik';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onInput$?: QRL<(event: Event, element: HTMLInputElement) => void>;
  required?: boolean;
  disabled?: boolean;
  class?: string;
  label?: string;
}

export const Input = component$<InputProps>(({
  type = 'text',
  placeholder,
  value,
  onInput$,
  required = false,
  disabled = false,
  class: className = '',
  label,
}) => {
  const inputClasses = `w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <div>
      {label && (
        <label class="block text-sm font-medium text-gray-300 mb-2">
          {label} {required && '*'}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onInput$={onInput$}
        required={required}
        disabled={disabled}
        class={inputClasses}
      />
    </div>
  );
});

interface TextareaProps {
  placeholder?: string;
  value?: string;
  onInput$?: QRL<(event: Event, element: HTMLTextAreaElement) => void>;
  required?: boolean;
  disabled?: boolean;
  class?: string;
  label?: string;
  rows?: number;
}

export const Textarea = component$<TextareaProps>(({
  placeholder,
  value,
  onInput$,
  required = false,
  disabled = false,
  class: className = '',
  label,
  rows = 4,
}) => {
  const textareaClasses = `w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <div>
      {label && (
        <label class="block text-sm font-medium text-gray-300 mb-2">
          {label} {required && '*'}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onInput$={onInput$}
        required={required}
        disabled={disabled}
        rows={rows}
        class={textareaClasses}
      />
    </div>
  );
});