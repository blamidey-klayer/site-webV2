import { cn } from "@/lib/cn";

export function SectionLabel({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs font-medium uppercase leading-none tracking-wide",
        tone === "dark" ? "text-gray-70" : "text-gray-40",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("size-1.5", tone === "dark" ? "bg-teal-400" : "bg-teal-brand")}
      />
      {children}
    </span>
  );
}
