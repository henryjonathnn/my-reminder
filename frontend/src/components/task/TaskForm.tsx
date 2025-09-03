import { component$, useStore, $, type QRL, useTask$ } from '@builder.io/qwik';
import type { Task, CreateTaskInput } from '../../types/task';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';

interface TaskFormProps {
  currentTask?: Task | null;
  onSubmit$: QRL<(data: CreateTaskInput) => Promise<void>>;
  onCancel$: QRL<() => void>;
  error?: string;
}

export const TaskForm = component$<TaskFormProps>(({ 
  currentTask, 
  onSubmit$, 
  onCancel$, 
  error 
}) => {
  const formStore = useStore({
    title: '',
    description: '',
  });

  // Reset form ketika currentTask berubah
  useTask$(({ track }) => {
    track(() => currentTask);
    
    if (currentTask) {
      // Edit mode - isi dengan data existing
      formStore.title = currentTask.title;
      formStore.description = currentTask.description || '';
    } else {
      // Create mode - kosongkan form
      formStore.title = '';
      formStore.description = '';
    }
  });

  const handleSubmit$ = $(async (e: Event) => {
    e.preventDefault();
    
    if (!formStore.title.trim()) {
      return;
    }

    await onSubmit$({
      title: formStore.title.trim(),
      description: formStore.description.trim() || undefined,
    });
  });

  return (
    <form onSubmit$={handleSubmit$} class="space-y-6">
      <Input
        label="Title"
        type="text"
        value={formStore.title}
        onInput$={(e) => {
          formStore.title = (e.target as HTMLInputElement).value;
        }}
        placeholder="Write your note title..."
        required
      />
      
      <Textarea
        label="Description"
        value={formStore.description}
        onInput$={(e) => {
          formStore.description = (e.target as HTMLTextAreaElement).value;
        }}
        placeholder="Add some details..."
        rows={4}
      />

      {error && (
        <div class="text-red-400 text-sm">
          {error}
        </div>
      )}

      <div class="flex gap-4">
        <Button
          type="submit"
          variant="primary"
          class="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          {currentTask ? 'Update' : 'Add'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick$={onCancel$}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
});