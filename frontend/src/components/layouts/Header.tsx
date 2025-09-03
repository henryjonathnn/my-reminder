import { component$ } from '@builder.io/qwik';

export const Header = component$(() => {
  return (
    <div class="text-center mb-12">
      <h1 class="text-5xl font-extrabold text-black mb-3 tracking-tight">
        Hyura's Reminder
      </h1>
      <p class="text-gray-500 text-lg">Organize your thoughts elegantly</p>
    </div>
  );
});