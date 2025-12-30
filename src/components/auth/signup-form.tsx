"use client";

import { Loader2 } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";

import { signupAction } from "@/app/(marketing)/(auth)/signup/actions";
import { AuthFormField } from "@/components/auth/auth-form-field";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { Button } from "@/components/ui/button";
import { useAuthForm } from "@/hooks/use-auth-form";
import { signupSchema } from "@/lib/schemas/auth";

function SignupFormContent() {
  const [state, formAction, isPending] = useActionState(signupAction, {
    status: "idle",
    message: null,
    fieldErrors: {},
    popup: undefined,
    nonce: 0,
  });

  const lastPopupNonceRef = useRef<number>(0);

  const {
    register,
    formState: { errors, isValid },
    watch,
    handleSubmit,
  } = useAuthForm<typeof signupSchema>({
    schema: signupSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Watch form values to enable button when fields have content
  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const isFormFilled = name && email && password;

  useEffect(() => {
    if (state.popup !== "EMAIL_EXISTS") return;
    if (!state.nonce) return;
    if (lastPopupNonceRef.current === state.nonce) return;

    lastPopupNonceRef.current = state.nonce;
    // Minimal popup UX per request
    window.alert("이미 가입된 이메일입니다. 로그인 페이지에서 로그인해주세요.");
  }, [state.popup, state.nonce]);

  const onSubmit = handleSubmit(
    (_values, event) => {
      setSubmitAttempted(true);
      const formEl = event?.currentTarget as HTMLFormElement | undefined;
      if (!formEl) return;
      const formData = new FormData(formEl);
      formAction(formData);
    },
    () => {
      setSubmitAttempted(true);
    }
  );

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

      {/* Loading State */}
      {isPending ? (
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4 flex items-start gap-3">
          <Loader2 className="h-5 w-5 text-blue-600 dark:text-blue-400 animate-spin shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
              회원가입 중입니다...
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              계정을 생성 중입니다. 잠시만 기다려주세요.
            </p>
          </div>
        </div>
      ) : null}

      {/* Server Error */}
      {state.status === "error" && state.message ? (
        <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-4">
          <p className="text-sm font-semibold text-red-900 dark:text-red-100">회원가입 실패</p>
          <p className="text-xs text-red-700 dark:text-red-200 mt-1">{state.message}</p>
        </div>
      ) : null}

      <form action={formAction} onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-4 text-left">
          <AuthFormField
            id="name"
            label="이름"
            type="text"
            placeholder="홍길동"
            registration={register("name")}
            error={errors.name}
            disabled={isPending}
          />
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

        <Button
          type="submit"
          onClick={() => setSubmitAttempted(true)}
          disabled={isPending}
          className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base rounded-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          <span>
            {isPending
              ? "회원가입 중..."
              : submitAttempted && (!isFormFilled || !isValid)
                ? "입력 확인 필요"
                : "회원가입"}
          </span>
        </Button>

        {submitAttempted && (!isFormFilled || !isValid) ? (
          <p className="text-xs text-red-600 dark:text-red-300">
            입력값을 확인해주세요.
          </p>
        ) : null}
      </form>

      <SocialLoginButtons mode="signup" />
    </div>
  );
}

export function SignupForm() {
  return <SignupFormContent />;
}
