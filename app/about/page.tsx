import { pageMetadata } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBanner } from "@/components/CtaBanner";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Pineapplix is a fabless semiconductor IP company building configurable, verified design IP for ASIC, FPGA and SoC teams.",
  path: "/about",
});

// PLACEHOLDER: all text on this page — replace with your own story.
const values = [
  { title: "Engineering first", text: "Design decisions are documented, verified and explained — not hidden in the RTL." },
  { title: "Verification-driven", text: "Verification is developed alongside the design, never bolted on afterward." },
  { title: "Integration-minded", text: "We build for the engineer who has to connect our IP to a real subsystem." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-black py-20 text-white sm:py-28">
        <div className="container-page">
          <SectionHeading
            as="h1"
            tone="dark"
            eyebrow="About Pineapplix"
            title="Building the IP we always wanted to integrate."
            intro="Pineapplix is a fabless semiconductor IP company focused on high-quality, verification-ready design IP for ASIC, FPGA and SoC development."
          />
        </div>
      </section>

      <section className="bg-offwhite py-16 sm:py-24">
        <div className="container-page grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-black/10 bg-white p-8">
              <p className="eyebrow text-ink-800">
                <span className="mr-2 inline-block h-2 w-2 rounded-sm bg-brand-yellow align-middle" />
                Mission
              </p>
              {/* PLACEHOLDER: mission */}
              <p className="mt-4 text-xl font-semibold leading-snug text-brand-black">
                To reduce integration risk and accelerate silicon bring-up by delivering IP that is
                configurable, thoroughly verified and genuinely easy to use.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-2xl bg-brand-black p-8 text-white">
              <p className="eyebrow text-brand-yellow">Vision</p>
              {/* PLACEHOLDER: vision */}
              <p className="mt-4 text-xl font-semibold leading-snug">
                A broad, trusted portfolio of interface and system IP that design teams reach for
                first — from simple peripherals to high-speed interfaces.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-offwhite pb-16 sm:pb-24">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Our story" title="Why we started Pineapplix" />
          </Reveal>
          <Reveal delay={100}>
            {/* PLACEHOLDER: company story */}
            <div className="space-y-4 leading-relaxed text-ink-800">
              <p>
                Pineapplix was founded by engineers who spent years integrating third-party IP into
                complex SoCs — and too often found sparse documentation, thin verification and
                surprises late in the schedule.
              </p>
              <p>
                We set out to build IP differently: clean, parameterized RTL delivered as a complete
                engineering package, with a verification environment, integration guide and real
                engineering support behind it.
              </p>
              <p>
                Our first product, the UART Controller IP, reflects that approach. More interface IP
                — starting with SPI and I2C — is on the way.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-black py-16 text-white sm:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading tone="dark" eyebrow="What we value" title="How we work" />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-xl border border-white/10 bg-ink-900 p-6 transition-colors hover:border-brand-yellow">
                  <span className="font-display text-sm font-bold text-brand-yellow">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
