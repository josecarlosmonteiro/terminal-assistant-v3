'use client';

import { InputHTMLAttributes, KeyboardEvent, useRef } from "react";
import { useCommandHistory } from "../hooks/useCommandHistory";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  handleInput: (value: string) => void;
}

export function Input({ label, className, handleInput, ...rest }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToStack, getPrevious, getNext } = useCommandHistory();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;

    const value = inputRef.current.value;

    if (event.key === 'Enter' && value.trim()) {
      addToStack(value);
      handleInput(value);
      inputRef.current.value = "";
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = getPrevious();
      if (!!prev) inputRef.current.value = prev;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = getNext();
      inputRef.current.value = next;
    }
  }

  return (
    <div className="flex items-center">
      <label className="text-cyan-500 font-semibold">{label} {"$>"}</label>
      <input
        {...rest}
        ref={inputRef}
        type="text"
        className={`pl-1 grow text-white outline-none ${className}`}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  )
}