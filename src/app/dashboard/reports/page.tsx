import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";

export default function ReportsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">소비 분석 리포트</h1>
                    <p className="text-muted-foreground">
                        AI가 분석한 월간 소비 패턴과 절약 인사이트입니다.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        공유하기
                    </Button>
                    <Button size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        PDF 다운로드
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>월간 절약 요약</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/10 text-muted-foreground">
                            월간 절약 그래프 (Recharts)
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>💡 AI 인사이트</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                            <h4 className="font-semibold text-blue-900 mb-1">네이버페이 포인트 적립 기회</h4>
                            <p className="text-sm text-blue-700">
                                지난달 무신사 결제 시 네이버페이를 사용했다면 약 3,400원을 더 적립할 수 있었습니다.
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                            <h4 className="font-semibold text-green-900 mb-1">배달앱 할인 카드 추천</h4>
                            <p className="text-sm text-green-700">
                                배달의민족 이용 빈도가 높습니다. '삼성카드 taptap O'를 사용하면 월 최대 5,000원 할인이 가능합니다.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>카테고리별 지출</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-center justify-center border rounded-md bg-muted/10 text-muted-foreground">
                            파이 차트 (Recharts)
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
