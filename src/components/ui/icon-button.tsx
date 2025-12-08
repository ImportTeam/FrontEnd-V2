import { forwardRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { ButtonProps } from "@/components/ui/button";


export interface IconButtonProps extends ButtonProps {
  icon?: React.ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "ghost", size = "icon", children, icon, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "text-muted-foreground hover:text-foreground transition-colors",
          className
        )}
        {...props}
      >
        {icon || children}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
