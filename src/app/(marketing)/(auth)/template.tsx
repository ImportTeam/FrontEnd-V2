"use client";

// eslint-disable-next-line no-restricted-syntax
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-fade-in-up">
        {children}
    </div>
  );
}
