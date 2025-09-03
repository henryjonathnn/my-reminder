import { useSignal, useTask$, $ } from '@builder.io/qwik';
import type { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';
import { TaskService } from '../services/taskService';
import { SUCCESS_MESSAGES, TOAST_DURATION } from '../utils/constants';

export function useTasks() {
  const tasks = useSignal<Task[]>([]);
  const loading = useSignal(false);
  const error = useSignal('');
  const successMessage = useSignal('');

  const showSuccess = $((message: string) => {
    successMessage.value = message;
    setTimeout(() => {
      successMessage.value = '';
    }, TOAST_DURATION);
  });

  const fetchTasks = $(async () => {
    try {
      loading.value = true;
      error.value = '';
      const fetchedTasks = await TaskService.getAllTasks();
      tasks.value = fetchedTasks;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      loading.value = false;
    }
  });

  const createTask = $(async (taskData: CreateTaskInput) => {
    try {
      error.value = '';
      await TaskService.createTask(taskData);
      await fetchTasks(); // Refresh data setelah create
      showSuccess(SUCCESS_MESSAGES.TASK_CREATED);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create task';
      throw err;
    }
  });

  const updateTask = $(async (id: string, taskData: UpdateTaskInput) => {
    try {
      error.value = '';
      await TaskService.updateTask(id, taskData);
      await fetchTasks(); // Refresh data setelah update
      showSuccess(SUCCESS_MESSAGES.TASK_UPDATED);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update task';
      throw err;
    }
  });

  const deleteTask = $(async (id: string) => {
    try {
      error.value = '';
      await TaskService.deleteTask(id);
      await fetchTasks(); // Refresh data setelah delete
      showSuccess(SUCCESS_MESSAGES.TASK_DELETED);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete task';
      throw err;
    }
  });

  const toggleComplete = $(async (task: Task) => {
    await updateTask(task.id, { isCompleted: !task.isCompleted });
  });

  const clearError = $(() => { 
    error.value = ''; 
  });

  // Load tasks on hook initialization
  useTask$(async () => {
    await fetchTasks();
  });

  return {
    // Signals sebagai .value agar reactive
    tasks,
    loading,
    error,
    successMessage,
    // Functions
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearError,
  };
}