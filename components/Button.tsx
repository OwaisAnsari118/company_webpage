import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline-dark" | "outline-light" | "dark";

const variants: Record<Variant, string> = {
  // yellow fill — the main call to action
  primary: "bg-brand-yellow text-brand-black hover:bg-[#ffe14d] shadow-[0_0_0_0_rgba(243,212,50,0)] hover:shadow-[0_0_24px_-4px_rgba(243,212,50,0.6)]",
  // for use on black sections
  "outline-dark": "border border-white/25 text-white hover:border-brand-yellow hover:text-brand-yellow",
  // for use on light sections
  "outline-light": "border border-brand-black/20 text-brand-black hover:border-brand-black hover:bg-brand-black hover:text-white",
  dark: "bg-brand-black text-white hover:bg-ink-800",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-offset-4";

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
