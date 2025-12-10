"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { LoginSchema } from "@/lib/schemas/auth";

import { AuthFormField } from "@/components/auth/auth-form-field";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { Button } from "@/components/ui/button";
import { useAuthForm } from "@/hooks/use-auth-form";
import { loginSchema } from "@/lib/schemas/auth";
import { useAuthStore } from "@/store/use-auth-store";


export function LoginForm() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useAuthForm<typeof loginSchema>({
        schema: loginSchema,
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginSchema) => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 800));
            
            login({
                id: "1",
                name: "Test User",
                email: data.email,
            });
            
            router.push("/dashboard");
        } catch (err) {
            setError(err instanceof Error ? err.message : "로그인에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
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

            {error ? <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400" role="alert">
                    {error}
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
                    />
                    <AuthFormField
                        id="password"
                        label="비밀번호"
                        type="password"
                        placeholder="••••••••"
                        registration={register("password")}
                        error={errors.password}
                    />
                </div>

                <div className="flex justify-end">
                    <Link 
                        href="#" 
                        className="text-xs text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors"
                    >
                        비밀번호 찾기
                    </Link>
                </div>

                <Button 
                    type="submit" 
                    disabled={isLoading || !isValid}
                    className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base rounded-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "로그인 중..." : "로그인"}
                </Button>
            </form>

            <SocialLoginButtons mode="login" />
        </div>
    );
}
