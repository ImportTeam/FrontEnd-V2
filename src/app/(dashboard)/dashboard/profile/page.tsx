"use client";

import { Camera, User, Mail, Calendar, Shield, ChevronRight } from "lucide-react";
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

  const headerGradientClass = "bg-linear-to-r from-blue-500 to-indigo-600";
  const avatarGradientClass = "bg-linear-to-br from-blue-500 to-indigo-600";
  
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
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          프로필 설정
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          계정 정보를 관리하고 개인 설정을 변경하세요.
        </p>
      </div>

      {/* Profile Overview Card */}
      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className={`h-24 ${headerGradientClass}`} />
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-12">
            {/* Avatar */}
            <div className="relative group">
              <Avatar className="h-28 w-28 border-4 border-white dark:border-zinc-900 shadow-xl">
                <AvatarImage src="/placeholder-avatar.jpg" alt={name} />
                <AvatarFallback className={`text-4xl ${avatarGradientClass} text-white font-bold`}>
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white dark:bg-zinc-800 shadow-lg border-2 border-white dark:border-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left space-y-1 sm:mb-2">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{name}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{email}</p>
              {userProfile && (
                <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>가입: {new Date(userProfile.createdAt).toLocaleDateString('ko-KR')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5" />
                    <span className={userProfile.isVerified ? "text-green-600 dark:text-green-400" : ""}>
                      {userProfile.isVerified ? '✓ 인증됨' : '미인증'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Personal Info */}
        <Card className="lg:col-span-2 border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              개인 정보
            </CardTitle>
            <CardDescription>기본 프로필 정보를 수정합니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); void handleSave(); }}>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">이름</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-600" 
                  disabled={isLoading}
                  placeholder="이름을 입력하세요"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">이메일</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input 
                    id="email" 
                    value={email}
                    disabled 
                    className="h-11 pl-10 bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500" 
                  />
                </div>
                <p className="text-xs text-zinc-500">이메일은 변경할 수 없습니다.</p>
              </div>

              {userProfile?.settings && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-sm font-medium">통화</Label>
                    <Input 
                      id="currency" 
                      value={userProfile.settings.currencyPreference}
                      disabled 
                      className="h-11 bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="compareMode" className="text-sm font-medium">비교 모드</Label>
                    <Input 
                      id="compareMode" 
                      value={userProfile.settings.compareMode}
                      disabled 
                      className="h-11 bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500" 
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <Button 
                  type="submit"
                  disabled={isSaving || isLoading}
                  className="h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 disabled:opacity-50 font-medium"
                >
                  {isSaving ? "저장 중..." : "변경사항 저장"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-base">빠른 작업</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button 
              className="w-full flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors text-left group"
              onClick={() => alert("준비 중인 기능입니다.")}
            >
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">비밀번호 변경</span>
              <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <button 
              className="w-full flex items-center justify-between p-3 rounded-lg border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left group"
              onClick={handleDeleteAccount}
            >
              <span className="text-sm font-medium text-red-600 dark:text-red-400">계정 삭제</span>
              <ChevronRight className="h-4 w-4 text-red-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
