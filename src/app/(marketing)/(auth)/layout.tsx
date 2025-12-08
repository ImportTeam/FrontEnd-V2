import { AuthLayout } from "@/components/auth/auth-layout";

// eslint-disable-next-line no-restricted-syntax
export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
