"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";

import { AuthFormField } from "@/components/auth/auth-form-field";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { Button } from "@/components/ui/button";
import { useAuthForm } from "@/hooks/use-auth-form";
import { api } from "@/lib/api/client";
import { parseApiError } from "@/lib/api/error-handler";
import { loginSchema } from "@/lib/schemas/auth";
import { useAuthStore } from "@/store/use-auth-store";

import type { LoginSchema } from "@/lib/schemas/auth";
import type { Route } from "next";

interface LoginFormState {
  error: string | null;
  success: boolean;
}

async function loginAction(
  _prevState: LoginFormState | undefined,
  formData: FormData
): Promise<LoginFormState> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate inputs
    if (!email || !password) {
      return {
        error: "이메일과 비밀번호를 입력해주세요.",
        success: false,
      };
    }

    // Parse and validate with Zod
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return {
        error: errorMessage,
        success: false,
      };
    }

    // Call API with timeout (10 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await api.auth.login(email, password);

      clearTimeout(timeoutId);

      // Validate response structure
      if (!response?.user?.uuid) {
        return {
          error: "로그인 응답이 불완전합니다. 잠시 후 다시 시도해주세요.",
          success: false,
        };
      }

      // Update auth store (side effect, but required for immediate state update)
      useAuthStore.getState().login({
        ...response.user,
        id: response.user.uuid,
      });

      return {
        error: null,
        success: true,
      };
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  } catch (err) {
    const errorDetails = parseApiError(err);
    return {
      error: errorDetails.message,
      success: false,
    };
  }
}

export function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    loginAction,
    {
      error: null,
      success: false,
    } as LoginFormState
  );

  const {
    register,
    handleSubmit,
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

  // Handle successful login
  if (state.success) {
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );
    const next = params.get("next");
    const safeNext =
      next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

    // Redirect after state update
    if (typeof window !== "undefined") {
      router.push(safeNext as Route);
    }
  }

  const onSubmit = async (data: LoginSchema) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    await formAction(formData);
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

      {state.error ? <div
          className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50"
          role="alert"
        >
          {state.error}
        </div> : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          disabled={isPending || !isFormFilled}
          className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base rounded-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </Button>
      </form>

      <SocialLoginButtons mode="login" />
    </div>
  );
}
