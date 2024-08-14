import { useState } from "react";

export default function AddTaskForm({ onAddTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onAddTask(task);
      setTask("");
    }
  };
  return (
    <form className="py-2" onSubmit={handleSubmit}>
      <input
        className="shadow appearance-none border rounded py-2 px-3 mx-2 text-gray-700"
        type="text"
        placeholder="Add New Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="bg-green-400 shadow appearance-none border rounded py-2 px-3 capitalize">
        add task
      </button>
    </form>
  );
}
