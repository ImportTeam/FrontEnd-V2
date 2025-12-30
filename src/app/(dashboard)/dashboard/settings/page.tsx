"use client";

import { Bell, Moon, Shield, Smartphone, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { deleteUserSession, loadUserSessions } from "./actions";

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
      const sessionList = await loadUserSessions();
      setSessions(sessionList ?? []);
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
        const result = await deleteUserSession(seq);
        if (!result.success) {
          alert(result.error ?? "기기 로그아웃에 실패했습니다.");
          return;
        }
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
      {showDevices ? (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDevices(false)}
          role="presentation"
        >
          <Card 
            className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 w-full max-w-3xl max-h-screen-80 overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">기기 관리</CardTitle>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  현재 로그인된 기기 목록입니다. 의심스러운 기기가 있다면 즉시 로그아웃하세요.
                </p>
              </div>
              <button
                onClick={() => setShowDevices(false)}
                className="rounded-lg p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="overflow-y-auto flex-1 p-6">
              {isLoadingSessions ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-zinc-500">기기 정보를 불러오는 중...</p>
                </div>
              ) : sessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Smartphone className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-4" />
                  <p className="text-zinc-500">로그인된 기기가 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sessions.map((session, index) => (
                    <div
                      key={session.id}
                      className="group flex items-start gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/30 shrink-0">
                        <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {session.deviceInfo}
                          </p>
                          {index === 0 && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full">
                              현재 기기
                            </span>
                          )}
                        </div>
                        <div className="space-y-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                          <p>로그인: {new Date(session.createdAt).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                          <p>만료: {new Date(session.expiresAt).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900/50 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
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
      ) : null}
    </div>
  );
}
