"use client";

import { AuthPageClient } from "@/components/auth/auth-page-client";

// eslint-disable-next-line no-restricted-syntax
export default function LoginPage() {
    return <AuthPageClient initialSignup={false} />;
}
