import {Button} from "./Button.tsx";
import {Task} from "./Task.tsx";

type Props = {
  title: string;
  tasks: TaskType[];
}

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
}

// Начинаем отрисовывать todoList
export const TodolistItem = (props: Props) => {

//   Или можно взять из объекта толко нужное
// export const TodolistItem = (props: Props) => {

  const {title: title, tasks: tasks} = props;
  // Можно в сокращенном виде
  // const {title, tasks} = props;


//Заходим  и проверяем есть ли в этом todoList'е таски
  const taskList = tasks.length === 0
    //Если тасок нет, то вместо лишек будет спан с надписью
    ?<span>Your tasks list is empty</span>
    //Если таски есть, то будем создавать список <ul>
    :
    <ul>
      {
        tasks.map((task: TaskType) => {
          return(
            //Заполняем лишками, сколько их в tasks
           <Task title = {task.title} isDone={task.isDone}/>
          )
        })
      }
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
        <Button title = "All"/>
        <Button title = "Active"/>
        <Button title = "Completed"/>
      </div>
    </div>
  )
}