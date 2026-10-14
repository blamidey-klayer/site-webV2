import Link from "next/link";

export function Topbar() {
  return (
    <Link
      href="#customer-zero"
      className="group relative flex h-9 items-center justify-center overflow-hidden border-b border-gray-15 bg-gray-10 px-5 text-center"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/4 bg-[repeating-linear-gradient(90deg,transparent_0_7px,rgba(52,211,216,0.12)_7px_8px)] [mask-image:linear-gradient(90deg,#000,transparent)]"
      />
      <span
        aria-hidden
        className="absolute inset-y-0 right-0 w-1/4 bg-[repeating-linear-gradient(90deg,transparent_0_7px,rgba(52,211,216,0.12)_7px_8px)] [mask-image:linear-gradient(270deg,#000,transparent)]"
      />
      <span className="relative truncate text-[13px] tracking-extra-tight text-gray-80 transition-colors group-hover:text-white">
        Customer Zero : nos agents tournent chez nous avant de tourner chez vous
        <span className="ml-2 text-teal-400">→</span>
      </span>
    </Link>
  );
}
