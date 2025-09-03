import { component$, type QRL } from '@builder.io/qwik';
import type { Task, CreateTaskInput } from '../../types/task';
import { Modal } from '../ui/Modal';
import { TaskForm } from './TaskForm';

interface TaskModalProps {
  isOpen: boolean;
  currentTask?: Task | null;
  error?: string;
  onClose$: QRL<() => void>;
  onSubmit$: QRL<(data: CreateTaskInput) => Promise<void>>;
}

export const TaskModal = component$<TaskModalProps>(({ 
  isOpen, 
  currentTask, 
  error, 
  onClose$, 
  onSubmit$ 
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose$={onClose$}
      title={currentTask ? 'Edit Note' : 'Add Note'}
    >
      <TaskForm
        currentTask={currentTask}
        error={error}
        onSubmit$={onSubmit$}
        onCancel$={onClose$}
      />
    </Modal>
  );
});