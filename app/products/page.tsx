import { pageMetadata } from "@/lib/seo";
import { categories, getProductsByCategory } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Browse the Pineapplix semiconductor IP portfolio: configurable, verified Design IP including the UART Controller IP, with SPI and I2C coming soon.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <section className="bg-brand-black py-20 text-white sm:py-24">
        <div className="container-page">
          <SectionHeading
            as="h1"
            tone="dark"
            eyebrow="IP Portfolio"
            title="Products"
            intro="Production-ready semiconductor IP cores, each delivered with RTL, verification environment, documentation and integration support."
          />
        </div>
      </section>

      {/* One section per category — new categories in data/products.ts appear automatically */}
      {categories.map((cat) => (
        <section key={cat.slug} id={cat.slug} className="scroll-mt-20 bg-offwhite py-16 sm:py-20" aria-labelledby={`${cat.slug}-heading`}>
          <div className="container-page">
            <Reveal>
              <div className="flex flex-col gap-2 border-b border-black/10 pb-6">
                <h2 id={`${cat.slug}-heading`} className="text-2xl font-bold text-brand-black sm:text-3xl">
                  {cat.name}
                </h2>
                <p className="max-w-2xl text-ink-800">{cat.description}</p>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {getProductsByCategory(cat.slug).map((p, i) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CtaBanner
        title="Need a custom IP core?"
        text="Tell us about your requirements — we can tailor existing IP or discuss new development." // PLACEHOLDER copy
        href="/contact"
        cta="Talk to us"
      />
    </>
  );
}
