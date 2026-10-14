import { cn } from "@/lib/cn";

// Défilé infini : deux listes identiques translatées en boucle, fondues sur les bords.
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const list = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 animate-marquee items-center gap-x-20 pr-20"
    >
      {items.map((item) => (
        <li
          key={item}
          className="whitespace-nowrap font-mono text-[15px] uppercase tracking-wide text-gray-60"
        >
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("fade-x flex overflow-hidden", className)}>
      {list(false)}
      {list(true)}
    </div>
  );
}
