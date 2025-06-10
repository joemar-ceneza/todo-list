import { useState, useEffect, useCallback } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import useFetch from "./hook/useFetch";
import { request } from "./request";
import { Task } from "./types/types";

export default function App() {
  const { data, isLoading } = useFetch<Task[]>("/tasks");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const handleError = (error: unknown, action: string) => {
    console.error(`Error ${action}`, error);
  };

  const addTask = useCallback(async (text: string) => {
    try {
      const response = await request.post<Task>(`/tasks`, { text });
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      handleError(error, "adding task");
    }
  }, []);

  const toggleComplete = useCallback(
    async (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      try {
        const response = await request.patch<Task>(`/tasks/${taskId}`, {
          completed: !task.completed,
        });
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? response.data : t))
        );
      } catch (error) {
        handleError(error, "toggling task completion");
      }
    },
    [tasks]
  );

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      await request.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (error) {
      handleError(error, "deleting task");
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
