"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, KakaoIcon, NaverIcon } from "@/components/ui/icons";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full space-y-8"
        >
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">로그인</h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    PicSel에 오신 것을 환영합니다.
                </p>
            </div>

            <div className="flex gap-4 justify-center">
                <Button variant="outline" className="w-12 h-12 rounded-full p-0 border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
                    <GoogleIcon className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="w-12 h-12 rounded-full p-0 border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
                    <KakaoIcon className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="w-12 h-12 rounded-full p-0 border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
                    <NaverIcon className="w-4 h-4" />
                </Button>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">Or login with email</span>
                </div>
            </div>

            <form className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input 
                        id="email"
                        type="email" 
                        placeholder="name@example.com"
                        className="h-12 bg-zinc-50 border-zinc-200 focus:ring-blue-500 dark:bg-zinc-800/50 dark:border-zinc-800"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password">비밀번호</Label>
                        <Link href="#" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                            비밀번호를 잊으셨나요?
                        </Link>
                    </div>
                    <div className="relative">
                        <Input 
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-12 bg-zinc-50 border-zinc-200 focus:ring-blue-500 dark:bg-zinc-800/50 dark:border-zinc-800 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-600/20">
                    로그인
                </Button>
            </form>
        </motion.div>
    );
}
