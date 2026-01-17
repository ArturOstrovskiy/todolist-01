import {Button} from "./Button.tsx";
import {Task} from "./Task.tsx";
import {FilterValuesType} from "./App.tsx";

type Props = {
  title: string;
  tasks: TaskType[];
  deleteTask : (taskId: TaskType["id"]) => void;
  changeToDoListFilter : (filter: FilterValuesType) => void;
}

export type TaskType = {
  id: number;
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
changeToDoListFilter
}: Props) => {

  // const {title: title, tasks: tasks} = props;
  // Можно в сокращенном виде
  // const {title, tasks} = props;

//Заходим и проверяем есть ли в этом todoList'е таски
  const taskList = tasks.length === 0
    //Если тасок нет, то вместо лишек будет спан с надписью
    ?<span>Your tasks list is empty</span>
    //Если таски есть, то будем создавать список <ul>
    :
    <ul>
      {tasks.map((task: TaskType) =>
            //Заполняем лишками, сколько их в tasks
           <Task
             key = {task.id}
             title = {task.title}
             isDone={task.isDone}
             deleteTask={()=> deleteTask(task.id)}
           />)}
    </ul>

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input/>
        <Button title = "+"/>
      </div>
      {/*Созданный список мы передаем сюда*/}
      {taskList}
      <div>
        <Button title = "All" onClick={() => changeToDoListFilter("all")}/>
        <Button title = "Active" onClick={() => changeToDoListFilter("active")}/>
        <Button title = "Completed" onClick={() => changeToDoListFilter("completed")}/>
      </div>
    </div>
  )
}