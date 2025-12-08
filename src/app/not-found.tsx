import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        {/* 404 Number */}
        <h1 className="text-[120px] font-bold leading-none text-zinc-200 dark:text-zinc-800 select-none">
          404
        </h1>
        
        {/* Message */}
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="mt-2 text-muted-foreground">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        
        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Button asChild variant="outline">
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">대시보드로 이동</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
