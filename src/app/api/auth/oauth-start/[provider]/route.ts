import { NextResponse } from "next/server";

import { authClient } from "@/lib/api/clients/auth.server";
import { parseApiError } from "@/lib/api/error-handler";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ provider: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const log = logger.scope("OAUTH_START_ROUTE");

  try {
    const { provider } = await context.params;
    const url = new URL(request.url);
    const redirectUri = url.searchParams.get("redirect_uri") ?? "";

    if (!provider) {
      return NextResponse.json(
        { error: { message: "Missing provider" } },
        { status: 400 }
      );
    }

    if (!redirectUri) {
      return NextResponse.json(
        { error: { message: "Missing redirect_uri" } },
        { status: 400 }
      );
    }

    const { redirectUrl } = await authClient.startOAuth(provider, redirectUri);

    if (!redirectUrl) {
      return NextResponse.json(
        { error: { message: "OAuth redirectUrl not provided" } },
        { status: 502 }
      );
    }

    return NextResponse.json({ redirectUrl });
  } catch (err) {
    const details = parseApiError(err);
    log.error("OAuth start failed:", details);

    return NextResponse.json(
      { error: { message: details.message, type: details.type } },
      { status: details.statusCode && details.statusCode >= 400 ? details.statusCode : 500 }
    );
  }
}
