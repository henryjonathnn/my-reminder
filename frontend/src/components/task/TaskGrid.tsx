import { component$, type QRL } from '@builder.io/qwik';
import type { Task } from '../../types/task';
import { TaskCard } from './TaskCard';

interface TaskGridProps {
  tasks: Task[];
  loading: boolean;
  onEditTask$: QRL<(task: Task) => void>;
  onDeleteTask$: QRL<(id: string) => void>;
  onToggleComplete$: QRL<(task: Task) => void>;
}

export const TaskGrid = component$<TaskGridProps>(({ 
  tasks, 
  loading, 
  onEditTask$, 
  onDeleteTask$,
  onToggleComplete$
}) => {
  if (loading && tasks.length === 0) {
    return (
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        <div class="col-span-full text-center py-16">
          <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-black mx-auto"></div>
          <p class="text-gray-500 mt-6 text-lg">Loading notes...</p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        <div class="col-span-full text-center py-16">
          <p class="text-gray-500 text-lg">No notes yet. Add one above!</p>
        </div>
      </div>
    );
  }

  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {tasks.map((task, idx) => (
        <TaskCard
          key={task.id}
          task={task}
          index={idx}
          onEdit$={onEditTask$}
          onDelete$={onDeleteTask$}
          onToggleComplete$={onToggleComplete$}
        />
      ))}
    </div>
  );
});