import './App.css'
import {TaskType, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {getTasksForRender} from "./utils.ts";

export type FilterValuesType = "all" | "active" | "completed"

//UI

function App() {
  // Data
  const todoListTitle = "What to learn"


  const [tasks, setTasks] = useState<TaskType[]>([
    {id: v1(), title: "HTML and CSS", isDone: true},
    {id: v1(), title: "JS and TS", isDone: true},
    {id: v1(), title: "REACT", isDone: false},
  ])


//CRUD
  const deleteTask = (taskId: TaskType["id"]) => {
    // Создаем новую структуру данных
    const nextState = tasks.filter(task => task.id !== taskId)
    // Передаем ее в реакт для обновления UI
    setTasks(nextState)
  }

  const createTask = (title: TaskType["title"]) => {
    // Создаем новую структуру данных
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    const nextState: TaskType[] = [...tasks, newTask]
    // Передаем новую структуру данных для обновления представления визуализации
    setTasks(nextState)

  }

  const changeTaskStatus =
    (taskId: TaskType["id"], isDone: TaskType["isDone"]) => {
    // Создаем новую структуру данных
    const nextState : TaskType[] = tasks.map(task => task.id === taskId ? {...task, isDone: isDone}   :task)
      // Передаем ее в реакт для обновления UI
      setTasks(nextState)
  }
  //UI
  const [filter, setFilter] = useState<FilterValuesType>("all")
  const changeToDoListFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  }

  const tasksForRender = getTasksForRender(tasks, filter)


  return (
    <div className="app">
      <TodolistItem
        title={todoListTitle}
        tasks={tasksForRender}
        deleteTask={deleteTask}
        createTask={createTask}
        changeTaskStatus={changeTaskStatus}
        changeToDoListFilter={changeToDoListFilter}
        filter={filter}
      />
    </div>
  )
}

export default App
