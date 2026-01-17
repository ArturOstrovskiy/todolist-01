import {Button} from "./Button.tsx";

type Props = {
  title: string;
  isDone: boolean;
  deleteTask : () => void;
}


export const Task = (props: Props) => {
  return (
    <li>
      <input type="checkbox" checked={props.isDone} />
      <span>{props.title}</span>
      <Button title="x" onClick={props.deleteTask}/>
    </li>
  )
}