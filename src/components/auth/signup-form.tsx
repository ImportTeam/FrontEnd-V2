"use client";

import { useRouter } from "next/navigation";
import { useActionState } from "react";

import { AuthFormField } from "@/components/auth/auth-form-field";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { Button } from "@/components/ui/button";
import { useAuthForm } from "@/hooks/use-auth-form";
import { api } from "@/lib/api/client";
import { parseApiError } from "@/lib/api/error-handler";
import { signupSchema } from "@/lib/schemas/auth";
import { useAuthStore } from "@/store/use-auth-store";

import type { SignupSchema } from "@/lib/schemas/auth";
import type { Route } from "next";

interface SignupFormState {
  error: string | null;
  success: boolean;
}

async function signupAction(
  _prevState: SignupFormState | undefined,
  formData: FormData
): Promise<SignupFormState> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate inputs
    if (!name || !email || !password) {
      return {
        error: "모든 필드를 입력해주세요.",
        success: false,
      };
    }

    // Parse and validate with Zod
    const validationResult = signupSchema.safeParse({ name, email, password });
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
      const response = await api.auth.signup(name, email, password);

      clearTimeout(timeoutId);

      // Validate response structure
      if (!response?.user?.uuid) {
        return {
          error: "회원가입 응답이 불완전합니다. 잠시 후 다시 시도해주세요.",
          success: false,
        };
      }

      // Update auth store
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

export function SignupForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    signupAction,
    {
      error: null,
      success: false,
    } as SignupFormState
  );

  const {
    register,
    handleSubmit,
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

  // Handle successful signup
  if (state.success) {
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );
    const next = params.get("next");
    const safeNext =
      next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

    if (typeof window !== "undefined") {
      router.push(safeNext as Route);
    }
  }

  const onSubmit = async (data: SignupSchema) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    await formAction(formData);
  };

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

      {state.error ? <div
          className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50"
          role="alert"
        >
          {state.error}
        </div> : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          disabled={isPending || !isFormFilled}
          className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base rounded-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? "회원가입 중..." : "회원가입"}
        </Button>
      </form>

      <SocialLoginButtons mode="signup" />
    </div>
  );
}
