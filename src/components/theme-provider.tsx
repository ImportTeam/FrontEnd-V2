"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import * as React from "react"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NextThemesProvider {...props}>
      <div className={mounted ? "animate-fade-in-up transition-colors duration-500" : "invisible"}>
        {children}
      </div>
    </NextThemesProvider>
  )
}
