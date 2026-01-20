import {Button} from "./Button.tsx";
import {TaskType} from "./TodolistItem.tsx";

type Props = {
  title: string;
  isDone: boolean;
  className: string;
  deleteTask : () => void;
  changeTaskStatusHandler: (isDone: TaskType["isDone"]) => void;
}


export const Task = (props: Props) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={props.isDone}
        onChange={(e) => props.changeTaskStatusHandler(e.target.checked)}
      />
      <span className={props.className}> {props.title}</span>
      <Button title="x" onClick={props.deleteTask}/>
    </li>
  )
}