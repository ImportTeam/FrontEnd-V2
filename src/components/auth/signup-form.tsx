"use client";

import { useFormStatus } from "react-dom";

import { signupAction } from "@/app/(marketing)/(auth)/signup/actions";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { Button } from "@/components/ui/button";
import { useAuthForm } from "@/hooks/use-auth-form";
import { signupSchema } from "@/lib/schemas/auth";

function SignupFormContent() {
  const { pending } = useFormStatus();

  const {
    register,
    formState: { errors },
    watch,
  } = useAuthForm<typeof signupSchema>({
    schema: signupSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Watch form values to enable button when fields have content
  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const isFormFilled = name && email && password;

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          회원가입
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          새로운 계정을 만들어보세요.
        </p>
      </div>

      <form action={signupAction} className="space-y-4">
        <div className="space-y-4 text-left">
          <AuthFormField
            id="name"
            label="이름"
            type="text"
            placeholder="홍길동"
            registration={register("name")}
            error={errors.name}
            disabled={pending}
          />
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

        <Button
          type="submit"
          disabled={pending || !isFormFilled}
          className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base rounded-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
          {pending ? "회원가입 중..." : "회원가입"}
        </Button>
      </form>

      <SocialLoginButtons mode="signup" />
    </div>
  );
}

export function SignupForm() {
  return <SignupFormContent />;
}
