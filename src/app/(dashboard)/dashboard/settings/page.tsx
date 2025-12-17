"use client";

import { Bell, Moon, Shield, Smartphone, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { api } from "@/lib/api/client";

import type { SessionData } from "@/lib/api/types";

// eslint-disable-next-line no-restricted-syntax
export default function SettingsPage() {
  const { setTheme, theme } = useTheme();
  const [showDevices, setShowDevices] = useState(false);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    if (!showDevices) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDevices(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showDevices]);

  const loadSessions = async () => {
    setIsLoadingSessions(true);
    try {
      const sessionList = await api.users.getSessions() as unknown as SessionData[];
      setSessions(sessionList);
      console.warn("[SETTINGS] Sessions loaded:", sessionList);
    } catch (error) {
      console.error("Failed to load sessions:", error);
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const handleLogoutSession = async (seq: string | number) => {
    if (window.confirm("이 기기에서 로그아웃하시겠습니까?")) {
      try {
        await api.users.deleteSession(seq);
        setSessions(prev => prev.filter(s => s.id !== seq));
        console.warn("[SETTINGS] Session deleted:", seq);
      } catch (error) {
        console.error("Failed to logout session:", error);
        alert("기기 로그아웃에 실패했습니다.");
      }
    }
  };

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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setShowDevices(true);
                        void loadSessions();
                      }}
                    >
                        <Smartphone className="mr-2 h-4 w-4" />
                        기기 목록 보기
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>

      {/* Device Management Modal */}
      {showDevices && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDevices(false)}
          role="presentation"
        >
          <Card 
            className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <CardTitle>기기 관리</CardTitle>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  현재 로그인된 기기에서 로그아웃할 수 있습니다.
                </p>
              </div>
              <button
                onClick={() => setShowDevices(false)}
                className="rounded-md text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="overflow-y-auto flex-1 p-6">
              {isLoadingSessions ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-zinc-500">기기 정보를 불러오는 중...</p>
                </div>
              ) : sessions.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-zinc-500">로그인된 기기가 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <Smartphone className="h-6 w-6 text-zinc-400" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-zinc-900 dark:text-zinc-100">
                            {session.deviceInfo}
                          </p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            로그인: {new Date(session.createdAt).toLocaleString('ko-KR')}
                          </p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            만료: {new Date(session.expiresAt).toLocaleString('ko-KR')}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 ml-2 shrink-0"
                        onClick={() => void handleLogoutSession(session.id)}
                      >
                        로그아웃
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
