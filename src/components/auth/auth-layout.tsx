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
        <div className="flex min-h-screen w-full overflow-hidden bg-background">
            {/* Image Panel - 50% Width */}
            <motion.div
                layout
                className={`hidden lg:flex w-1/2 min-h-screen relative items-center justify-center overflow-hidden ${isSignup ? "order-2" : "order-1"} bg-[#393E44] dark:bg-[#2d3136]`}
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {/* Background Image / Placeholder */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-purple-900">
                     {/* Abstract Pattern */}
                     <div className="absolute inset-0 opacity-20" 
                          style={{ 
                              backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)", 
                              backgroundSize: "30px 30px" 
                          }} 
                     />
                     
                     {/* Animated Shapes */}
                     <motion.div 
                        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-500 blur-3xl opacity-40"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                     />
                     <motion.div 
                        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-400 blur-3xl opacity-40"
                        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
                        transition={{ duration: 12, repeat: Infinity }}
                     />
                </div>
                
                {/* Overlay Content */}
                <div className="relative z-10 p-12 text-center text-white max-w-lg">
                     <motion.div
                        key={isSignup ? "signup-text" : "login-text"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                     >
                         <h2 className="text-4xl font-bold mb-6">
                            {isSignup ? "Welcome Back!" : "Join Our Community"}
                         </h2>
                         <p className="text-lg mb-8 text-white/80 leading-relaxed">
                            {isSignup 
                                ? "이미 계정이 있으신가요? 로그인하고 PicSel의 스마트한 소비 분석을 경험하세요." 
                                : "PicSel과 함께 더 스마트한 소비 생활을 시작하세요. 지금 바로 가입하세요."}
                         </p>
                         <Button 
                            variant="outline" 
                            onClick={handleSwitch}
                            className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 rounded-full px-10 py-6 text-lg font-semibold transition-all hover:scale-105"
                         >
                            {isSignup ? "로그인하기" : "회원가입하기"}
                         </Button>
                     </motion.div>
                </div>
            </motion.div>

            {/* Form Panel - 50% Width */}
            <motion.div
                layout
                className={`w-full lg:w-1/2 min-h-screen flex items-center justify-center bg-background p-8 lg:p-16 ${isSignup ? "order-1" : "order-2"}`}
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="w-full max-w-md">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
