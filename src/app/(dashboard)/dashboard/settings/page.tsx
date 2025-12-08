"use client";

import { Bell, Moon, Shield, Smartphone } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          설정
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          앱의 환경설정을 변경할 수 있습니다.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-zinc-500" />
                    <CardTitle>화면 설정</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>다크 모드</Label>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            어두운 환경에서 눈의 피로를 줄여줍니다.
                        </p>
                    </div>
                    <Switch 
                        checked={theme === 'dark'}
                        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
                </div>
            </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-zinc-500" />
                    <CardTitle>알림 설정</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>혜택 알림</Label>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            맞춤형 카드 혜택 정보를 받아봅니다.
                        </p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>소비 리포트 알림</Label>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            매월 1일 월간 리포트 발행 알림을 받습니다.
                        </p>
                    </div>
                    <Switch defaultChecked />
                </div>
            </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-zinc-500" />
                    <CardTitle>보안 및 인증</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>2단계 인증</Label>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            로그인 시 추가 인증을 요구하여 보안을 강화합니다.
                        </p>
                    </div>
                    <Switch />
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label>기기 관리</Label>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            현재 로그인된 기기 목록을 확인합니다.
                        </p>
                    </div>
                    <Button variant="outline" size="sm">
                        <Smartphone className="mr-2 h-4 w-4" />
                        기기 목록 보기
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
