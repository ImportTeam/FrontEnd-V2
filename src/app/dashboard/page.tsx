import { Button } from "@/components/ui/button";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { AIReportCard } from "@/components/dashboard/ai-report-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Download, Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">안녕하세요, 김픽셀님! 👋</h1>
                    <p className="text-muted-foreground mt-1">
                        오늘도 스마트한 소비 생활을 응원합니다.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        리포트 다운로드
                    </Button>
                    <Link href="/dashboard/cards">
                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            새 결제수단 추가
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-3">
                    <SummaryCards />
                </div>
                <div className="md:col-span-1">
                    <AIReportCard />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-col space-y-1.5 pb-4">
                        <h3 className="font-semibold leading-none tracking-tight">월간 절약 변화 추이</h3>
                        <p className="text-sm text-muted-foreground">AI가 분석한 지난 6개월간의 혜택 적용 내역입니다.</p>
                    </div>
                    <div className="h-[200px] flex items-center justify-center border rounded-md bg-muted/10 text-muted-foreground text-sm">
                        차트 영역 (Recharts 연동 필요)
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm h-full">
                        <div className="flex flex-col space-y-1.5 p-6 pb-2">
                            <h3 className="font-semibold leading-none tracking-tight">✨ AI 추천 결제 수단 TOP 3</h3>
                            <p className="text-sm text-muted-foreground">사용자의 소비 패턴을 분석하여 추천합니다.</p>
                        </div>
                        <div className="p-6 pt-0 space-y-4 mt-4">
                            <div className="flex items-center justify-between p-3 border rounded-lg bg-blue-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">1</div>
                                    <div>
                                        <p className="text-sm font-medium">현대카드 ZERO Edition2</p>
                                        <p className="text-xs text-muted-foreground">모든 가맹점 0.7% 할인</p>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">추천</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">2</div>
                                    <div>
                                        <p className="text-sm font-medium">삼성카드 taptap O</p>
                                        <p className="text-xs text-muted-foreground">쇼핑 7% 할인</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">3</div>
                                    <div>
                                        <p className="text-sm font-medium">신한카드 Mr.Life</p>
                                        <p className="text-xs text-muted-foreground">공과금 10% 할인</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RecentActivity />
        </div>
    );
}
