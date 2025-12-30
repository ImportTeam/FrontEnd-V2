"use client";

import { useFormStatus } from "react-dom";

import { loginAction } from "@/app/(marketing)/(auth)/login/actions";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { Button } from "@/components/ui/button";
import { useAuthForm } from "@/hooks/use-auth-form";
import { loginSchema } from "@/lib/schemas/auth";

function LoginFormContent() {
  const { pending } = useFormStatus();

  const {
    register,
    formState: { errors },
    watch,
  } = useAuthForm<typeof loginSchema>({
    schema: loginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Watch form values to enable button when fields have content
  const email = watch("email");
  const password = watch("password");
  const isFormFilled = email && password;

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          로그인
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          계정에 로그인하여 서비스를 이용하세요.
        </p>
      </div>

      <form action={loginAction} className="space-y-4">
        <div className="space-y-4 text-left">
          <AuthFormField
            id="email"
            label="이메일"
            type="email"
            placeholder="name@example.com"
            registration={register("email")}
            error={errors.email}
            disabled={pending}
          />
          <AuthFormField
            id="password"
            label="비밀번호"
            type="password"
            placeholder="••••••••"
            registration={register("password")}
            error={errors.password}
            disabled={pending}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            disabled={pending}
            className="text-xs text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            비밀번호 찾기
          </button>
        </div>

        <Button
          type="submit"
          disabled={pending || !isFormFilled}
          className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base rounded-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {pending ? "로그인 중..." : "로그인"}
        </Button>
      </form>

      <SocialLoginButtons mode="login" />
    </div>
  );
}

export function LoginForm() {
  return <LoginFormContent />;
}
