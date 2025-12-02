"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, KakaoIcon } from "@/components/ui/icons";
import { Eye, EyeOff, ArrowRight, CreditCard } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full h-full flex flex-col p-8 relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 text-white rounded-[2rem]">
            {/* Credit Card Decor - Front */}
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <CreditCard className="w-64 h-64" />
            </div>
            
            {/* Chip */}
            <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-yellow-200 to-yellow-500 mb-8 shadow-inner border border-yellow-600/30 flex items-center justify-center">
                <div className="w-12 h-8 border border-yellow-700/30 rounded opacity-50" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center space-y-6">
                <div>
                    <h1 className="text-2xl font-mono tracking-widest mb-1 text-white/90">PICSEL CARD</h1>
                    <p className="text-white/50 text-sm">MEMBER LOGIN</p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-xs text-white/70 font-mono">EMAIL ADDRESS</Label>
                        <Input 
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/30 font-mono h-12 backdrop-blur-sm focus:bg-white/20 transition-all"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <Label className="text-xs text-white/70 font-mono">PASSWORD</Label>
                            <Link href="#" className="text-xs text-blue-300 hover:text-blue-200">Forgot?</Link>
                        </div>
                        <div className="relative">
                            <Input 
                                type={showPassword ? "text" : "password"}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/30 font-mono h-12 backdrop-blur-sm focus:bg-white/20 transition-all pr-10"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wider shadow-lg shadow-blue-900/50 mt-4">
                        ACCESS ACCOUNT
                    </Button>
                </form>

                <div className="space-y-4">
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
                            <GoogleIcon className="mr-2 h-4 w-4" /> Google
                        </Button>
                        <Button variant="outline" className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white">
                            <KakaoIcon className="mr-2 h-4 w-4" /> Kakao
                        </Button>
                    </div>

                    <div className="text-center">
                        <Link href="/signup" className="text-sm text-white/60 hover:text-white transition-colors flex items-center justify-center gap-2 group">
                            Create new account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
