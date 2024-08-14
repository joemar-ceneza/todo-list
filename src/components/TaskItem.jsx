export default function TaskItem({ task, onToggleComplete, onDelete }) {
  return (
    <>
      <li className="flex justify-between items-center py-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        <div
          className="text-gray-700 font-semibold capitalize"
          style={{ textDecoration: task.completed ? "line-through" : "none" }}>
          {task.text}
        </div>

        <button
          className="bg-red-400 shadow appearance-none border rounded py-2 px-3 capitalize"
          onClick={() => onDelete(task.id)}>
          delete
        </button>
      </li>
      <hr />
    </>
  );
}
