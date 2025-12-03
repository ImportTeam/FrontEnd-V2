import { Card, CardProps } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function DashboardCard({ className, ...props }: CardProps) {
  return (
    <Card 
      className={cn(
        "bg-card text-card-foreground border-0 shadow-sm", 
        className
      )} 
      {...props} 
    />
  );
}
