import { component$, useSignal, $, useStore, useTask$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';

interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateTaskInput {
  title: string;
  description?: string;
}

interface UpdateTaskInput {
  title?: string;
  description?: string;
  isCompleted?: boolean;
}

const API_BASE_URL = 'http://localhost:3000'; // Ganti dengan URL backend production nanti

export default component$(() => {
  const tasks = useSignal<Task[]>([]);
  const loading = useSignal(false);
  const error = useSignal('');
  const isModalOpen = useSignal(false);
  const currentTask = useSignal<Task | null>(null);
  const successMessage = useSignal('');

  const formStore = useStore({
    title: '',
    description: '',
  });

  // Function to show success alert
  const showSuccess = $((message: string) => {
    successMessage.value = message;
    setTimeout(() => {
      successMessage.value = '';
    }, 3000); // auto hide after 3s
  });

  // Fetch all tasks
  const fetchTasks = $(async () => {
    try {
      loading.value = true;
      error.value = '';
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: { 'Accept': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch tasks');
      tasks.value = await response.json();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      loading.value = false;
    }
  });

    // Close modal
  const closeModal = $(() => {
    isModalOpen.value = false;
    currentTask.value = null;
    error.value = '';
  });

  // Create new task
  const createTask = $(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formStore, isCompleted: false }),
      });
      if (!response.ok) throw new Error('Failed to create task');
      await fetchTasks();
      await closeModal();
      showSuccess('✅ Task created successfully!');
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create task';
    }
  });

  // Update task
  const updateTask = $(async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formStore, isCompleted: currentTask.value?.isCompleted }),
      });
      if (!response.ok) throw new Error('Failed to update task');
      await fetchTasks();
      await closeModal();
      showSuccess('✏️ Task updated successfully!');
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update task';
    }
  });

  // Delete task
  const deleteTask = $(async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      await fetchTasks();
      showSuccess('🗑️ Task deleted successfully!');
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete task';
    }
  });

  // Open modal for add/edit
  const openModal = $(() => {
    formStore.title = '';
    formStore.description = '';
    isModalOpen.value = true;
    currentTask.value = null;
  });

  // Open modal for edit
  const openEditModal = $((task: Task) => {
    formStore.title = task.title;
    formStore.description = task.description || '';
    isModalOpen.value = true;
    currentTask.value = task;
  });


  // Handle form submission
  const handleSubmit = $(async (e: Event) => {
    e.preventDefault();
    if (!formStore.title.trim()) {
      error.value = 'Title is required';
      return;
    }
    try {
      if (currentTask.value) {
        await updateTask(currentTask.value.id);
      } else {
        await createTask();
      }
    } catch {
      // Error handled in respective functions
    }
  });

  // Toggle task completion
  const toggleComplete = $(async (task: Task) => {
    await updateTask(task.id, { isCompleted: !task.isCompleted });
  });

  // Load tasks on component mount
  useTask$(async () => {
    await fetchTasks();
  });

  return (
    <div class="min-h-screen bg-white flex items-center justify-center p-6">
      <div class="w-full max-w-5xl relative">
        {/* ✅ Success Toast */}
        {successMessage.value && (
          <div class="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-down z-50">
            {successMessage.value}
          </div>
        )}
        {/* Header */}
        <div class="text-center mb-12">
          <h1 class="text-5xl font-extrabold text-black mb-3 tracking-tight">
            Sticky Notes
          </h1>
          <p class="text-gray-500 text-lg">Organize your thoughts elegantly</p>
        </div>

        {/* Error Display */}
        {error.value && (
          <div class="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm shadow-md">
            {error.value}
          </div>
        )}

        {/* Add Task Button */}
        <div class="text-right mb-8">
          <button
            onClick$={openModal}
            class="bg-black text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
          >
            ➕ Add Note
          </button>
        </div>

        {/* Tasks Grid */}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading.value && tasks.value.length === 0 ? (
            <div class="col-span-full text-center py-16">
              <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-black mx-auto"></div>
              <p class="text-gray-500 mt-6 text-lg">Loading notes...</p>
            </div>
          ) : tasks.value.length === 0 ? (
            <div class="col-span-full text-center py-16">
              <p class="text-gray-500 text-lg">No notes yet. Add one above!</p>
            </div>
          ) : (
            tasks.value.map((task, idx) => (
              <div
                key={task.id}
                class={`bg-black text-white rounded-2xl p-5 shadow-2xl transition-all duration-300 hover:rotate-1 hover:scale-[1.02] ${task.isCompleted ? 'opacity-70' : ''
                  }`}
                style={{
                  transform: `rotate(${(idx % 2 === 0 ? -2 : 2)}deg)`,
                }}
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <h3
                      class={`text-lg font-semibold ${task.isCompleted ? 'line-through text-gray-400' : ''
                        }`}
                    >
                      {task.title}
                    </h3>
                    {task.description && (
                      <p
                        class={`text-gray-300 mt-2 text-sm ${task.isCompleted ? 'line-through' : ''
                          }`}
                      >
                        {task.description}
                      </p>
                    )}
                    <p class="text-gray-500 text-xs mt-3">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div class="flex space-x-3 ml-3">
                    <button
                      onClick$={() => openEditModal(task)}
                      class="text-blue-400 hover:text-blue-300"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick$={() => deleteTask(task.id)}
                      class="text-red-400 hover:text-red-300"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {isModalOpen.value && (
          <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div class="bg-black rounded-2xl p-8 w-full max-w-md mx-auto shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.02]">
              <h2 class="text-xl font-bold text-white mb-6">
                {currentTask.value ? 'Edit Note' : 'Add Note'}
              </h2>
              <form onSubmit$={handleSubmit} class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formStore.title}
                    onInput$={(e) =>
                      (formStore.title = (e.target as HTMLInputElement).value)
                    }
                    class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    placeholder="Write your note title..."
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formStore.description}
                    onInput$={(e) =>
                      (formStore.description = (e.target as HTMLTextAreaElement).value)
                    }
                    class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 h-28 resize-none"
                    placeholder="Add some details..."
                  />
                </div>
                <div class="flex gap-4">
                  <button
                    type="submit"
                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-lg transition-colors"
                  >
                    {currentTask.value ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick$={closeModal}
                    class="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg shadow-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Todo List App',
  meta: [
    {
      name: 'description',
      content: 'A modern sticky note application built with Qwik.js',
    },
  ],
};