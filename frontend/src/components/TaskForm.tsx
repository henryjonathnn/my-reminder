import { component$, useSignal } from '@builder.io/qwik';
import { createTask } from '../services/api';

interface TaskFormProps {
  onTaskCreated$: () => void;
}

export default component$<TaskFormProps>(({ onTaskCreated$ }) => {
  const title = useSignal('');
  const description = useSignal('');
  const error = useSignal('');
  const isLoading = useSignal(false);

  return (
    <div class="p-4 max-w-lg mx-auto">
      {error.value && (
        <div class="mb-4 p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
          {error.value}
        </div>
      )}
      <form
        class="bg-zinc-800 rounded-lg shadow-md p-6 transition-all"
        onSubmit$={async (event) => {
          event.preventDefault();
          if (!title.value.trim()) {
            error.value = 'Title is required';
            return;
          }
          isLoading.value = true;
          try {
            await createTask({ title: title.value, description: description.value || undefined });
            title.value = '';
            description.value = '';
            error.value = '';
            await onTaskCreated$();
          } catch (err: any) {
            error.value = err.message || 'Failed to create task';
          } finally {
            isLoading.value = false;
          }
        }}
      >
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1 text-white" for="title">
            Title
          </label>
          <input
            id="title"
            class="w-full p-2 bg-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            type="text"
            bind:value={title}
            required
            disabled={isLoading.value}
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1 text-white" for="description">
            Description
          </label>
          <textarea
            id="description"
            class="w-full p-2 bg-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            rows={4}
            bind:value={description}
            disabled={isLoading.value}
          ></textarea>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full font-medium transition-colors disabled:opacity-50"
          type="submit"
          disabled={isLoading.value}
        >
          {isLoading.value ? 'Creating...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
});