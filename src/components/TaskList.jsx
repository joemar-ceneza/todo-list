import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggleComplete }) {
  return (
    <ul className="mx-7">
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
