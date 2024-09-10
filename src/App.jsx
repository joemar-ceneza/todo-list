import { useState, useEffect, useCallback } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import useFetch from "./hook/useFetch";
import { request } from "./request";

export default function App() {
  const { data, isLoading } = useFetch("/tasks");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const addTask = useCallback(async (text) => {
    try {
      const response = await request.post(`/tasks`, { text });
      const newTask = response.data;
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  }, []);

  const toggleComplete = useCallback(async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);

    try {
      const response = await request.patch(`/tasks/${taskId}`, {
        completed: !task.completed,
      });
      const updatedTask = response.data;
      setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (error) {
      console.error("Error toggling task completion: ", error);
    }
  }, []);

  const deleteTask = useCallback(async (taskId) => {
    try {
      await request.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  }, []);

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
        isLoading={isLoading}
      />
    </main>
  );
}
