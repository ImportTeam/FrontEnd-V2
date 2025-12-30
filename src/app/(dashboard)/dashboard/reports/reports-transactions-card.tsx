import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { TransactionListItem } from "@/lib/api/types";

type ReportsTransactionsCardProps = {
  selectedMonth: string;
  transactions: TransactionListItem[];
};

export function ReportsTransactionsCard(props: ReportsTransactionsCardProps) {
  const { selectedMonth, transactions } = props;

  return (
    <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
          상세 지출 내역 ({transactions.length}건)
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          {selectedMonth} 월간 거래 내역
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        {transactions.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-zinc-500">해당 기간에 거래 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 shrink-0 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    {tx.category?.[0]?.toUpperCase() || "거"}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm sm:text-base text-zinc-900 dark:text-zinc-100 truncate">
                      {tx.merchantName}
                    </p>
                    <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(tx.transactionAt).toLocaleString("ko-KR")}
                    </p>
                    <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                      {tx.category}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                    -{(tx.paidAmount || 0).toLocaleString()}원
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                    {tx.paymentMethodName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
