import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, KakaoIcon } from "@/components/ui/icons";

export default function SignupPage() {
    return (
        <AuthLayout
            title="환영합니다!"
            subtitle="PicSel과 함께 스마트한 소비를 시작하세요."
            isSignup={true}
        >
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">회원가입</h1>
                <p className="text-sm text-muted-foreground">
                    사용할 사용자 이름과 비밀번호 등을 알맞게 넣어주세요!
                </p>
            </div>
            <div className="grid gap-6">
                <form>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">사용자 이름</Label>
                            <Input id="name" placeholder="홍길동" type="text" className="bg-muted/50" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">이메일 주소</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                className="bg-muted/50"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">비밀번호</Label>
                            <Input id="password" type="password" className="bg-muted/50" />
                        </div>
                        <Button className="w-full bg-slate-600 hover:bg-slate-700">회원가입</Button>
                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            다른 소셜 계정으로 회원가입하기
                        </span>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Button variant="outline" type="button" className="gap-2 h-12">
                        <GoogleIcon />
                        구글로 가입하기
                    </Button>
                    <Button variant="outline" type="button" className="gap-2 h-12">
                        <KakaoIcon className="text-[#3A1D1D] bg-[#FEE500] rounded p-0.5" />
                        카카오톡으로 가입하기
                    </Button>
                </div>
            </div>
        </AuthLayout>
    );
}
