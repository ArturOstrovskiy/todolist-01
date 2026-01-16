import './App.css'
import {TaskType, TodolistItem} from "./TodolistItem.tsx";


//UI

function App() {
  // Data
  const todoListTitle_1 = "What to learn"
  const todoListTitle_2 = "What to buy"
  const todoListTitle_3 = "What to read"
  const tasks_1: TaskType[] = [
    {id: 1, title: "HTML and CSS", isDone: true},
    {id: 2, title: "JS and TS" , isDone: true},
    {id: 3, title: "REACT", isDone: false},
  ]
  const tasks_2: TaskType[] = [
    {id: 1, title: "Beer", isDone: true},
    {id: 2, title: "Meet" , isDone: true},
    {id: 3, title: "Cheeps", isDone: false},
  ]

  const tasks_3: TaskType[] = []

  return (
    <div className="app">
      {TodolistItem({
        title: todoListTitle_1,
        tasks: tasks_1
      })}
      {TodolistItem({
        title: todoListTitle_2,
        tasks: tasks_2
      })}
      <TodolistItem
        title ={todoListTitle_3}
        tasks ={tasks_3}
      />
    </div>
  )
}

export default App
