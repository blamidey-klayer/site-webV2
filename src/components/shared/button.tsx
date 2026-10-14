import Link from "next/link";
import { cn } from "@/lib/cn";

type Theme = "white" | "outlined" | "teal" | "black";
type Size = "sm" | "md";

const THEMES: Record<Theme, string> = {
  white: "bg-white text-black font-medium hover:bg-gray-80",
  outlined: "border border-gray-40 bg-white/[0.02] text-white hover:border-white",
  teal: "bg-teal-400 text-black font-medium hover:bg-teal-300",
  black: "bg-black text-white font-medium hover:bg-gray-15",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-7 text-[15px] md:text-base",
};

export function Button({
  href,
  theme = "white",
  size = "md",
  className,
  children,
}: {
  href: string;
  theme?: Theme;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full tracking-extra-tight transition-colors duration-200",
        THEMES[theme],
        SIZES[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
