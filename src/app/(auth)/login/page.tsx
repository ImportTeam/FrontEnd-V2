"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, KakaoIcon, NaverIcon } from "@/components/ui/icons";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full space-y-12"
        >
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">로그인</h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                    계정에 로그인하여 서비스를 이용하세요.
                </p>
            </div>

            <form className="space-y-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-500">이메일</Label>
                        <Input 
                            id="email"
                            type="email" 
                            placeholder="name@example.com"
                            className="h-10 rounded-none border-0 border-b border-zinc-200 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 dark:border-zinc-700 dark:focus-visible:border-blue-400 placeholder:text-zinc-300"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-zinc-500">비밀번호</Label>
                        <Input 
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="h-10 rounded-none border-0 border-b border-zinc-200 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-blue-600 dark:border-zinc-700 dark:focus-visible:border-blue-400 placeholder:text-zinc-300"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Link href="#" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                        비밀번호 찾기
                    </Link>
                </div>

                <Button className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base rounded-lg dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
                    로그인
                </Button>
            </form>

            <div className="space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-zinc-100 dark:border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-400">또는 소셜 로그인</span>
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
                        <NaverIcon className="w-5 h-5" style={{ color: "white", fill: "white" }} />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
