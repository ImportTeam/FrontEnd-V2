// eslint-disable-next-line no-restricted-syntax
export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="h-9 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-5 w-48 bg-zinc-100 dark:bg-zinc-900 rounded-md" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-36 bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
          <div className="h-10 w-40 bg-blue-100 dark:bg-blue-900/30 rounded-lg" />
        </div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card p-6 space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-8 w-8 bg-zinc-100 dark:bg-zinc-900 rounded-full" />
            </div>
            <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-20 bg-zinc-100 dark:bg-zinc-900 rounded" />
          </div>
        ))}
      </div>

      {/* Charts Section Skeleton */}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="col-span-full lg:col-span-4 rounded-2xl border border-border bg-card p-6">
          <div className="space-y-2 mb-6">
            <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-64 bg-zinc-100 dark:bg-zinc-900 rounded" />
          </div>
          <div className="h-75 bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
        </div>
        <div className="col-span-full lg:col-span-3 rounded-2xl border border-border bg-card p-6">
          <div className="space-y-2 mb-6">
            <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-56 bg-zinc-100 dark:bg-zinc-900 rounded" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Skeleton */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-10 w-10 bg-zinc-100 dark:bg-zinc-900 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-3 w-32 bg-zinc-100 dark:bg-zinc-900 rounded" />
              </div>
              <div className="h-5 w-20 bg-zinc-100 dark:bg-zinc-900 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
