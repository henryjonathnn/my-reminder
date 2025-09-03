import { component$, type QRL, Slot } from '@builder.io/qwik';

interface ButtonProps {
  onClick$?: QRL<() => void>;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  class?: string;
}

export const Button = component$<ButtonProps>(({
  onClick$,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  class: className = '',
}) => {
  const baseClasses = 'font-medium rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-gray-500',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'} ${className}`;

  return (
    <button
      type={type}
      onClick$={onClick$}
      disabled={disabled}
      class={classes}
    >
      <Slot />
    </button>
  );
});