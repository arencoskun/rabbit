import { ScriptProps } from "next/script";

interface NumberPickerProps extends ScriptProps {
  handleChange: (newNumber: number, lowerThanMinimum?: boolean) => void;
  placeholder?: string;
  minValue?: number;
  maxValue?: number;
  defaultValue?: string;
}

export default function NumberPicker({
  children,
  ...props
}: NumberPickerProps) {
  return (
    <form className={`max-w-sm ${props.className}`}>
      <input
        type="number"
        className="border text-sm rounded-lg block w-2/3 p-2.5 bg-gray-100 border-gray-400 placeholder-gray-600 text-black focus:ring-blue-500 focus:border-blue-500"
        placeholder={props.placeholder}
        max={props.maxValue}
        min={props.minValue}
        defaultValue={props.defaultValue}
        onChange={(ev) => {
          if (props.maxValue) {
            if (ev.target.valueAsNumber > props.maxValue)
              ev.target.valueAsNumber = props.maxValue;
          }
          props.handleChange(
            ev.target.valueAsNumber,
            props.minValue
              ? ev.target.valueAsNumber < props.minValue
              : undefined
          );
        }}
        required
      ></input>
    </form>
  );
}
