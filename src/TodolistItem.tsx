import {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {Task} from "./Task.tsx";
import * as React from "react";

type Props = {
  title: string;
  tasks: TaskType[];
  filter: FilterValuesType;
  deleteTask: (taskId: TaskType["id"]) => void;
  changeToDoListFilter: (filter: FilterValuesType) => void;
  createTask: (title: TaskType["title"]) => void;
  changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType["isDone"]) => void;
}

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

export const TodolistItem = ({
  title,
  tasks,
  filter,
  deleteTask,
  changeToDoListFilter,
  createTask,
  changeTaskStatus
}: Props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState(false);


  const createTaskOnClickHandler = () => {
    const trimmedTaskTitle = taskTitle.trim();
    if (trimmedTaskTitle) {
      createTask(taskTitle);
    } else {
      setError(true)
    }
    setTaskTitle("");
  }
  const createTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && createTaskOnClickHandler()
  }
  const setTaskTitleOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    setTaskTitle(e.currentTarget.value)
  }

  const changeFilterALLOnClickHandler = () =>
    changeToDoListFilter("all")
  const changeFilterActiveOnClickHandler = () =>
    changeToDoListFilter("active")
  const changeFilterCompletedOnClickHandler = () =>
    changeToDoListFilter("completed")

  const minTaskTileLength = 3
  const maxTaskTileLength = 10

  const isMinTaskTitleNotValue = taskTitle.length < minTaskTileLength
  const isMaxTaskTitleNotValue = taskTitle.length > maxTaskTileLength
  const isTaskTitleValid = !isMinTaskTitleNotValue && !isMaxTaskTitleNotValue

  let userMessage: React.ReactNode | null = null;
  if (!!taskTitle.length && isMinTaskTitleNotValue) {
    userMessage = <div>Title must be more then {minTaskTileLength}</div>
  }
  if (isTaskTitleValid) {
    userMessage = <div>Max title length {maxTaskTileLength}</div>
  }
  if (isMaxTaskTitleNotValue) {
    userMessage = <div style={{color: "red"}}>Max title length {maxTaskTileLength}</div>
  }
  if (error) {
    userMessage = <div style={{color: "red"}}>Enter valid value</div>
  }


  //Заходим и проверяем есть ли в этом todoList'е таски
  const taskList = tasks.length === 0
    //Если тасок нет, то вместо лишек будет спан с надписью
    ? <span>Your tasks list is empty</span>
    //Если таски есть, то будем создавать список <ul>
    :
    <ul>
      {tasks.map((task: TaskType) =>{
        const changeTaskStatusHandler = (isDone: TaskType["isDone"]) => {
          changeTaskStatus(task.id, isDone)
        }
        const deleteTaskHandler = () => {deleteTask(task.id)}
        const taskClassNames =  task.isDone ? "task-done" : "task";
        return(
        <Task
          key={task.id}
          title={task.title}
          isDone={task.isDone}
          className={taskClassNames}
          deleteTask={deleteTaskHandler}
          changeTaskStatusHandler = {changeTaskStatusHandler}
    />
)
})}
</ul>

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          placeholder="Title must be more then 3"
          value={taskTitle}
          onChange={setTaskTitleOnChangeHandler}
          onKeyDown={createTaskOnKeyDownHandler}
          className={error ? "task-input-error" : ""}
        />
        <Button
          disabled={isMinTaskTitleNotValue || isMaxTaskTitleNotValue}
          title="+"
          onClick={createTaskOnClickHandler}
        />
        {userMessage}
      </div>
      {/*Созданный список мы передаем сюда*/}
      {taskList}
      <div>
        <Button
          title="All"
          className={filter === "all" ? "btn-filter-active" : ""}
          onClick={changeFilterALLOnClickHandler}
        />
        <Button
          title="Active"
          className={filter === "active" ? "btn-filter-active" : ""}
          onClick={changeFilterActiveOnClickHandler}
        />
        <Button
          title="Completed"
          className={filter === "completed" ? "btn-filter-active" : ""}
          onClick={changeFilterCompletedOnClickHandler}
        />
      </div>
    </div>
  )
}