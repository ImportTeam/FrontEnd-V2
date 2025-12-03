import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,
    typescript: {
        ignoreBuildErrors: false,
    },
    experimental: {
        optimizePackageImports: [
            "lucide-react", 
            "framer-motion", 
            "recharts",
            "@radix-ui/react-avatar",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch"
        ],
    },
    typedRoutes: true,
    turbopack: {
        // 명시적으로 현재 워크스페이스를 루트로 지정해 Turbopack 루트 추정 경고를 방지
        root: __dirname,
    },
};

export default nextConfig;
