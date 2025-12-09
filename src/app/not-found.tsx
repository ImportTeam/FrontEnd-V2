import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

// eslint-disable-next-line no-restricted-syntax
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center bg-background px-4 text-center">
        <div className="space-y-4">
            {/* 404 Number */}
            <h1 className="text-[100px] sm:text-[150px] font-black leading-none text-zinc-200 dark:text-zinc-800 select-none">
            404
            </h1>
            
            {/* Message */}
            <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                페이지를 찾을 수 없습니다
                </h2>
                <p className="text-muted-foreground max-w-[500px] mx-auto">
                요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.<br className="hidden sm:block" />
                입력하신 주소가 정확한지 다시 한번 확인해 주세요.
                </p>
            </div>
            
            {/* Actions */}
            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8">
                    <Link href="/">홈으로 돌아가기</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8">
                    <Link href="/dashboard">대시보드</Link>
                </Button>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
