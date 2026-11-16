import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { availableProducts, getProductHref } from "@/data/products";

// Generates /sitemap.xml. Product pages are added automatically from data/products.ts.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/products", "/about", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const productRoutes = availableProducts.map((p) => ({
    url: `${site.url}${getProductHref(p)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));
  return [...staticRoutes, ...productRoutes];
}
