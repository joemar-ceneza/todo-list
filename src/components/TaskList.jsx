import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggleComplete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
}
