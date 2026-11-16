import { ButtonLink } from "./Button";
import { IconArrowRight } from "./icons";

/** Yellow call-to-action band used at the bottom of key pages. */
export function CtaBanner({
  title = "Request an evaluation",
  text = "Get evaluation RTL, documentation and a technical walkthrough with our design team.", // PLACEHOLDER copy
  href = "/contact?type=evaluation",
  cta = "Request evaluation",
}: {
  title?: string;
  text?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <section className="bg-offwhite py-16 sm:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl bg-brand-yellow px-6 py-12 sm:px-12">
          {/* decorative lattice */}
          <svg aria-hidden="true" className="absolute -right-10 -top-10 h-64 w-64 opacity-15" viewBox="0 0 100 100">
            <path d="M0 20 L80 100 M0 0 L100 100 M20 0 L100 80 M40 0 L100 60 M100 20 L20 100 M100 0 L0 100 M80 0 L0 80 M60 0 L0 60" stroke="#000" strokeWidth="3" fill="none" />
          </svg>
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-brand-black sm:text-4xl">{title}</h2>
              <p className="mt-3 text-base text-ink-900">{text}</p>
            </div>
            <ButtonLink href={href} variant="dark" className="shrink-0">
              {cta} <IconArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
