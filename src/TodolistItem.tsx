import {KeyboardEvent,ChangeEvent,useState} from "react";
import {FilterValuesType} from "./App.tsx";
import {Button} from "./Button.tsx";
import {Task} from "./Task.tsx";
import * as React from "react";

type Props = {
  title: string;
  tasks: TaskType[];
  deleteTask: (taskId: TaskType["id"]) => void;
  changeToDoListFilter: (filter: FilterValuesType) => void;
  createTask: (title: TaskType["title"]) => void;
}

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

// Начинаем отрисовывать todoList
// export const TodolistItem = (props: Props) => {
//   Или можно взять из объекта толко нужное
export const TodolistItem = ({
  title,
  tasks,
  deleteTask,
  changeToDoListFilter,
  createTask
}: Props) => {
  const [taskTitle, setTaskTitle] = useState("");

  // const {title: title, tasks: tasks} = props;
  // Можно в сокращенном виде
  // const {title, tasks} = props;

  const createTaskOnClickHandler = () => {
    createTask(taskTitle);
    setTaskTitle("");
  }
  const createTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) =>{
    e.key === "Enter" && createTaskOnClickHandler()
    }
  const setTaskTitleOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }
  const changeFilterALLOnClickHandler = () =>
    changeToDoListFilter("all")
  const changeFilterActiveOnClickHandler = () =>
    changeToDoListFilter("active")
  const changeFilterComplitedOnClickHandler = () =>
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


  //Заходим и проверяем есть ли в этом todoList'е таски
  const taskList = tasks.length === 0
    //Если тасок нет, то вместо лишек будет спан с надписью
    ? <span>Your tasks list is empty</span>
    //Если таски есть, то будем создавать список <ul>
    :
    <ul>
      {tasks.map((task: TaskType) =>
        //Заполняем лишками, сколько их в tasks
        <Task
          key={task.id}
          title={task.title}
          isDone={task.isDone}
          deleteTask={() => deleteTask(task.id)}
        />)}
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
          onClick={changeFilterALLOnClickHandler}
        />
        <Button
          title="Active"
          onClick={changeFilterActiveOnClickHandler}
        />
        <Button
          title="Completed"
          onClick={changeFilterComplitedOnClickHandler}
        />
      </div>
    </div>
  )
}