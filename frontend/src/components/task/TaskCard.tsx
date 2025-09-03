import { component$, type QRL } from '@builder.io/qwik';
import type { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit$: QRL<(task: Task) => void>;
  onDelete$: QRL<(id: string) => void>;
}

export const TaskCard = component$<TaskCardProps>(({ 
  task, 
  index, 
  onEdit$, 
  onDelete$ 
}) => {
  return (
    <div
      class={`bg-black text-white rounded-2xl p-5 shadow-2xl transition-all duration-300 hover:rotate-1 hover:scale-[1.02] ${
        task.isCompleted ? 'opacity-70' : ''
      }`}
      style={{
        transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
      }}
    >
      <div class="flex items-start justify-between">
        <div class="flex-1 min-w-0">
          <h3
            class={`text-lg font-semibold ${
              task.isCompleted ? 'line-through text-gray-400' : ''
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              class={`text-gray-300 mt-2 text-sm ${
                task.isCompleted ? 'line-through' : ''
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
            onClick$={() => onEdit$(task)}
            class="text-blue-400 hover:text-blue-300"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick$={() => onDelete$(task.id)}
            class="text-red-400 hover:text-red-300"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
});