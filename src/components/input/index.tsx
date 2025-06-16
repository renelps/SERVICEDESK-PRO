"use client";

import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  type: string;
  name: Path<T>;
  id?: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

export function Input<T extends FieldValues>({
  type,
  name,
  id,
  placeholder,
  error,
  register,
  rules,
}: InputProps<T>) {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`border p-2 rounded outline-none ${
          error ? "border-red-500" : "border-slate-400"
        }`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}