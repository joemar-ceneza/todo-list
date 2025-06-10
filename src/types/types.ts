export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface AddTaskFormProps {
  onAddTask: (task: string) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
  isLoading: boolean;
}

export interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}
