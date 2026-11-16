import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="bg-brand-black py-32 text-center text-white">
      <div className="container-page">
        <p className="eyebrow text-brand-yellow">404</p>
        <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-ink-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <ButtonLink href="/" className="mt-8">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
