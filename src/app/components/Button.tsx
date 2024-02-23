import { IconType } from "react-icons";

type IProps = {
  text?: any;
  handleFunction?(): any;
  handleSubmit?(): any;
};

const Button = (props: IProps) => {
  return (
    <button
      className=" text-red-50 max-w-40 p-1 rounded bg-myColor hover:opacity-45 uppercase"
      onClick={props.handleFunction}
      onSubmit={props.handleSubmit}
    >
      {props.text}{" "}
    </button>
  );
};

export default Button;
