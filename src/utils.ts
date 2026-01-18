import {TaskType} from "./TodolistItem"
import {FilterValuesType} from "./App.tsx";

export const getTasksForRender = (tasks: TaskType[], filter: FilterValuesType) => {
  return  filter === "active"
    ? tasks.filter(task => task.isDone === false)
    : filter === "completed"
      ? tasks.filter(task => task.isDone === true)
      : tasks
}