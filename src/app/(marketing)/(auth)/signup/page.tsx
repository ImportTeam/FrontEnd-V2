"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, KakaoIcon, NaverIcon } from "@/components/ui/icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Production Grade Imports
import { useAuthForm } from "@/hooks/use-auth-form";
import { signupSchema, SignupSchema } from "@/lib/schemas/auth";
import { useAuthStore } from "@/store/use-auth-store";

export default function SignupPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [isLoading, setIsLoading] = useState(false);

    // Custom Hook for Form Logic
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useAuthForm<SignupSchema>({
        schema: signupSchema,
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignupSchema) => {
        setIsLoading(true);
        // Simulate API Call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock Signup & Login
        login({
            id: "2",
            name: data.name,
            email: data.email,
        });
        
        setIsLoading(false);
        router.push("/dashboard");
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full space-y-12"
        >
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">회원가입</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                    새로운 계정을 만들어보세요.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-zinc-500">이름</Label>
                        <Input 
                            id="name"
                            type="text" 
                            placeholder="홍길동"
                            className="h-10 rounded-none border-0 border-b border-zinc-200 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 dark:border-zinc-700 dark:focus-visible:border-blue-400 placeholder:text-zinc-300"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-500">이메일</Label>
                        <Input 
                            id="email"
                            type="email" 
                            placeholder="name@example.com"
                            className="h-10 rounded-none border-0 border-b border-zinc-200 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 dark:border-zinc-700 dark:focus-visible:border-blue-400 placeholder:text-zinc-300"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-zinc-500">비밀번호</Label>
                        <Input 
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="h-10 rounded-none border-0 border-b border-zinc-200 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 dark:border-zinc-700 dark:focus-visible:border-blue-400 placeholder:text-zinc-300"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500">{errors.password.message}</p>
                        )}
                    </div>
                </div>

                <Button 
                    type="submit" 
                    disabled={isLoading || !isValid}
                    className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base rounded-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "가입 중..." : "회원가입"}
                </Button>
            </form>

            <div className="space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-zinc-100 dark:border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-400">또는 소셜 계정으로 가입</span>
                    </div>
                </div>

                <div className="flex gap-6 justify-center">
                    <Button variant="outline" className="w-12 h-12 rounded-full p-0 border-zinc-100 bg-white shadow-sm hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700 transition-transform hover:scale-110">
                        <GoogleIcon className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" className="w-12 h-12 rounded-full p-0 border-[#FEE500] bg-[#FEE500] shadow-sm hover:bg-[#FDD835] dark:border-[#FEE500] transition-transform hover:scale-110">
                        <KakaoIcon className="w-5 h-5 text-[#3A1D1D]" />
                    </Button>
                    <Button variant="outline" className="w-12 h-12 rounded-full p-0 border-[#03C75A] bg-[#03C75A] shadow-sm hover:bg-[#02b351] dark:border-[#03C75A] transition-transform hover:scale-110">
                        <NaverIcon className="w-4 h-4 text-white" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
