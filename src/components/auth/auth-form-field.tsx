
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
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
  disabled?: boolean;
}

export function AuthFormField({
  id,
  label,
  type,
  placeholder,
  registration,
  error,
  disabled = false,
}: AuthFormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-zinc-500">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className="h-10 rounded-none border-0 border-b border-zinc-200 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 dark:border-zinc-700 dark:focus-visible:border-blue-400 placeholder:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          {...registration}
        />
        {isPasswordField ? <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button> : null}
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs text-red-500" role="alert">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
