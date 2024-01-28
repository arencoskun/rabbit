import { ScriptProps } from "next/script";

export default function Typography({ children, ...props }: ScriptProps) {
  return <p className={`text-xl font-medium ${props.className}`}>{children}</p>;
}
