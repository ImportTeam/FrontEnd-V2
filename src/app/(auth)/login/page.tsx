"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, KakaoIcon } from "@/components/ui/icons";
import { motion } from "framer-motion";

export default function LoginPage() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <AuthLayout
            title="가입하여 시작해보세요!"
            subtitle="혹시 계정이 이미 있으신가요?"
        >
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="w-full"
            >
                <motion.div variants={item} className="flex flex-col space-y-2 text-center mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">로그인</h1>
                    <p className="text-sm text-muted-foreground">
                        이메일과 비밀번호를 입력하여 로그인해주세요
                    </p>
                </motion.div>

                <div className="grid gap-6">
                    <form>
                        <div className="grid gap-4">
                            <motion.div variants={item} className="grid gap-2">
                                <Label htmlFor="email">이메일 주소</Label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    className="bg-muted/50"
                                />
                            </motion.div>
                            <motion.div variants={item} className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">비밀번호</Label>
                                    <Link
                                        href="#"
                                        className="text-sm font-medium text-primary hover:underline"
                                    >
                                        비밀번호를 잊으셨나요?
                                    </Link>
                                </div>
                                <Input id="password" type="password" className="bg-muted/50" />
                            </motion.div>
                            <motion.div variants={item}>
                                <Button className="w-full bg-slate-600 hover:bg-slate-700">로그인</Button>
                            </motion.div>
                        </div>
                    </form>

                    <motion.div variants={item} className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                다른 소셜 계정으로 로그인하기
                            </span>
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="grid gap-2">
                        <Button variant="outline" type="button" className="gap-2 h-12">
                            <GoogleIcon />
                            구글로 로그인하기
                        </Button>
                        <Button variant="outline" type="button" className="gap-2 h-12">
                            <KakaoIcon className="text-[#3A1D1D] bg-[#FEE500] rounded p-0.5" />
                            카카오톡으로 로그인하기
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </AuthLayout>
    );
}
