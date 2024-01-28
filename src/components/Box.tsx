import { ScriptProps } from "next/script";
//import Typography from "./Typography";

interface BoxProps extends ScriptProps {
  bgcolor: string;
}

export default function Box({ children, bgcolor, ...props }: BoxProps) {
  const rest = props;
  return (
    <div
      className={`${
        bgcolor != "" ? bgcolor : "bg-gray-500"
      } py-2 px-4 w-10 h-10 rounded mt-2 ml-2 mr-2`}
      //{...rest}
    ></div>
  );
}
