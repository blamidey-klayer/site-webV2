import { cn } from "@/lib/cn";

type Size = "1600" | "1920";

const SIZES: Record<Size, string> = {
  "1600": "max-w-[1600px]",
  "1920": "max-w-[1856px]",
};

export function Container({
  size = "1600",
  className,
  children,
}: {
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative mx-auto w-full px-5 md:px-8", SIZES[size], className)}>
      {children}
    </div>
  );
}
