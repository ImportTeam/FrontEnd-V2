"use client";

import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, KakaoIcon } from "@/components/ui/icons";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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
                className="w-full space-y-8"
            >
                <motion.div variants={item}>
                    <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">로그인</h1>
                    <p className="text-muted-foreground">
                        이메일과 비밀번호를 입력하여 로그인해주세요
                    </p>
                </motion.div>

                <div className="space-y-6">
                    <form className="space-y-5">
                        <motion.div variants={item} className="space-y-2.5">
                            <Label htmlFor="email" className="text-sm font-medium">이메일</Label>
                            <motion.div
                                whileFocus={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    className="h-12 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all"
                                />
                            </motion.div>
                        </motion.div>
                        <motion.div variants={item} className="space-y-2.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium">비밀번호</Label>
                                <Link
                                    href="#"
                                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                >
                                    비밀번호 찾기
                                </Link>
                            </div>
                            <motion.div
                                whileFocus={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="relative"
                            >
                                <Input 
                                    id="password" 
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="h-12 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all pr-12" 
                                />
                                <Button 
                                    type="button"
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </motion.div>
                        </motion.div>
                        <motion.div variants={item} className="pt-2">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 font-semibold text-base shadow-lg shadow-blue-600/30 group">
                                    로그인
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </motion.div>
                        </motion.div>
                    </form>

                    <motion.div variants={item} className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background/80 backdrop-blur-sm px-3 text-muted-foreground font-medium">
                                또는
                            </span>
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="grid grid-cols-2 gap-3">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button variant="outline" className="w-full h-12 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80">
                                <GoogleIcon className="mr-2 h-5 w-5" />
                                Google
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button variant="outline" className="w-full h-12 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80">
                                <KakaoIcon className="mr-2 h-5 w-5" />
                                Kakao
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div variants={item} className="text-center text-sm text-muted-foreground">
                        계정이 없으신가요?{" "}
                        <Link href="/signup" className="font-semibold text-primary hover:text-primary/80 transition-colors underline-offset-4 hover:underline">
                            회원가입
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </AuthLayout>
    );
}
