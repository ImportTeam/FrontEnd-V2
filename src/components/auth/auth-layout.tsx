"use client";

import { motion } from "framer-motion";
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
            <div className="relative w-full max-w-[1000px] min-h-[600px] bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden flex">
                
                {/* Form Section - Slides Left/Right */}
                <motion.div 
                    className="flex-1 flex items-center justify-center p-8 z-10"
                    initial={false}
                    animate={{ 
                        x: isSignup ? "100%" : "0%",
                        opacity: 1 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </motion.div>

                {/* Overlay Section - Slides Right/Left */}
                <motion.div 
                    className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex flex-col items-center justify-center p-12 text-center z-20"
                    initial={false}
                    animate={{ 
                        x: isSignup ? "0%" : "100%" 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <motion.div
                        key={isSignup ? "signup-overlay" : "login-overlay"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h2 className="text-4xl font-bold">
                            {isSignup ? "Welcome Back!" : "Hello, Friend!"}
                        </h2>
                        <p className="text-lg text-blue-100">
                            {isSignup 
                                ? "이미 계정이 있으신가요?\n로그인하고 혜택을 확인하세요." 
                                : "아직 계정이 없으신가요?\n가입하고 스마트한 소비를 시작하세요."}
                        </p>
                        <Button 
                            variant="outline" 
                            size="lg" 
                            onClick={handleSwitch}
                            className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 transition-colors mt-8 rounded-full px-8 text-lg font-semibold"
                        >
                            {isSignup ? "로그인하기" : "회원가입하기"}
                        </Button>
                    </motion.div>

                    {/* Decorative Circles */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-white blur-3xl" />
                        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-purple-400 blur-3xl" />
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
