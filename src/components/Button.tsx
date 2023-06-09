import { cls } from "../libs/utils";

interface ButtonProps {
  disabled: boolean;
  btnText: string;
  testId: string;
}

export default function Button({ btnText, disabled, testId }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cls(
        "w-2/3 py-1 text-lg font-bold text-center text-white rounded-md",
        disabled
          ? "bg-sky-400 bg-opacity-75"
          : "hover:bg-sky-600 bg-sky-500 transition-colors"
      )}
      data-testid={testId}
    >
      {btnText}
    </button>
  );
}
