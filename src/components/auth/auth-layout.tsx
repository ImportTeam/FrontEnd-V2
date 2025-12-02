"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const isSignup = pathname === "/signup";

    const handleSwitch = () => {
        router.push(isSignup ? "/login" : "/signup");
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-zinc-100 dark:bg-zinc-950 p-4 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
            
            {/* Main Container */}
            <div className="relative w-full max-w-[1200px] min-h-[700px] bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden flex">
                
                {/* Image Panel - Swaps sides based on route */}
                <motion.div 
                    layout
                    className={`relative w-1/2 h-full bg-zinc-900 overflow-hidden z-10 ${isSignup ? "order-2" : "order-1"}`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {/* Abstract/Collage Image Background */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-90 mix-blend-multiply" />
                        {/* Placeholder for the "Collage" effect - using CSS patterns for now */}
                        <div className="absolute inset-0 opacity-30" 
                             style={{ 
                                 backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 10%, transparent 10%)", 
                                 backgroundSize: "30px 30px" 
                             }} 
                        />
                        {/* Floating Circles/Shapes to mimic reference */}
                        <motion.div 
                            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-pink-500 blur-2xl opacity-50"
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                            transition={{ duration: 10, repeat: Infinity }}
                        />
                        <motion.div 
                            className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-blue-400 blur-2xl opacity-50"
                            animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
                            transition={{ duration: 12, repeat: Infinity }}
                        />
                    </div>

                    {/* Overlay Content */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-12 text-center">
                        <motion.div
                            key={isSignup ? "signup-text" : "login-text"}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <h2 className="text-4xl font-bold tracking-tight">
                                {isSignup ? "Welcome Back!" : "Join Us Today"}
                            </h2>
                            <p className="text-lg text-white/80 max-w-sm mx-auto">
                                {isSignup 
                                    ? "이미 계정이 있으신가요? 로그인하고 서비스를 이용해보세요." 
                                    : "새로운 경험을 시작할 준비가 되셨나요? 지금 가입하세요."}
                            </p>
                            <Button 
                                variant="outline" 
                                size="lg" 
                                onClick={handleSwitch}
                                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 transition-colors rounded-full px-8 mt-4"
                            >
                                {isSignup ? "로그인하기" : "회원가입하기"}
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Form Panel - Swaps sides based on route */}
                <motion.div 
                    layout
                    className={`w-1/2 h-full bg-white dark:bg-zinc-900 flex items-center justify-center p-12 z-0 ${isSignup ? "order-1" : "order-2"}`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
