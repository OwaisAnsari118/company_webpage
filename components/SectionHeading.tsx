import type { ReactNode } from "react";

/** Eyebrow + heading + optional intro, themed for dark or light sections. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${dark ? "text-brand-yellow" : "text-ink-800"}`}>
          {!dark && <span className="mr-2 inline-block h-2 w-2 rounded-sm bg-brand-yellow align-middle" />}
          {eyebrow}
        </p>
      )}
      <Heading
        className={`text-3xl font-bold sm:text-4xl ${dark ? "text-white" : "text-brand-black"}`}
      >
        {title}
      </Heading>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-ink-muted" : "text-ink-800"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
