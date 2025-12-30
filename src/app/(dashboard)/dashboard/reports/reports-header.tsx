import { CalendarDays, FileJson, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

type ReportsHeaderProps = {
  selectedMonth: string;
  isDownloading: boolean;
  hasTransactions: boolean;
  onMonthChange: (next: string) => void;
  onDownloadJSON: () => void;
  onDownloadCSV: () => void;
};

export function ReportsHeader(props: ReportsHeaderProps) {
  const {
    selectedMonth,
    isDownloading,
    hasTransactions,
    onMonthChange,
    onDownloadJSON,
    onDownloadCSV,
  } = props;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          소비 분석 리포트
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-1">
          <span className="hidden sm:inline">
            월별 소비 패턴과 절약 내역을 상세하게 분석해드립니다.
          </span>
          <span className="sm:hidden">월별 소비 패턴을 분석합니다.</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        <label className="relative inline-flex items-center">
          <span className="sr-only">월 선택</span>
          <CalendarDays className="pointer-events-none absolute left-3 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="h-9 sm:h-10 pl-9 pr-3 text-xs sm:text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/10 dark:focus-visible:ring-zinc-100/10"
          />
        </label>

        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm bg-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300"
          onClick={onDownloadJSON}
          disabled={isDownloading || !hasTransactions}
        >
          <FileJson className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">JSON</span>
          <span className="sm:hidden">JSON</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm bg-white dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300"
          onClick={onDownloadCSV}
          disabled={isDownloading || !hasTransactions}
        >
          <FileText className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">CSV</span>
          <span className="sm:hidden">CSV</span>
        </Button>
      </div>
    </div>
  );
}
