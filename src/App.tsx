import './App.css'
import {TaskType, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export type FilterValuesType = "all"|"active"|"completed"
//UI

function App() {
  // Data
  const todoListTitle = "What to learn"


  const [tasks, setTasks] = useState<TaskType[]>([
    {id: 1, title: "HTML and CSS", isDone: true},
    {id: 2, title: "JS and TS" , isDone: true},
    {id: 3, title: "REACT", isDone: false},
  ])


  const deleteTask = (taskId: TaskType["id"]) => {
    // Создаем новую структуру данных
    const nextState = tasks.filter(task => task.id !== taskId)
    // Передаем ее в реакт для обновления UI
    setTasks(nextState)
  }

  //UI
  const [filter, setFilter] = useState<FilterValuesType>("all")
  const changeToDoListFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  }


  let tasksForRender: TaskType[] = tasks
  if (filter === "active") {
    tasksForRender = tasks.filter(task => task.isDone === false)
  }
  if (filter === "completed") {
    tasksForRender = tasks.filter(task => task.isDone === true)
  }

  return (
    <div className="app">
      <TodolistItem
        title ={todoListTitle}
        tasks = {tasksForRender}
        deleteTask ={deleteTask}
        changeToDoListFilter={changeToDoListFilter}
      />
    </div>
  )
}

export default App
