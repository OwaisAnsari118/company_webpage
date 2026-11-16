import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Pineapplix to request a datasheet, an IP evaluation or to discuss your SoC design requirements.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-black py-20 text-white sm:py-24">
        <div className="container-page">
          <SectionHeading
            as="h1"
            tone="dark"
            eyebrow="Contact"
            title="Let's talk about your design."
            intro="Request a datasheet or evaluation, or ask our engineers a technical question. We typically reply within one business day." // PLACEHOLDER: response time
          />
        </div>
      </section>

      <section className="bg-offwhite py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <aside className="space-y-8 lg:order-last">
            <div>
              <h2 className="eyebrow text-ink-800">Email</h2>
              <a href={`mailto:${site.email}`} className="mt-2 block text-lg font-semibold text-brand-black underline decoration-brand-yellow decoration-2 underline-offset-4 hover:decoration-brand-black">
                {site.email}
              </a>
            </div>
            <div>
              <h2 className="eyebrow text-ink-800">What happens next</h2>
              <ol className="mt-3 space-y-3 text-sm text-ink-800">
                {["We review your request and NDA requirements.", "An engineer follows up to understand your use case.", "We share the datasheet or evaluation package."].map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-brand-black text-xs font-bold text-brand-yellow">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
