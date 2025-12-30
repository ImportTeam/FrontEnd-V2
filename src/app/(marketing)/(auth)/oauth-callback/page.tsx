import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { authClient } from "@/lib/api/clients/auth.server";
import { parseApiError } from "@/lib/api/error-handler";

/**
 * OAuth Callback Page
 * Server-side handler:
 * - Exchanges code for tokens through backend
 * - Saves tokens into HttpOnly cookies on this app domain
 * - Redirects to /dashboard
 */
async function saveTokensToCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 3600,
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 604800,
  });
}

type OAuthCallbackPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function OAuthCallbackPage(props: OAuthCallbackPageProps) {
  // Some backends finish OAuth server-side and redirect here without query params.
  // In that case, just trust the HttpOnly cookie and continue to the app.
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (accessToken) {
    redirect("/dashboard");
  }

  const searchParams = await props.searchParams;
  const providerRaw = searchParams.provider;
  const codeRaw = searchParams.code;
  const stateRaw = searchParams.state;
  const errorRaw = searchParams.error;

  const provider = Array.isArray(providerRaw) ? providerRaw[0] : providerRaw;
  const code = Array.isArray(codeRaw) ? codeRaw[0] : codeRaw;
  const state = Array.isArray(stateRaw) ? stateRaw[0] : stateRaw;
  const error = Array.isArray(errorRaw) ? errorRaw[0] : errorRaw;

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="flex-none w-full max-w-md min-w-72 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm break-keep">
          <h1 className="text-lg font-bold">소셜 로그인 오류</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <a
            href="/login"
            className="mt-4 inline-flex text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            로그인으로 돌아가기
          </a>
        </div>
      </div>
    );
  }

  if (!provider || !code) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="flex-none w-full max-w-md min-w-72 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm break-keep">
          <h1 className="text-lg font-bold">소셜 로그인 오류</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            콜백 파라미터가 누락되었습니다. 다시 시도해주세요.
          </p>
          <a
            href="/login"
            className="mt-4 inline-flex text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            로그인으로 돌아가기
          </a>
        </div>
      </div>
    );
  }

  try {
    const response = await authClient.oauthCallback(provider, code, state);
    await saveTokensToCookies(response.accessToken, response.refreshToken);
    redirect("/dashboard");
  } catch (err) {
    const details = parseApiError(err);
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="flex-none w-full max-w-md min-w-72 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm break-keep">
          <h1 className="text-lg font-bold">소셜 로그인 실패</h1>
          <p className="mt-2 text-sm text-muted-foreground">{details.message}</p>
          <a
            href="/login"
            className="mt-4 inline-flex text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            로그인으로 돌아가기
          </a>
        </div>
      </div>
    );
  }
}

export default OAuthCallbackPage;
