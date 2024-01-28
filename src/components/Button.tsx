import { ButtonHTMLAttributes } from "react";
import Typography from "./Typography";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, disabled, ...props }: ButtonProps) {
  const { onClick, ...rest } = props;

  return (
    <button
      className={`${
        disabled ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"
      } text-white font-bold py-2 px-4 rounded`}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <Typography>{children}</Typography>
    </button>
  );
}
