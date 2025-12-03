"use client";

import { cn } from "@/lib/utils";
import { CreditCard, Wifi } from "lucide-react";
import Image from "next/image";

interface CreditCardVisualProps {
  bankName: string;
  cardName: string;
  cardNumber: string; // Last 4 digits or masked
  colorFrom?: string;
  colorTo?: string;
  imageSrc?: string; // Path to the card image (e.g., /assets/card/shinhanCard.svg)
  logo?: React.ReactNode;
  className?: string;
  textColor?: string;
}

export function CreditCardVisual({
  bankName,
  cardName,
  cardNumber,
  colorFrom,
  colorTo,
  imageSrc,
  logo,
  className,
  textColor = "text-white",
}: CreditCardVisualProps) {
  return (
    <div
      className={cn(
        "relative aspect-[1.586] w-full overflow-hidden rounded-2xl shadow-xl transition-transform hover:scale-[1.02]",
        className
      )}
      style={
        !imageSrc
          ? {
              background: `linear-gradient(135deg, ${colorFrom || "#333"}, ${colorTo || "#000"})`,
            }
          : undefined
      }
    >
      {imageSrc ? (
        <div className="absolute inset-0 h-full w-full">
            <Image 
                src={imageSrc} 
                alt={cardName} 
                fill 
                className="object-cover"
                priority
            />
            {/* Overlay for text readability if needed, but usually card images have their own design */}
            {/* <div className="absolute inset-0 bg-black/10" /> */}
        </div>
      ) : (
        <>
            {/* Background Pattern for Gradient Cards */}
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-black/10 blur-3xl" />
        </>
      )}

      {/* Content Layer - Only show if no image, or if we want to overlay text on top of image (usually real card images have text, but maybe not the number) */}
      {/* For this request, assuming the SVG assets are full card designs, we might not need to overlay much, OR they are just logos. 
          Let's assume they are full card designs based on filenames like 'shinhanCard.svg'. 
          If they are full designs, we might just overlay the number if it's dynamic. 
          Let's keep the overlay minimal if image is present. */}
      
      <div className={cn("relative flex h-full flex-col justify-between z-10 p-6", textColor)}>
        {/* Header */}
        <div className="flex items-start justify-between">
          {!imageSrc && (
              <div className="space-y-1">
                <p className="text-xs font-medium opacity-80">{bankName}</p>
                <h3 className="font-bold tracking-wide">{cardName}</h3>
              </div>
          )}
          {/* If image is present, we might still want to show the logo if it's passed explicitly, but usually the image has it. */}
          {!imageSrc && (logo || <CreditCard className="h-6 w-6 opacity-80" />)}
        </div>

        {/* Chip & Contactless - Only for gradient cards */}
        {!imageSrc && (
            <div className="flex items-center gap-3">
            <div className="h-8 w-10 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500 shadow-sm" />
            <Wifi className="h-5 w-5 rotate-90 opacity-60" />
            </div>
        )}

        {/* Footer - Always show number if we want to simulate a real card with dynamic data */}
        <div className="flex items-end justify-between mt-auto">
          <p className="font-mono text-lg tracking-widest opacity-90 drop-shadow-md">
            **** **** **** {cardNumber}
          </p>
          {!imageSrc && <div className="h-6 w-10 rounded bg-white/20" />}
        </div>
      </div>
    </div>
  );
}
