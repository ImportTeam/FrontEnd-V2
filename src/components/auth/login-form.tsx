"use client";

import { Loader2 } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";

import { loginAction } from "@/app/(marketing)/(auth)/login/actions";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { Button } from "@/components/ui/button";
import { useAuthForm } from "@/hooks/use-auth-form";
import { logger } from "@/lib/logger";
import { loginSchema } from "@/lib/schemas/auth";

function LoginFormContent() {
  const log = logger.scope("LOGIN_FORM");
  const [state, formAction, isPending] = useActionState(loginAction, {
    status: "idle",
    message: null,
    fieldErrors: {},
    nonce: 0,
  });

  const {
    register,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useAuthForm<typeof loginSchema>({
    schema: loginSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [submitAttempted, setSubmitAttempted] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Watch form values to enable button when fields have content
  const email = watch("email");
  const password = watch("password");
  const isFormFilled = email && password;

  useEffect(() => {
    // If server returned fieldErrors, RHF already validates client-side.
    // Keep the server message rendered as a banner.
  }, [state.nonce]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setSubmitAttempted(true);
    log.info("submit (attempt)");

    const valid = await trigger();
    if (!valid) {
      log.warn("submit (invalid)");
      event.preventDefault();
    }
  };

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

      {/* Server Error */}
      {state.status === "error" && state.message ? (
        <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-4">
          <p className="text-sm font-semibold text-red-900 dark:text-red-100">로그인 실패</p>
          <p className="text-xs text-red-700 dark:text-red-200 mt-1">{state.message}</p>
        </div>
      ) : null}

      <form ref={formRef} action={formAction} onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-4 text-left">
          <AuthFormField
            id="email"
            label="이메일"
            type="email"
            placeholder="name@example.com"
            registration={register("email")}
            error={errors.email}
            disabled={isPending}
          />
          <AuthFormField
            id="password"
            label="비밀번호"
            type="password"
            placeholder="••••••••"
            registration={register("password")}
            error={errors.password}
            disabled={isPending}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            disabled={isPending}
            className="text-xs text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            비밀번호 찾기
          </button>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base rounded-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          <span>{isPending ? "로그인 중..." : submitAttempted && (!isFormFilled || !isValid) ? "입력 확인 필요" : "로그인"}</span>
        </Button>

        {submitAttempted && (!isFormFilled || !isValid) ? (
          <p className="text-xs text-red-600 dark:text-red-300">
            입력값을 확인해주세요.
          </p>
        ) : null}
      </form>

      <SocialLoginButtons mode="login" />
    </div>
  );
}

export function LoginForm() {
  return <LoginFormContent />;
}
