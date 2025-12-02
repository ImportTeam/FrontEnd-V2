import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
            {/* Background Gradient */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background" />

            <div className="container mx-auto px-4 flex flex-col items-center text-center">
                <div
                    className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500 mb-8 backdrop-blur-sm"
                >
                    <span className="mr-2 h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                    무료 브라우저 확장 프로그램
                </div>

                <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:leading-tight max-w-4xl mb-6">
                    결제 순간, 당신에게<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        가장 유리한 선택
                    </span>
                </h1>

                <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl mb-10 leading-relaxed">
                    PicSel은 카드와 간편결제 혜택을 실시간으로 분석해,<br className="hidden sm:block" />
                    한눈에 가장 유리한 결제 수단을 추천합니다.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row w-full sm:w-auto">
                    <Link href="#">
                        <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20">
                            확장 프로그램 설치
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base group border-zinc-700 hover:bg-zinc-800">
                            내 결제수단에 맞는 혜택
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                {/* UI Mockup / Visual */}
                <div className="mt-20 relative w-full max-w-5xl">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20" />
                    <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-xl p-2 shadow-2xl">
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-8 flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1 text-left space-y-4">
                                <div className="h-2 w-20 rounded-full bg-zinc-800" />
                                <div className="h-8 w-3/4 rounded-lg bg-zinc-800" />
                                <div className="h-4 w-1/2 rounded-lg bg-zinc-800" />
                                <div className="h-32 w-full rounded-xl bg-zinc-800/50 mt-4" />
                            </div>
                            <div className="w-full md:w-[400px] rounded-xl border border-zinc-700 bg-black p-6 shadow-xl transform md:-rotate-2 transition-transform hover:rotate-0">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-500">PicSel Analysis</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">신한</div>
                                            <div>
                                                <div className="text-sm font-medium text-white">Deep Dream</div>
                                                <div className="text-xs text-blue-400">최대 3.5% 적립</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-white">1,250원 절약</div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50 flex justify-between items-center opacity-60">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs">N</div>
                                            <div>
                                                <div className="text-sm font-medium text-white">네이버페이</div>
                                                <div className="text-xs text-zinc-400">기본 1% 적립</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-zinc-400">350원 절약</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
