"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, KakaoIcon } from "@/components/ui/icons";
import { Eye } from "lucide-react";
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
                <motion.div variants={item} className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Create an account</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email below to create your account
                    </p>
                </motion.div>

                <div className="grid gap-6">
                    <form>
                        <div className="grid gap-5">
                            <motion.div variants={item} className="grid gap-2">
                                <Label htmlFor="email" className="font-semibold">Your email</Label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    className="h-12 rounded-lg border border-zinc-200 bg-white px-4 text-base focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent dark:bg-zinc-800 dark:border-zinc-700"
                                />
                            </motion.div>
                            <motion.div variants={item} className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="font-semibold">Password</Label>
                                </div>
                                <div className="relative">
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="••••••••"
                                        className="h-12 rounded-lg border border-zinc-200 bg-white px-4 text-base focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent dark:bg-zinc-800 dark:border-zinc-700" 
                                    />
                                    <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </div>
                            </motion.div>
                            <motion.div variants={item} className="pt-2">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl text-base shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]">
                                    Get Started
                                </Button>
                            </motion.div>
                        </div>
                    </form>

                    <motion.div variants={item} className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-zinc-900 px-2 text-muted-foreground">
                                or continue with
                            </span>
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="flex gap-4 justify-center">
                        <Button variant="outline" size="icon" className="h-12 w-16 rounded-xl border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800">
                            <GoogleIcon className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-12 w-16 rounded-xl border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800">
                            <KakaoIcon className="h-5 w-5" />
                        </Button>
                    </motion.div>

                    <motion.div variants={item} className="text-center text-sm text-muted-foreground mt-4">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
                            Sign up
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </AuthLayout>
    );
}
