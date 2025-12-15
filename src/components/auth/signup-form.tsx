"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


import { AuthFormField } from "@/components/auth/auth-form-field";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { Button } from "@/components/ui/button";
import { useAuthForm } from "@/hooks/use-auth-form";
import { api } from "@/lib/api/client";
import { signupSchema } from "@/lib/schemas/auth";
import { useAuthStore } from "@/store/use-auth-store";

import type { SignupSchema } from "@/lib/schemas/auth";


export function SignupForm() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useAuthForm<typeof signupSchema>({
        schema: signupSchema,
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignupSchema) => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Real API call
            const response = await api.auth.signup(data.name, data.email, data.password);
            
            login({
                ...response.user,
                id: response.user.uuid
            });
            
            router.push("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "회원가입에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
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

            {error ? <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400" role="alert">
                    {error}
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
                    />
                    <AuthFormField
                        id="email"
                        label="이메일"
                        type="email"
                        placeholder="name@example.com"
                        registration={register("email")}
                        error={errors.email}
                    />
                    <AuthFormField
                        id="password"
                        label="비밀번호"
                        type="password"
                        placeholder="********"
                        registration={register("password")}
                        error={errors.password}
                    />
                </div>

                <Button 
                    type="submit" 
                    disabled={isLoading || !isValid}
                    className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base rounded-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "가입 중..." : "회원가입"}
                </Button>
            </form>

            <SocialLoginButtons mode="signup" />
        </div>
    );
}
