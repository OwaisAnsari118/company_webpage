"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { IconClose, IconMenu } from "./icons";

/** Sticky site header with desktop nav and an accessible mobile menu. */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-black/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo idSuffix="header" />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative text-sm font-medium transition-colors hover:text-brand-yellow ${
                    isActive(item.href) ? "text-brand-yellow" : "text-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/contact" className="hidden !py-2 sm:inline-flex">
            Contact Us
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-white/10 bg-brand-black md:hidden"
      >
        <ul className="container-page flex flex-col py-4">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`block rounded-md px-2 py-3 text-base font-medium ${
                  isActive(item.href) ? "text-brand-yellow" : "text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-3">
            <ButtonLink href="/contact" className="w-full">
              Contact Us
            </ButtonLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
