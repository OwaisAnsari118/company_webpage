import { pageMetadata } from "@/lib/seo";
import { featuredProduct, getProductHref } from "@/data/products";
import { ButtonLink } from "@/components/Button";
import { CircuitBackground } from "@/components/CircuitBackground";
import { FeatureCard } from "@/components/FeatureCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBanner } from "@/components/CtaBanner";
import { IconArrowRight, IconCheck, IconPuzzle, IconShieldCheck, IconSliders, IconSupport } from "@/components/icons";

export const metadata = pageMetadata({
  description:
    "Pineapplix delivers configurable, verified semiconductor design IP — starting with a UART Controller IP for ASIC, FPGA and SoC designs.",
  path: "/",
});

// PLACEHOLDER: feature-card copy
const features = [
  {
    icon: IconSliders,
    title: "Configurable",
    text: "Parameterized RTL lets you tune data widths, FIFO depths and bus interfaces to fit area and performance targets.",
  },
  {
    icon: IconShieldCheck,
    title: "Verified",
    text: "Every core ships with a UVM environment, assertions and functional coverage, developed alongside the RTL.",
  },
  {
    icon: IconPuzzle,
    title: "Easy Integration",
    text: "Standard APB, AHB and AXI4-Lite interfaces, clear register maps and step-by-step integration guides.",
  },
  {
    icon: IconSupport,
    title: "Dedicated Support",
    text: "Direct access to the engineers who designed the IP, from evaluation through tape-out.",
  },
];

export default function HomePage() {
  const p = featuredProduct;

  return (
    <>
      {/* ---------------- Hero (dark) ---------------- */}
      <section className="relative isolate overflow-hidden bg-brand-black text-white">
        <CircuitBackground />
        <div className="container-page relative py-24 sm:py-32 lg:py-40">
          <p className="eyebrow text-brand-yellow">Fabless Semiconductor IP</p>
          {/* PLACEHOLDER: headline — only claim "silicon-proven" once the IP has been validated in silicon */}
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Silicon-Proven Design IP for{" "}
            <span className="text-brand-yellow">Next-Gen SoCs</span>
          </h1>
          {/* PLACEHOLDER: subtext */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Configurable, fully verified RTL cores that drop into your ASIC, FPGA or SoC design —
            with the documentation and support to get you to tape-out faster.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/products">
              Explore IP <IconArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-dark">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ---------------- Why Pineapplix (light) ---------------- */}
      <section className="bg-offwhite py-20 sm:py-28" aria-labelledby="why-heading">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Why Pineapplix"
              title={<span id="why-heading">IP engineered for the integration engineer.</span>}
              intro="More than RTL: every Pineapplix core is a complete engineering package — design, verification, documentation and support."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <FeatureCard icon={f.icon} title={f.title}>
                  {f.text}
                </FeatureCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Featured product (dark) ---------------- */}
      {p && (
        <section className="bg-brand-black py-20 text-white sm:py-28" aria-labelledby="featured-heading">
          <div className="container-page grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                tone="dark"
                eyebrow="Featured IP"
                title={<span id="featured-heading">{p.name}</span>}
                intro={p.summary}
              />
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {p.features?.slice(0, 6).map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-white/80">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={getProductHref(p)}>
                  View {p.shortName} <IconArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href={`/contact?product=${p.slug}&type=datasheet`} variant="outline-dark">
                  Request Datasheet
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={120}>
              {/* Spec preview card */}
              <div className="rounded-2xl border border-white/10 bg-ink-900 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="eyebrow text-brand-yellow">At a glance</p>
                  <span className="rounded-full bg-brand-yellow px-2.5 py-1 text-xs font-semibold text-brand-black">
                    Available
                  </span>
                </div>
                <dl className="mt-6 divide-y divide-white/10">
                  {p.specs?.slice(0, 6).map((s) => (
                    <div key={s.label} className="flex justify-between gap-6 py-3 text-sm">
                      <dt className="text-ink-muted">{s.label}</dt>
                      <dd className="text-right font-medium text-white">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------------- CTA ---------------- */}
      <CtaBanner />
    </>
  );
}
