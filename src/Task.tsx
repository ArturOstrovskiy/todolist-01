type Props = {
  title: string;
  isDone: boolean;
}


export const Task = (props: Props) => {
  return (
    <li>
      <input type="checkbox" checked={props.isDone} />
      <span>{props.title}</span>
    </li>
  )
}