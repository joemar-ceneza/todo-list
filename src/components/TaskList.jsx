import TaskItem from "./TaskItem";
import SpinnerLoader from "./SpinnerLoader";

export default function TaskList({
  tasks,
  onDelete,
  onToggleComplete,
  isLoading,
}) {
  return (
    <ul className="mx-7">
      {isLoading ? (
        <SpinnerLoader />
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))
      )}
    </ul>
  );
}
