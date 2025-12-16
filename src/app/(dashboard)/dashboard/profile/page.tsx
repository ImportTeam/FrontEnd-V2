"use client";

import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api/client";
import { useAuthStore } from "@/store/use-auth-store";

import type { UserCurrentResponse } from "@/lib/api/types";

// eslint-disable-next-line no-restricted-syntax
export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const userName = user?.name || "사용자";
  const userEmail = user?.email || "user@example.com";
  const userInitial = userName.charAt(0).toUpperCase();
  
  const [userProfile, setUserProfile] = useState<UserCurrentResponse | null>(null);
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await api.users.getCurrent() as unknown as UserCurrentResponse;
        setUserProfile(profile);
        setName(profile.name || userName);
        setEmail(profile.email || userEmail);
        console.warn("[PROFILE] Loaded user profile:", profile);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    void loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.users.updateProfile({
        name,
        settings: {
          notificationEnabled: userProfile?.settings?.notificationEnabled ?? true,
          darkMode: userProfile?.settings?.darkMode ?? false,
          compareMode: userProfile?.settings?.compareMode ?? "AUTO",
          currencyPreference: userProfile?.settings?.currencyPreference ?? "KRW",
        }
      });
      alert("프로필이 저장되었습니다.");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("프로필 저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      try {
        await api.users.deleteAccount();
        window.location.href = "/";
      } catch (error) {
        console.error("Failed to delete account:", error);
        alert("계정 삭제에 실패했습니다.");
      }
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          내 프로필
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          개인정보를 확인하고 수정할 수 있습니다.
        </p>
    </div>

    <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        {/* Left Column: Avatar & Basic Info */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm h-fit">
            <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                    <Avatar className="h-32 w-32 border-4 border-white dark:border-zinc-800 shadow-lg">
                        <AvatarImage src="/placeholder-avatar.jpg" alt={name} />
                        <AvatarFallback className="text-4xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400">{userInitial}</AvatarFallback>
                    </Avatar>
                    <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full shadow-md">
                        <Camera className="h-4 w-4" />
                    </Button>
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{name}</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{email}</p>
                {userProfile ? <div className="mt-3 space-y-1 w-full text-left text-xs text-zinc-500">
                    <p>가입일: {new Date(userProfile.createdAt).toLocaleDateString('ko-KR')}</p>
                    <p>인증 상태: {userProfile.isVerified ? '✓ 인증됨' : '미인증'}</p>
                  </div> : null}
                <div className="mt-6 w-full space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => alert("준비 중인 기능입니다.")}
                    >
                        비밀번호 변경
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                      onClick={handleDeleteAccount}
                    >
                        계정 삭제
                    </Button>
                </div>
            </CardContent>
        </Card>

        {/* Right Column: Edit Form */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader>
                <CardTitle>기본 정보 수정</CardTitle>
                <CardDescription>서비스 이용에 필요한 기본 정보를 수정합니다.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); void handleSave(); }}>
                    <div className="grid gap-2">
                        <Label htmlFor="name">이름</Label>
                        <Input 
                          id="name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700" 
                          disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">이메일</Label>
                        <Input 
                          id="email" 
                          value={email}
                          disabled 
                          className="bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500" 
                        />
                    </div>
                    {userProfile?.settings ? <>
                        <div className="grid gap-2">
                            <Label htmlFor="currency">통화 선호도</Label>
                            <Input 
                              id="currency" 
                              value={userProfile.settings.currencyPreference}
                              disabled 
                              className="bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500" 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="compareMode">비교 모드</Label>
                            <Input 
                              id="compareMode" 
                              value={userProfile.settings.compareMode}
                              disabled 
                              className="bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500" 
                            />
                        </div>
                      </> : null}
                    <div className="flex justify-end pt-4">
                        <Button 
                          type="submit"
                          disabled={isSaving || isLoading}
                          className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                        >
                          {isSaving ? "저장 중..." : "변경사항 저장"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
