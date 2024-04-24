"use client";
import { useState, createRef, useEffect, useCallback } from "react";

interface VerifyCodeProps {
  name: string;
  digits: number;
  disabled?: boolean;
  onCodeEntered?(code: string): void;
}

export function VerifyCode({
  name,
  digits,
  disabled,
  onCodeEntered,
}: VerifyCodeProps) {
  const initialState = Array(digits).fill("");
  const refs = Array(digits)
    .fill(0)
    .map((_, i) => createRef<HTMLInputElement>());

  const [codes, setCodes] = useState(initialState);

  // When codes changes, check if all 6 digits are filled
  useEffect(() => {
    if (codes.every((code) => code !== "")) {
      codeEntered();
    }
  }, [codes]);

  function codeEntered() {
    onCodeEntered && onCodeEntered(codes.join(""));
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !codes[index] && refs[index - 1]) {
      const newCodes = [...codes];
      newCodes[index - 1] = "";
      setCodes(newCodes);
      refs[index - 1].current?.focus();
    }
  }

  function handleOnInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const value = e.target.value;
    const num = Number(value);

    // Allow only single digit numbers (0-9)
    if (value === "" || (value.length === 1 && !isNaN(num))) {
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);

      // If the field was filled with a digit, move focus to the next field.
      if (value !== "" && refs[index + 1]) {
        refs[index + 1].current?.focus();
      }
    }
  }

  function handleOnPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text/plain").trim();
    // If the pasted data is a 6 digit number, update the fields.
    if (/^\d{6}$/.test(pastedData)) {
      const pastedCodes = pastedData.split("").map(Number);
      setCodes(pastedCodes);
    }
  }

  return (
    <div className="text-center grid grid-cols-6">
      {codes.map((code, index) => (
        <input
          key={index}
          name={`digit-${index}`}
          type="tel"
          value={code}
          onChange={(e) => handleOnInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handleOnPaste}
          ref={refs[index]}
          maxLength={1}
          disabled={disabled}
          className="
            rounded-lg
            border-2
            border-grey-600
            h-12
            w-12
            px-2
            py-2
            mx-0.5
            text-center
            bg-white
            text-black
            text-[24px]
            font-bold
            lg:mx-1
            focus:outline-none
            focus:border-3
            focus:border-dark
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      ))}
      <input type="hidden" name={name} value={codes.join("")} />
    </div>
  );
}
