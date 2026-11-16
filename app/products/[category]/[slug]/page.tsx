import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { availableProducts, getCategory, getProduct, getProductHref } from "@/data/products";
import { diagrams } from "@/components/diagrams";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBanner } from "@/components/CtaBanner";
import { IconArrowRight, IconCheck, IconFile } from "@/components/icons";

/**
 * Product detail template — one page per *available* product in data/products.ts.
 * e.g. /products/design-ip/uart-controller
 */

type Params = { category: string; slug: string };

// Pre-render every available product at build time; unknown slugs return 404.
export const dynamicParams = false;
export function generateStaticParams(): Params[] {
  return availableProducts.map((p) => ({ category: p.categorySlug, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category, slug } = await params;
  const product = getProduct(category, slug);
  if (!product) return {};
  return pageMetadata({ title: product.name, description: product.summary, path: getProductHref(product) });
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { category, slug } = await params;
  const product = getProduct(category, slug);
  const cat = getCategory(category);
  if (!product || !cat || product.status !== "available") notFound();

  const Diagram = product.diagram ? diagrams[product.diagram] : null;
  const contactHref = (type: string) => `/contact?product=${product.slug}&type=${type}`;

  return (
    <>
      {/* ---------------- Header ---------------- */}
      <section className="bg-brand-black py-16 text-white sm:py-24">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/products" className="hover:text-brand-yellow">Products</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={`/products#${cat.slug}`} className="hover:text-brand-yellow">{cat.name}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">{product.shortName}</li>
            </ol>
          </nav>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">{product.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">{product.tagline}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <li key={t} className="rounded border border-white/15 px-2.5 py-1 text-xs text-white/80">{t}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={contactHref("datasheet")}>
              <IconFile className="h-4 w-4" /> Request Datasheet
            </ButtonLink>
            <ButtonLink href={contactHref("evaluation")} variant="outline-dark">
              Request Evaluation <IconArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ---------------- Overview + Features ---------------- */}
      <section className="bg-offwhite py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <SectionHeading eyebrow="Overview" title="Product overview" />
            <div className="mt-6 space-y-4 leading-relaxed text-ink-800">
              {product.overview?.map((para) => <p key={para.slice(0, 32)}>{para}</p>)}
            </div>
          </Reveal>
          <Reveal className="lg:col-span-3" delay={100}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-brand-black">Key features</h2>
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {product.features?.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-ink-900">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-yellow">
                      <IconCheck className="h-3.5 w-3.5 text-brand-black" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Block diagram ---------------- */}
      {Diagram && (
        <section className="bg-brand-black py-16 text-white sm:py-24">
          <div className="container-page">
            <Reveal>
              <SectionHeading tone="dark" eyebrow="Architecture" title="Block diagram" />
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10 bg-ink-900/60 p-4 sm:p-8">
                <div className="min-w-[640px]">
                  <Diagram />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------- Specs + Deliverables + Applications ---------------- */}
      <section className="bg-offwhite py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-5">
          {product.specs && (
            <Reveal className="lg:col-span-3">
              <SectionHeading eyebrow="Specifications" title="Technical specifications" />
              <div className="mt-8 overflow-hidden rounded-xl border border-black/10 bg-white">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">{product.name} specifications</caption>
                  <thead className="bg-brand-black text-white">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Parameter</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {product.specs.map((s) => (
                      <tr key={s.label} className="even:bg-offwhite">
                        <th scope="row" className="px-4 py-3 font-medium text-ink-900">{s.label}</th>
                        <td className="px-4 py-3 text-ink-800">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-ink-800">
                Values marked TBD are preliminary. Contact us for process-specific data.
              </p>
            </Reveal>
          )}

          <div className="space-y-12 lg:col-span-2">
            {product.deliverables && (
              <Reveal delay={100}>
                <SectionHeading eyebrow="Deliverables" title="What you get" />
                <ul className="mt-6 space-y-3">
                  {product.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-ink-900">
                      <IconFile className="h-5 w-5 shrink-0 text-ink-800" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {product.applications && (
              <Reveal delay={150}>
                <SectionHeading eyebrow="Applications" title="Where it fits" />
                <ul className="mt-6 flex flex-wrap gap-2">
                  {product.applications.map((a) => (
                    <li key={a} className="rounded-full bg-brand-black px-4 py-2 text-sm font-medium text-brand-yellow">
                      {a}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <CtaBanner
        title={`Evaluate the ${product.shortName}`}
        text="Request evaluation RTL and the full datasheet. Our engineers will follow up within one business day." // PLACEHOLDER: response-time promise
        href={contactHref("evaluation")}
        cta="Request Evaluation"
      />
    </>
  );
}
