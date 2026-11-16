import Link from "next/link";
import { getProductHref, type Product } from "@/data/products";
import { IconArrowRight, IconChip } from "./icons";

/** Product tile used on the home page and /products grid. */
export function ProductCard({ product, tone = "light" }: { product: Product; tone?: "light" | "dark" }) {
  const available = product.status === "available";
  const dark = tone === "dark";

  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ${
            available ? "bg-brand-yellow text-brand-black" : dark ? "bg-ink-800 text-ink-muted" : "bg-black/5 text-ink-800"
          }`}
        >
          <IconChip className="h-6 w-6" />
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            available
              ? "bg-brand-black text-brand-yellow ring-1 ring-brand-yellow/40"
              : dark
                ? "bg-ink-800 text-white/70"
                : "bg-black/5 text-ink-800"
          }`}
        >
          {available ? "Available" : "Coming soon"}
        </span>
      </div>
      <h3 className={`mt-6 text-xl font-bold ${dark ? "text-white" : "text-brand-black"}`}>{product.name}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-ink-muted" : "text-ink-800"}`}>{product.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {product.tags.map((t) => (
          <li
            key={t}
            className={`rounded border px-2 py-0.5 text-xs ${dark ? "border-white/15 text-white/70" : "border-black/10 text-ink-800"}`}
          >
            {t}
          </li>
        ))}
      </ul>
      {available && (
        <span className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${dark ? "text-brand-yellow" : "text-brand-black"}`}>
          View details
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      )}
    </>
  );

  const shell = `group relative flex h-full flex-col rounded-xl border p-6 transition-all duration-300 ${
    dark ? "border-white/10 bg-ink-900" : "border-black/10 bg-white"
  }`;

  if (!available) {
    return <article className={`${shell} ${dark ? "" : "opacity-80"} border-dashed`}>{body}</article>;
  }

  return (
    <article className={`${shell} hover:-translate-y-1 hover:border-brand-yellow hover:shadow-[0_12px_40px_-12px_rgba(243,212,50,0.35)]`}>
      {/* Whole card is clickable via the stretched link on the title */}
      <Link href={getProductHref(product)} className="absolute inset-0 z-10 rounded-xl" aria-label={`${product.name} — view details`} />
      {body}
    </article>
  );
}
