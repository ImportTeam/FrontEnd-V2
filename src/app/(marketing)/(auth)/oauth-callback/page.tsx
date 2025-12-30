import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Legacy OAuth Callback Page
 * Redirects old query-param URLs (?provider=...) to new path-based URLs (/oauth-callback/[provider])
 */

type OAuthCallbackPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function LegacyOAuthCallbackPage(props: OAuthCallbackPageProps) {
  // Legacy: Redirect query param version to path-based version for cleaner URLs
  const searchParams = await props.searchParams;
  const providerRaw = searchParams.provider;
  const provider = Array.isArray(providerRaw) ? providerRaw[0] : providerRaw;

  if (provider) {
    const queryParts: string[] = [];
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "provider" && value) {
        const val = Array.isArray(value) ? value[0] : value;
        queryParts.push(`${key}=${encodeURIComponent(val)}`);
      }
    });
    const queryString = queryParts.join("&");
    if (queryString) {
      redirect(`/oauth-callback/${provider}?${queryString}`);
    } else {
      redirect(`/oauth-callback/${provider}`);
    }
  }

  // Some backends finish OAuth server-side and redirect here without query params.
  // In that case, just trust the HttpOnly cookie and continue to the app.
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (accessToken) {
    redirect("/dashboard");
  }

  // This page is for legacy redirect only. If no provider param, go to login.
  redirect("/login");
}

export default LegacyOAuthCallbackPage;
