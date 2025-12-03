"use client";

import { cn } from "@/lib/utils";
import { CreditCard, Wifi } from "lucide-react";

interface CreditCardVisualProps {
  bankName: string;
  cardName: string;
  cardNumber: string; // Last 4 digits or masked
  colorFrom: string;
  colorTo: string;
  logo?: React.ReactNode;
  className?: string;
}

export function CreditCardVisual({
  bankName,
  cardName,
  cardNumber,
  colorFrom,
  colorTo,
  logo,
  className,
}: CreditCardVisualProps) {
  return (
    <div
      className={cn(
        "relative aspect-[1.586] w-full overflow-hidden rounded-2xl p-6 text-white shadow-xl transition-transform hover:scale-[1.02]",
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
      }}
    >
      {/* Background Pattern */}
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-black/10 blur-3xl" />

      <div className="relative flex h-full flex-col justify-between z-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium opacity-80">{bankName}</p>
            <h3 className="font-bold tracking-wide">{cardName}</h3>
          </div>
          {logo || <CreditCard className="h-6 w-6 opacity-80" />}
        </div>

        {/* Chip & Contactless */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-10 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500 shadow-sm" />
          <Wifi className="h-5 w-5 rotate-90 opacity-60" />
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between">
          <p className="font-mono text-lg tracking-widest opacity-90">
            **** **** **** {cardNumber}
          </p>
          <div className="h-6 w-10 rounded bg-white/20" /> {/* Mastercard/Visa logo placeholder */}
        </div>
      </div>
    </div>
  );
}
