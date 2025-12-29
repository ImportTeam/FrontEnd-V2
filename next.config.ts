import type { NextConfig } from "next";

const apiOrigin = (() => {
    try {
        const raw = process.env.NEXT_PUBLIC_API_URL;
        if (!raw) return "https://api.picsel.kr";
        return new URL(raw).origin;
    } catch {
        return "https://api.picsel.kr";
    }
})();

const nextConfig: NextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    compress: true,
    // Disable source maps in production to reduce bundle size
    productionBrowserSourceMaps: false,
    typescript: {
        ignoreBuildErrors: false,
    },
    experimental: {
        // CSS optimization for critical CSS extraction
        optimizeCss: true,
        optimizePackageImports: [
            "lucide-react",
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
        // Increase cache TTL to 1 year for better caching
        minimumCacheTTL: 31536000,
        dangerouslyAllowSVG: true,
        contentDispositionType: "attachment",
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    async headers() {
        return [
            // Cache static assets for 1 year
            {
                source: '/assets/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            },
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable'
                    }
                ]
            },
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
                        key: 'Cross-Origin-Resource-Policy',
                        value: 'same-site'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: `default-src 'self'; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://vercel.live; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' ${apiOrigin} https://vitals.vercel-insights.com https://va.vercel-scripts.com https://vercel.live; frame-ancestors 'self'; base-uri 'self'; form-action 'self';`
                    }
                ]
            }
        ];
    },
};

// eslint-disable-next-line no-restricted-syntax
export default nextConfig;
