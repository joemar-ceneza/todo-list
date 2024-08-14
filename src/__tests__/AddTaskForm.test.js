import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddTaskForm from "../components/AddTaskForm";

describe("AddTaskForm Component", () => {
  test("calls onAddTask with input value when form is submitted", () => {
    const mockOnAddTask = jest.fn();
    render(<AddTaskForm onAddTask={mockOnAddTask} />);

    // Find the input and submit button elements
    const inputElement = screen.getByPlaceholderText(/Add New Task/i);
    const buttonElement = screen.getByRole("button", { name: /add task/i });

    // Simulate typing into the input field
    fireEvent.change(inputElement, { target: { value: "New Task" } });

    // Simulate form submission
    fireEvent.click(buttonElement);

    // Check that the mock function was called once with the correct value
    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
    expect(mockOnAddTask).toHaveBeenCalledWith("New Task");

    // Ensure the input field is cleared after submission
    expect(inputElement.value).toBe("");
  });
});
