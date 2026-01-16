'use client';

import { InputHTMLAttributes } from "react";
import { useInput } from "../hooks/useInput";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  handleInput: (value: string) => void;
}

export function Input({ label, className, handleInput, ...rest }: Props) {
  const { suggestions, selectedSuggestion, inputRef, value, setValue, handleKeyDown } = useInput(handleInput);

  return (
    <div className="relative w-full flex gap-2 items-center">
      {
        !!suggestions.length &&
        <div
          className="absolute min-w-32 duration-300 bottom-12 left-26 p-4 bg-gray-700 rounded-md shadow-black animate-suggestions-box">
          <div className={'flex flex-col text-gray-400 text-sm italic font-semibold'}>
            {suggestions.map((el, index) => (
              <div key={el} className={`p-1 pb-1.5 duration-300 ${index === selectedSuggestion ? 'pl-4 bg-cyan-300/40 text-white rounded-full' : 'bg-gray-700'}`}>{el}</div>
            ))}
          </div>
        </div>
      }

      <label className="text-cyan-500 font-semibold">{label} {"$>"}</label>

      <input
        {...rest}
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        className={`pl-4 p-2 rounded-full bg-white/5 grow text-white outline-none ${className}`}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  )
}