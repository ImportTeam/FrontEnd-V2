import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleIcon, KakaoIcon } from "@/components/ui/icons";
import { Eye } from "lucide-react";
import Link from "next/link";

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
                                <Label htmlFor="name" className="font-semibold">Full Name</Label>
                                <Input 
                                    id="name" 
                                    placeholder="John Doe" 
                                    type="text" 
                                    className="h-12 rounded-lg border border-zinc-200 bg-white px-4 text-base focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent dark:bg-zinc-800 dark:border-zinc-700" 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="font-semibold">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="name@example.com"
                                    type="email"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    autoCorrect="off"
                                    className="h-12 rounded-lg border border-zinc-200 bg-white px-4 text-base focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent dark:bg-zinc-800 dark:border-zinc-700"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="font-semibold">Password</Label>
                                <div className="relative">
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="••••••••"
                                        className="h-12 rounded-lg border border-zinc-200 bg-white px-4 text-base focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent dark:bg-zinc-800 dark:border-zinc-700" 
                                    />
                                    <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="pt-2">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl text-base shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]">
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </form>
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-zinc-900 px-2 text-muted-foreground">
                                or continue with
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <Button variant="outline" size="icon" className="h-12 w-16 rounded-xl border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800">
                            <GoogleIcon className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-12 w-16 rounded-xl border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800">
                            <KakaoIcon className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="text-center text-sm text-muted-foreground mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                            Log in
                        </Link>
                    </div>
                </div>
        </AuthLayout>
    );
}
