import { component$, type QRL } from '@builder.io/qwik';
import type { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit$: QRL<(task: Task) => void>;
  onDelete$: QRL<(id: string) => void>;
  onToggleComplete$: QRL<(task: Task) => void>;
}

export const TaskCard = component$<TaskCardProps>(({ 
  task, 
  index, 
  onEdit$, 
  onDelete$,
  onToggleComplete$
}) => {
  return (
    <div
      class={`bg-black text-white rounded-2xl p-5 shadow-2xl transition-all duration-300 hover:rotate-1 hover:scale-[1.02] ${
        task.isCompleted ? 'opacity-70 bg-gray-800' : ''
      }`}
      style={{
        transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
      }}
    >
      <div class="flex items-start justify-between">
        <div class="flex-1 min-w-0">
          <div class="flex items-start gap-3">
            {/* Toggle Complete Button */}
            <button
              onClick$={() => onToggleComplete$(task)}
              class={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                task.isCompleted 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-gray-400 hover:border-green-500'
              }`}
              title={task.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.isCompleted && <span class="text-xs">✓</span>}
            </button>
            
            <div class="flex-1">
              <h3
                class={`text-lg font-semibold transition-all duration-200 ${
                  task.isCompleted ? 'line-through text-gray-400' : ''
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  class={`text-gray-300 mt-2 text-sm transition-all duration-200 ${
                    task.isCompleted ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {task.description}
                </p>
              )}
              <p class="text-gray-500 text-xs mt-3">
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        <div class="flex space-x-2 ml-3">
          <button
            onClick$={() => onEdit$(task)}
            class="text-blue-400 hover:text-blue-300 p-1 hover:bg-blue-400/20 rounded transition-all"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick$={() => onDelete$(task.id)}
            class="text-red-400 hover:text-red-300 p-1 hover:bg-red-400/20 rounded transition-all"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
});