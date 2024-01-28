import { ScriptProps } from "next/script";

interface NumberPickerProps extends ScriptProps {
  handleChange: (newNumber: number) => void;
  placeholder: string;
  minValue?: number;
  maxValue?: number;
}

export default function NumberPicker({
  children,
  handleChange,
  placeholder,
  ...props
}: NumberPickerProps) {
  return (
    <form className={`max-w-sm ${props.className}`}>
      <input
        type="number"
        className="bg-gray-100 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        max={props.maxValue}
        min={props.minValue}
        onChange={(ev) => {
          if (props.maxValue) {
            if (ev.target.valueAsNumber > props.maxValue)
              ev.target.valueAsNumber = props.maxValue;
          }
          handleChange(ev.target.valueAsNumber);
        }}
        onMouseLeave={(ev) => {
          if (props.minValue) {
            if (
              ev.currentTarget.valueAsNumber < props.minValue ||
              Number.isNaN(ev.currentTarget.valueAsNumber)
            ) {
              ev.currentTarget.valueAsNumber = props.minValue;
              handleChange(ev.currentTarget.valueAsNumber);
            }
          }
        }}
        required
      ></input>
    </form>
  );
}