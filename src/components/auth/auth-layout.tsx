"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    const pathname = usePathname();
    const isSignup = pathname === "/signup";

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-zinc-100 dark:bg-zinc-950 p-4 [perspective:2000px] overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
            
            <motion.div
                initial={false}
                animate={{ rotateY: isSignup ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-full max-w-[480px] aspect-[1/1.4] [transform-style:preserve-3d]"
            >
                {/* Card Container */}
                <div className="absolute inset-0 w-full h-full rounded-[2rem] shadow-2xl bg-white dark:bg-zinc-900">
                    {/* Front Face (Login) Content Wrapper */}
                    <div className="w-full h-full">
                        {children}
                    </div>
                </div>

                {/* Back Face (Signup) - Simulated for the flip effect? 
                    Actually, since we are rotating the CONTAINER, the 'children' (which changes) 
                    needs to handle its own orientation if we want to support the 'flip' metaphor.
                    
                    If isSignup is true, the container is rotated 180deg.
                    The 'children' is now the Signup Page.
                    If Signup Page is just rendered normally, it will be mirrored.
                    So Signup Page MUST have 'rotateY(180deg)' to correct itself.
                */}
            </motion.div>
        </div>
    );
}
