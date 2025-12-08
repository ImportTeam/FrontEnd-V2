import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,
    productionBrowserSourceMaps: true,
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
    images: {
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 60,
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self';"
                    }
                ]
            }
        ];
    },
};

// eslint-disable-next-line no-restricted-syntax
export default nextConfig;
