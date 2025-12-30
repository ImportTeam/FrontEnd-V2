import { Button } from "@/components/ui/button";
import { GoogleIcon, KakaoIcon, NaverIcon } from "@/components/ui/icons";
import { logger } from "@/lib/logger";

interface SocialLoginButtonsProps {
  mode: "login" | "signup";
}

export function SocialLoginButtons({ mode }: SocialLoginButtonsProps) {
  // const actionText = mode === "login" ? "로그인" : "가입";
  const log = logger.scope("SOCIAL_LOGIN");

  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.picsel.kr/api").replace(/\/$/, "");
  const callbackUrl = typeof window !== "undefined" ? `${window.location.origin}/oauth-callback` : "";

  const handleSocialLogin = (provider: "google" | "kakao" | "naver") => {
    // Log for debugging
    log.info(`Starting ${provider} login`);
    log.debug("Callback URL:", callbackUrl);
    
    // POST /api/auth/{provider}?redirect_uri={callback_url}
    const authUrl = new URL(`${apiBaseUrl}/auth/${provider}`);
    authUrl.searchParams.append("redirect_uri", callbackUrl);
    
    log.debug("Auth URL:", authUrl.toString());
    window.location.href = authUrl.toString();
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-100 dark:border-zinc-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-400">
            또는 소셜 {mode === "login" ? "로그인" : "계정으로 가입"}
          </span>
        </div>
      </div>

      <div className="flex gap-6 justify-center">
        <Button
          type="button"
          variant="outline"
          className="w-12 h-12 rounded-full p-0 border-zinc-100 bg-white shadow-sm hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700 transition-transform hover:scale-110"
          onClick={() => handleSocialLogin("google")}
          aria-label="Google로 계속하기"
        >
          <GoogleIcon className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-12 h-12 rounded-full p-0 border-[#FEE500] bg-[#FEE500] shadow-sm hover:bg-[#FDD835] dark:border-[#FEE500] transition-transform hover:scale-110"
          onClick={() => handleSocialLogin("kakao")}
          aria-label="카카오로 계속하기"
        >
          <KakaoIcon className="w-5 h-5 text-[#3A1D1D]" />
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-12 h-12 rounded-full p-0 border-[#03C75A] bg-[#03C75A] shadow-sm hover:bg-[#02b351] dark:border-[#03C75A] transition-transform hover:scale-110"
          onClick={() => handleSocialLogin("naver")}
          aria-label="네이버로 계속하기"
        >
          <NaverIcon className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
}
