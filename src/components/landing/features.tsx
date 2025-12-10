export function Features() {
    return (
        <section id="features" className="py-20 overflow-hidden">
            <div className="container space-y-24">

                {/* Section 1: Image 0 - Text Left, Image Right */}
                <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
                    <div 
                        className="space-y-4 animate-fade-in-left"
                    >
                        <div className="space-y-4">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">주요 기능 소개</h2>
                            <div className="inline-block rounded-full bg-orange-100 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                                무료 브라우저 확장 프로그램
                            </div>
                        </div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight bg-clip-text text-transparent bg-linear-to-r from-orange-500 to-red-600">
                            <span className="sm:hidden">PicSel이 더 스마트하게 비교합니다.</span>
                            <span className="hidden sm:inline">온라인 결제 상품 결제 전,<br />PicSel이 더 스마트하게 비교합니다.</span>
                        </h3>
                        <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed hidden sm:block">
                            여러 결제 페이지에서 고민하지 마세요.<br />
                            PicSel이 카드 혜택부터 적립 혜택까지 자동 분석해,<br />
                            한눈에 가장 유리한 결제수단을 추천합니다.
                        </p>
                    </div>
                    <div
                        className="relative aspect-square lg:aspect-4/3 bg-zinc-200 dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-right"
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900" />
                    </div>
                </div>

                {/* Section 2: Image 3 - Image Left, Text Right */}
                <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
                    <div
                        className="order-2 lg:order-1 relative aspect-square lg:aspect-4/3 bg-zinc-200 dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-left"
                        style={{ animationDelay: '100ms' }}
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900" />
                    </div>
                    <div
                        className="order-1 lg:order-2 space-y-4 animate-fade-in-right"
                        style={{ animationDelay: '100ms' }}
                    >
                        <div className="inline-block rounded-full bg-blue-100 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            AI 기반 소비 분석 리포트
                        </div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                            <span className="sm:hidden">PicSel이 결제 데이터를 분석합니다.</span>
                            <span className="hidden sm:inline">매일 가격 확인도, 계산도 이제 그만.<br />PicSel이 당신의 결제 데이터를<br />자동으로 분석합니다.</span>
                        </h3>
                        <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed hidden sm:block">
                            PicSel은 카드와 간편결제 데이터를 실시간으로 분석해<br />
                            놓친 혜택, 절약 가능한 금액을 한눈에 보여드립니다.
                        </p>
                    </div>
                </div>

                {/* Section 3: Image 1 - Text Left, Image Right */}
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <div
                        className="space-y-4 animate-fade-in-left"
                        style={{ animationDelay: '200ms' }}
                    >
                        <div className="inline-block rounded-full bg-purple-100 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                            전 혜택 자동 추적 및 알림 기능
                        </div>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                            <span className="sm:hidden">놓치는 혜택 없이, <span className="text-purple-600 dark:text-purple-400">더 알뜰해집니다.</span></span>
                            <span className="hidden sm:inline">놓치는 혜택 없이,<br /><span className="text-purple-600 dark:text-purple-400">당신의 결제가 더 알뜰해집니다.</span></span>
                        </h3>
                        <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed hidden sm:block">
                            매월 제공되는 구독 혜택부터 은행 캐시백까지<br />
                            PicSel이 모든 카드·페이 혜택을 자동으로 추적합니다.
                        </p>
                    </div>
                    <div
                        className="relative aspect-square lg:aspect-4/3 bg-zinc-200 dark:bg-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-right"
                        style={{ animationDelay: '200ms' }}
                    >
                        <div className="absolute inset-0 bg-linear-to-br from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900" />
                    </div>
                </div>

            </div>
        </section>
    );
}
