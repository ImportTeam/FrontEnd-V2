import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <h1 className="text-[clamp(1.5rem,0.875rem+1vw,1.875rem)] font-bold tracking-tight text-foreground">
        {title}
      </h1>
      {description ? <p className="text-[clamp(0.875rem,0.75rem+0.25vw,1rem)] text-muted-foreground">
          {description}
        </p> : null}
    </div>
  );
}
