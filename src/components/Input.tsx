import React from "react";

interface InputProps {
  type: string;
  testId: string;
  inputText: string;
  value: string;
  fn: (event: React.FormEvent<HTMLInputElement>) => void;
}

function Input({ inputText, testId, type, fn, value }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={type}>{inputText}</label>
      <input
        onChange={fn}
        value={value}
        id={type}
        data-testid={testId}
        type={type}
        className="border-2 rounded-md py-1 px-1"
      />
    </div>
  );
}
export default React.memo(Input);
