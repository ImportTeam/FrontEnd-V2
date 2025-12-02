"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, KakaoIcon, NaverIcon } from "@/components/ui/icons";
import { motion } from "framer-motion";

export default function SignupPage() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full space-y-8"
        >
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">회원가입</h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    PicSel과 함께 스마트한 소비를 시작하세요.
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
                    <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">Or register with email</span>
                </div>
            </div>

            <form className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input 
                        id="name"
                        type="text" 
                        placeholder="홍길동"
                        className="h-12 bg-zinc-50 border-zinc-200 focus:ring-blue-500 dark:bg-zinc-800/50 dark:border-zinc-800"
                    />
                </div>
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
                    <Label htmlFor="password">비밀번호</Label>
                    <Input 
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="h-12 bg-zinc-50 border-zinc-200 focus:ring-blue-500 dark:bg-zinc-800/50 dark:border-zinc-800"
                    />
                </div>

                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-600/20 mt-4">
                    계정 만들기
                </Button>
            </form>
        </motion.div>
    );
}
