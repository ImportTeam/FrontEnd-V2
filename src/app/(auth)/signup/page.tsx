"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, KakaoIcon } from "@/components/ui/icons";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
    return (
        <div 
            className="w-full h-full flex flex-col relative overflow-hidden bg-zinc-800 text-white rounded-[2rem]"
            style={{ transform: "rotateY(180deg)" }} // Correct orientation for back face
        >
            {/* Magnetic Strip */}
            <div className="w-full h-16 bg-black mt-8 mb-8" />

            <div className="px-8 pb-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-8 bg-white/20 rounded flex items-center justify-center text-xs text-white/50 font-mono">
                        CVC
                    </div>
                    <div className="text-right">
                        <h1 className="text-xl font-bold tracking-tight">SIGN UP</h1>
                        <p className="text-xs text-white/50">New Member Registration</p>
                    </div>
                </div>

                {/* Signature Panel Style Inputs */}
                <div className="bg-white/90 text-black p-6 rounded-lg space-y-4 shadow-inner mb-6 flex-1">
                    <div className="space-y-1">
                        <Label className="text-xs text-zinc-500 font-mono">FULL NAME</Label>
                        <Input 
                            className="bg-transparent border-0 border-b border-zinc-300 rounded-none px-0 h-8 focus-visible:ring-0 focus-visible:border-blue-500 placeholder:text-zinc-300 font-handwriting text-lg"
                            placeholder="Sign here..."
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs text-zinc-500 font-mono">EMAIL</Label>
                        <Input 
                            className="bg-transparent border-0 border-b border-zinc-300 rounded-none px-0 h-8 focus-visible:ring-0 focus-visible:border-blue-500 placeholder:text-zinc-300 font-mono"
                            placeholder="email@address.com"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs text-zinc-500 font-mono">PASSWORD</Label>
                        <Input 
                            type="password"
                            className="bg-transparent border-0 border-b border-zinc-300 rounded-none px-0 h-8 focus-visible:ring-0 focus-visible:border-blue-500 placeholder:text-zinc-300 font-mono"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wider shadow-lg">
                        CONFIRM REGISTRATION
                    </Button>

                    <div className="text-center">
                        <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors flex items-center justify-center gap-2 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
