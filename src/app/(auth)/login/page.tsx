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
        <AuthLayout>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="w-full"
            >
                <motion.div variants={item} className="flex flex-col space-y-2 text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">로그인</h1>
                    <p className="text-sm text-muted-foreground">
                        이메일과 비밀번호를 입력하여 로그인해주세요
                    </p>
                </motion.div>

                <div className="grid gap-6">
                    <form>
                        <div className="grid gap-5">
                            <motion.div variants={item} className="grid gap-2">
                                <Label htmlFor="email">이메일 주소</Label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    className="h-12 border-0 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:bg-secondary/80"
                                />
                            </motion.div>
                            <motion.div variants={item} className="grid gap-2">
                                <Label htmlFor="password">비밀번호</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    placeholder="비밀번호를 입력해주세요"
                                    className="h-12 border-0 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:bg-secondary/80" 
                                />
                                <div className="flex justify-end">
                                    <Link
                                        href="#"
                                        className="text-sm font-medium text-primary hover:underline underline-offset-4"
                                    >
                                        비밀번호를 잊으셨나요?
                                    </Link>
                                </div>
                            </motion.div>
                            <motion.div variants={item} className="pt-2">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 text-base shadow-md hover:shadow-lg transition-all">
                                    로그인
                                </Button>
                            </motion.div>
                        </div>
                    </form>

                    <motion.div variants={item} className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                또는 소셜 계정으로 로그인
                            </span>
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="grid gap-3">
                        <Button variant="outline" type="button" className="gap-2 h-12 border-border/50 hover:bg-secondary/50 hover:text-foreground transition-colors">
                            <GoogleIcon />
                            구글로 로그인하기
                        </Button>
                        <Button variant="outline" type="button" className="gap-2 h-12 border-border/50 hover:bg-secondary/50 hover:text-foreground transition-colors">
                            <KakaoIcon className="text-[#3A1D1D] bg-[#FEE500] rounded p-0.5" />
                            카카오톡으로 로그인하기
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </AuthLayout>
    );
}
