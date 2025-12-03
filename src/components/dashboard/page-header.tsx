import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <p className="text-sm md:text-base text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
