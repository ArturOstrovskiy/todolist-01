
type Props = {
  title: string
  onClick?: () => void
  disabled?: boolean
}


export const Button = (props: Props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}>{props.title}</button>
  )
}