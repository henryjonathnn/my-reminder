import { component$, useSignal, useStore, $ } from '@builder.io/qwik';
import { fetchTasks, deleteTask, updateTask } from '../services/api';

interface TaskListProps {
  tasks: any[];
  onTaskUpdated$: () => void;
}

export default component$<TaskListProps>(({ tasks, onTaskUpdated$ }) => {
  const editTask = useStore<{ id: string | null; title: string; description: string; isCompleted: boolean }>({
    id: null,
    title: '',
    description: '',
    isCompleted: false,
  });
  const showModal = useSignal(false);
  const error = useSignal('');
  const isLoading = useSignal(false);
  const filter = useSignal<'all' | 'completed' | 'pending'>('all');

  const filteredTasks = tasks.filter((task) =>
    filter.value === 'all' ? true : task.isCompleted === (filter.value === 'completed')
  );

  return (
    <div class="p-4 max-w-lg mx-auto">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold text-white">Tasks</h2>
        <select
          bind:value={filter}
          class="p-2 bg-zinc-700 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      {error.value && (
        <div class="mb-4 p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
          {error.value}
        </div>
      )}
      {isLoading.value && (
        <div class="text-center text-white animate-pulse mb-4">Loading...</div>
      )}
      <ul class="space-y-3">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            class="p-4 bg-zinc-800 rounded-lg flex justify-between items-center shadow-md transition-all hover:bg-zinc-700"
          >
            <div class="flex-1">
              <h3 class="text-lg font-medium text-white">{task.title}</h3>
              {task.description && <p class="text-zinc-400 text-sm mt-1">{task.description}</p>}
              <button
                class="text-sm text-blue-400 hover:text-blue-300 mt-2"
                onClick$={async () => {
                  isLoading.value = true;
                  try {
                    await updateTask(task.id, { isCompleted: !task.isCompleted });
                    await onTaskUpdated$();
                    error.value = '';
                  } catch (err: any) {
                    error.value = err.message || 'Failed to update task';
                  } finally {
                    isLoading.value = false;
                  }
                }}
              >
                {task.isCompleted ? 'Mark as Pending' : 'Mark as Done'}
              </button>
            </div>
            <div class="flex gap-2">
              <button
                class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                onClick$={() => {
                  editTask.id = task.id;
                  editTask.title = task.title;
                  editTask.description = task.description || '';
                  editTask.isCompleted = task.isCompleted;
                  showModal.value = true;
                }}
              >
                Edit
              </button>
              <button
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                onClick$={async () => {
                  isLoading.value = true;
                  try {
                    await deleteTask(task.id);
                    await onTaskUpdated$();
                    error.value = '';
                  } catch (err: any) {
                    error.value = err.message || 'Failed to delete task';
                  } finally {
                    isLoading.value = false;
                  }
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      {showModal.value && (
        <div class="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div class="bg-zinc-800 p-6 rounded-lg max-w-md w-full shadow-xl">
            <h3 class="text-xl font-semibold mb-4 text-white">Edit Task</h3>
            <form
              onSubmit$={async (event) => {
                event.preventDefault();
                isLoading.value = true;
                try {
                  await updateTask(editTask.id!, {
                    title: editTask.title,
                    description: editTask.description,
                    isCompleted: editTask.isCompleted,
                  });
                  await onTaskUpdated$();
                  showModal.value = false;
                  error.value = '';
                } catch (err: any) {
                  error.value = err.message || 'Failed to update task';
                } finally {
                  isLoading.value = false;
                }
              }}
            >
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1 text-white" for="edit-title">
                  Title
                </label>
                <input
                  id="edit-title"
                  class="w-full p-2 bg-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  bind:value={editTask.title}
                  required
                  disabled={isLoading.value}
                />
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1 text-white" for="edit-description">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  class="w-full p-2 bg-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  bind:value={editTask.description}
                  disabled={isLoading.value}
                ></textarea>
              </div>
              <div class="mb-4">
                <label class="block text-sm font-medium mb-1 text-white">
                  <input
                    type="checkbox"
                    bind:checked={editTask.isCompleted}
                    class="mr-2 accent-blue-500"
                    disabled={isLoading.value}
                  />
                  Completed
                </label>
              </div>
              {error.value && (
                <div class="mb-4 p-2 bg-red-500/20 text-red-400 rounded-md text-sm">
                  {error.value}
                </div>
              )}
              <div class="flex gap-2">
                <button
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex-1"
                  type="submit"
                  disabled={isLoading.value}
                >
                  {isLoading.value ? 'Saving...' : 'Save'}
                </button>
                <button
                  class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex-1"
                  type="button"
                  onClick$={() => (showModal.value = false)}
                  disabled={isLoading.value}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});