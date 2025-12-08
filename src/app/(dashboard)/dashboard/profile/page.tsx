"use client";

import { Camera } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


// eslint-disable-next-line no-restricted-syntax
export default function ProfilePage() {
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
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="text-4xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400">K</AvatarFallback>
                    </Avatar>
                    <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full shadow-md">
                        <Camera className="h-4 w-4" />
                    </Button>
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">김픽셀</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">picsel_user@example.com</p>
                <div className="mt-6 w-full space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                        비밀번호 변경
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
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
                <form className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="nickname">닉네임</Label>
                        <Input id="nickname" defaultValue="김픽셀" className="bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">이메일</Label>
                        <Input id="email" defaultValue="picsel_user@example.com" disabled className="bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">휴대폰 번호</Label>
                        <Input id="phone" defaultValue="010-1234-5678" className="bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="bio">소개</Label>
                        <Input id="bio" placeholder="나를 소개하는 한 마디" className="bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700" />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            변경사항 저장
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
