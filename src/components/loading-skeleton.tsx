export function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg"
          />
        ))}
      </div>
      <div className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
    </div>
  );
}
