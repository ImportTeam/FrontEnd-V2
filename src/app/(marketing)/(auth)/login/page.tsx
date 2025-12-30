import { AuthPageClient } from "@/components/auth/auth-page-client";
import { getCurrentUser } from "@/lib/auth/current-user.server";
import { redirect } from "next/navigation";

// eslint-disable-next-line no-restricted-syntax
export default async function LoginPage() {
    const user = await getCurrentUser();
    if (user) {
        redirect("/dashboard");
    }

    return <AuthPageClient initialSignup={false} />;
}
