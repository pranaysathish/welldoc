import React from "react";
import { cn } from "@/lib/utils";

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex h-10 px-6 py-2 items-center justify-center rounded-xl font-medium text-white transition-all duration-300 hover:scale-105",
        "bg-gradient-to-r from-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500",
        "bg-[length:400%_100%] animate-gradient-x",
        "shadow-lg hover:shadow-xl",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
