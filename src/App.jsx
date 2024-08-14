import { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <main className="max-w-xl mx-auto text-center">
      <h1 className="text-gray-700 capitalize font-bold text-4xl text-center py-5">
        to do list
      </h1>
      <AddTaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggleComplete={toggleComplete}
      />
    </main>
  );
}
