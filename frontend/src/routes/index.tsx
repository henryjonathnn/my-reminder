import { component$, useSignal, $ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';
import { useTasks } from '../hooks/useTasks';
import { Header } from '../components/layouts/Header';
import { Toast } from '../components/ui/Toast';
import { Button } from '../components/ui/Button';
import { TaskGrid } from '../components/task/TaskGrid';
import { TaskModal } from '../components/task/TaskModal';

export default component$(() => {
  const {
    tasks,
    loading,
    error,
    successMessage,
    createTask,
    updateTask,
    deleteTask,
    clearError,
  } = useTasks();

  const isModalOpen = useSignal(false);
  const currentTask = useSignal<Task | null>(null);

  const openModal = $(() => {
    isModalOpen.value = true;
    currentTask.value = null;
    clearError();
  });

  const openEditModal = $((task: Task) => {
    isModalOpen.value = true;
    currentTask.value = task; // Set task untuk edit
    clearError();
  });

  const closeModal = $(() => {
    isModalOpen.value = false;
    currentTask.value = null;
    clearError();
  });

  const handleSubmit = $(async (data: CreateTaskInput) => {
    if (!data.title.trim()) {
      return;
    }

    try {
      if (currentTask.value) {
        // Update existing task
        const updateData: UpdateTaskInput = {
          title: data.title,
          description: data.description,
          isCompleted: currentTask.value.isCompleted,
        };
        await updateTask(currentTask.value.id, updateData);
      } else {
        // Create new task
        await createTask(data);
      }
      closeModal();
    } catch {
      // Error handled in useTasks hook
    }
  });

  const handleDeleteTask = $(async (id: string) => {
    await deleteTask(id);
  });

  return (
    <div class="min-h-screen bg-white flex items-center justify-center p-6">
      <div class="w-full max-w-5xl relative">
        {/* Success Toast */}
        <Toast message={successMessage.value} show={!!successMessage.value} />

        {/* Header */}
        <Header />

        {/* Error Display */}
        {error.value && (
          <div class="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm shadow-md">
            {error.value}
          </div>
        )}

        {/* Add Task Button */}
        <div class="text-right mb-8">
          <Button onClick$={openModal}>
            ➕ Add Note
          </Button>
        </div>

        {/* Tasks Grid */}
        <TaskGrid
          tasks={tasks.value}
          loading={loading.value}
          onEditTask$={openEditModal}
          onDeleteTask$={handleDeleteTask}
        />

        {/* Task Modal */}
        <TaskModal
          isOpen={isModalOpen.value}
          currentTask={currentTask.value}
          error={error.value}
          onClose$={closeModal}
          onSubmit$={handleSubmit}
        />
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