import Link from "next/link";
import { site } from "@/data/site";
import { products, getProductHref } from "@/data/products";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-black text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo idSuffix="footer" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            Configurable, verified semiconductor design IP for next-generation SoCs.
          </p>
        </div>

        <div>
          <h2 className="eyebrow text-brand-yellow">Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/75 transition-colors hover:text-brand-yellow">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-brand-yellow">Products</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {products.map((p) =>
              p.status === "available" ? (
                <li key={p.slug}>
                  <Link href={getProductHref(p)} className="text-white/75 transition-colors hover:text-brand-yellow">
                    {p.shortName}
                  </Link>
                </li>
              ) : (
                <li key={p.slug} className="text-ink-muted">
                  {p.shortName} <span className="text-xs">(coming soon)</span>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-brand-yellow">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="text-white/75 transition-colors hover:text-brand-yellow">
                {site.email}
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-white/75 transition-colors hover:text-brand-yellow">
                Request an evaluation
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="container-page py-6 text-xs text-ink-muted">
          © 2026 Pineapplix. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
