import { InputHTMLAttributes } from "react";
import Typography from "./Typography";

interface TypographyCheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  handleChange: (newValue: boolean) => void;
  valueOverrideState?: boolean;
}

export default function TypographyCheckbox({
  children,
  handleChange,
  disabled,
  ...props
}: TypographyCheckboxProps) {
  return (
    <div className="flex flex-row items-center space-x-4">
      <Typography>{children}</Typography>
      <input
        type="checkbox"
        checked={props.valueOverrideState}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onChange={(event) => {
          handleChange(event.target.checked);
        }}
        disabled={disabled}
      ></input>
    </div>
  );
}
