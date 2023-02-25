interface Props {
  buttonText: string;
  color?: string;
  type?: string;
}

export default function Button(props: Props) {
  return (
    <button style={{ backgroundColor: props.color }}>{props.buttonText}</button>
  );
}
