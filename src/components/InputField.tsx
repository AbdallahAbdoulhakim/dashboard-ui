import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error: FieldError | undefined;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export default function InputField({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-500" htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        type={type}
        {...register(name)}
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error?.message.toString()}</p>
      )}
    </div>
  );
}
