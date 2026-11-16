import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * Builds consistent per-page metadata (title, description, canonical URL,
 * Open Graph, Twitter). The OG image comes from app/opengraph-image.tsx.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — Semiconductor Design IP`;
  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — Semiconductor Design IP` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
