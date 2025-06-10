import { ChangeEvent, FormEvent, useState } from "react";
import { AddTaskFormProps } from "../types/types";

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [task, setTask] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task);
      setTask("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };
  return (
    <form className="py-2" onSubmit={handleSubmit}>
      <input
        className="shadow appearance-none border rounded py-2 px-3 mx-2 text-gray-700"
        type="text"
        placeholder="Add New Task"
        value={task}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-green-400 shadow appearance-none border rounded py-2 px-3 capitalize">
        add task
      </button>
    </form>
  );
}
