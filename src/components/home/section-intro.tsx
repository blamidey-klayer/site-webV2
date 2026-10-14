import { SectionLabel } from "@/components/shared/section-label";
import { cn } from "@/lib/cn";

// Motif d'ouverture de section : étiquette et grand numéro à gauche, titre en deux tons à
// droite, première ligne en retrait.
export function SectionIntro({
  label,
  index,
  title,
  subtitle,
  tone = "dark",
  className,
}: {
  label: string;
  index?: string;
  title: string;
  subtitle?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-0", className)}>
      <div className="flex flex-col justify-between gap-4">
        <SectionLabel tone={tone}>{label}</SectionLabel>
        {index && (
          <span
            aria-hidden
            className={cn(
              "hidden font-mono text-[8rem] leading-[0.8] tracking-tighter lg:block",
              tone === "dark" ? "text-gray-10" : "text-black/[0.06]",
            )}
          >
            {index}
          </span>
        )}
      </div>
      <h2
        className={cn(
          "max-w-[56rem] text-[2rem] font-normal leading-dense tracking-tighter md:text-[2.5rem] lg:indent-24 xl:text-5xl",
          tone === "dark" ? "text-white" : "text-black",
        )}
      >
        {title}{" "}
        {subtitle && (
          <span className={tone === "dark" ? "text-gray-50" : "text-gray-40"}>{subtitle}</span>
        )}
      </h2>
    </div>
  );
}
