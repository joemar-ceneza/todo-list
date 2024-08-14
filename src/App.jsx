import { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import useFetch from "./hook/useFetch";

export default function App() {
  const { data } = useFetch("/tasks");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const addTask = async (text) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const toggleComplete = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: !task.completed }),
        }
      );
      const updatedTask = await response.json();
      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (error) {
      console.error("Error toggling task completion: ", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
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
