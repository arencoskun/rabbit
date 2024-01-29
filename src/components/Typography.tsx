import { ScriptProps } from "next/script";

interface TypographyProps extends ScriptProps {
  fontSizeOverride?: string;
}

export default function Typography({ children, ...props }: TypographyProps) {
  return (
    <p
      className={`${
        props.fontSizeOverride ? props.fontSizeOverride : "text-xl"
      } font-medium ${props.className}`}
    >
      {children}
    </p>
  );
}
