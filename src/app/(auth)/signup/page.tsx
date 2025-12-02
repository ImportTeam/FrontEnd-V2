import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, KakaoIcon } from "@/components/ui/icons";

export default function SignupPage() {
    return (
        <AuthLayout isSignup={true}>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">회원가입</h1>
                <p className="text-sm text-muted-foreground">
                    사용할 사용자 이름과 비밀번호 등을 알맞게 넣어주세요!
                </p>
            </div>
                <div className="grid gap-6">
                    <form>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="name">사용자 이름</Label>
                                <Input 
                                    id="name" 
                                    placeholder="홍길동" 
                                    type="text" 
                                    className="h-12 border-0 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:bg-secondary/80" 
                                />
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
                                    className="h-12 border-0 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:bg-secondary/80"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">비밀번호</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    placeholder="비밀번호를 입력해주세요"
                                    className="h-12 border-0 bg-secondary/50 focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:bg-secondary/80" 
                                />
                            </div>
                            <div className="pt-2">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 text-base shadow-md hover:shadow-lg transition-all">
                                    회원가입
                                </Button>
                            </div>
                        </div>
                    </form>
                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                또는 소셜 계정으로 회원가입
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-3">
                        <Button variant="outline" type="button" className="gap-2 h-12 border-border/50 hover:bg-secondary/50 hover:text-foreground transition-colors">
                            <GoogleIcon />
                            구글로 가입하기
                        </Button>
                        <Button variant="outline" type="button" className="gap-2 h-12 border-border/50 hover:bg-secondary/50 hover:text-foreground transition-colors">
                            <KakaoIcon className="text-[#3A1D1D] bg-[#FEE500] rounded p-0.5" />
                            카카오톡으로 가입하기
                        </Button>
                    </div>
                </div>
        </AuthLayout>
    );
}
