'use client';

import { FormEvent, InputHTMLAttributes, useRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  handleInput: (value: string) => void;
}

export function Input({ label, className, handleInput, ...rest }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    if (!inputRef || !inputRef.current) return;

    handleInput(inputRef.current.value);

    inputRef.current.value = "";
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center">
      <label className="text-cyan-500 font-semibold">{label} {"$>"}</label>
      <input
        {...rest}
        ref={inputRef}
        type="text"
        className={`pl-1 grow text-white outline-none ${className}`}
        autoFocus
      />
    </form>
  )
}