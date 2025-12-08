
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface AuthFormFieldProps {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

export function AuthFormField({
  id,
  label,
  type,
  placeholder,
  registration,
  error,
}: AuthFormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-zinc-500">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="h-10 rounded-none border-0 border-b border-zinc-200 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 dark:border-zinc-700 dark:focus-visible:border-blue-400 placeholder:text-zinc-300"
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        {...registration}
      />
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
