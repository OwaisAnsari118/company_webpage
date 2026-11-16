/**
 * ============================================================
 *  PRODUCT CATALOG — single source of truth for all IP cores
 * ============================================================
 *
 * To add a new IP core:
 *   1. Add an entry to `products` below (status "available" or "coming-soon").
 *   2. If it belongs to a new category, add the category to `categories`.
 *   3. (Optional) Add a block diagram component in components/diagrams/ and
 *      register it in components/diagrams/index.ts, then set `diagram`.
 *
 * Pages, the products grid, the contact form dropdown and sitemap.xml
 * all read from this file — no layout changes needed.
 *
 * Every spec/feature value marked PLACEHOLDER must be replaced with real data
 * before launch.
 */

export type ProductStatus = "available" | "coming-soon";

/** Keys must match the registry in components/diagrams/index.ts */
export type DiagramKey = "uart";

export interface Category {
  slug: string;
  name: string;
  description: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  categorySlug: string;
  name: string;
  /** Short label for cards, dropdowns and footer links. */
  shortName: string;
  tagline: string;
  /** One- or two-sentence summary for cards and meta descriptions. */
  summary: string;
  status: ProductStatus;
  featured?: boolean;
  tags: string[];
  // Detail-page content (optional for coming-soon products).
  overview?: string[];
  features?: string[];
  deliverables?: string[];
  applications?: string[];
  specs?: Spec[];
  diagram?: DiagramKey;
}

export const categories: Category[] = [
  {
    slug: "design-ip",
    name: "Design IP",
    // PLACEHOLDER: category description
    description:
      "Synthesizable, configurable RTL building blocks delivered with a complete verification and integration package.",
  },
];

export const products: Product[] = [
  {
    slug: "uart-controller",
    categorySlug: "design-ip",
    name: "UART Controller IP",
    shortName: "UART Controller",
    // PLACEHOLDER: marketing copy
    tagline: "Configurable asynchronous serial interface for any SoC.",
    summary:
      "A fully configurable, synthesizable UART controller with programmable baud rate, TX/RX FIFOs and APB, AHB or AXI4-Lite bus options.",
    status: "available",
    featured: true,
    tags: ["Verilog / SystemVerilog", "APB · AHB · AXI4-Lite", "ASIC & FPGA"],

    // PLACEHOLDER: overview paragraphs
    overview: [
      "The Pineapplix UART Controller IP is a full-duplex asynchronous serial communication core designed for straightforward integration into ASIC, FPGA and SoC designs. It implements the industry-standard UART protocol with a rich set of compile-time and run-time configuration options.",
      "The core includes a programmable baud rate generator, independent transmit and receive FIFOs with configurable depth, flexible interrupt generation and optional RTS/CTS hardware flow control. A choice of APB, AHB or AXI4-Lite slave interfaces lets it drop into most on-chip bus fabrics without glue logic.",
    ],

    // PLACEHOLDER: verify every feature against the final RTL
    features: [
      "Configurable data width: 5, 6, 7 or 8 bits",
      "Parity: none, even or odd",
      "1, 1.5 or 2 stop bits",
      "Programmable fractional baud rate generator",
      "Independent TX and RX FIFOs with configurable depth",
      "Maskable interrupts: TX empty, RX threshold, RX timeout, line errors",
      "Optional hardware flow control (RTS/CTS)",
      "Bus interface options: APB, AHB-Lite or AXI4-Lite",
      "Framing, parity, overrun and break detection",
      "Fully synthesizable Verilog / SystemVerilog RTL",
    ],

    deliverables: [
      "Synthesizable RTL source (Verilog / SystemVerilog)",
      "Testbench and UVM verification environment",
      "Integration guide",
      "Datasheet with register map",
      "Synthesis scripts and constraints",
      "Sample bare-metal software drivers (C)",
    ],

    applications: [
      "Microcontrollers",
      "IoT devices",
      "Consumer electronics",
      "Automotive",
      "Industrial control",
    ],

    // PLACEHOLDER: all values below are illustrative — replace with measured data
    specs: [
      { label: "Data width", value: "5 – 8 bits" },
      { label: "Parity", value: "None / Even / Odd" },
      { label: "Stop bits", value: "1 / 1.5 / 2" },
      { label: "Maximum baud rate", value: "Up to 3 Mbps (TBD)" },
      { label: "FIFO depth", value: "4 – 256 entries, configurable (default 16)" },
      { label: "Bus interface", value: "APB3 / AHB-Lite / AXI4-Lite" },
      { label: "Clock domains", value: "Single (optional async baud clock — TBD)" },
      { label: "Gate count", value: "~X k gates (TBD)" },
      { label: "Target Fmax", value: "TBD MHz @ TBD nm" },
      { label: "FPGA resources", value: "TBD LUTs / TBD FFs" },
      { label: "Languages", value: "Verilog-2001 / SystemVerilog" },
      { label: "Verification", value: "UVM, SVA, functional coverage" },
    ],

    diagram: "uart",
  },

  // ---- Future IP (placeholders) -------------------------------------------
  {
    slug: "spi-controller",
    categorySlug: "design-ip",
    name: "SPI Controller IP",
    shortName: "SPI Controller",
    tagline: "Master/slave serial peripheral interface.",
    summary:
      "Configurable SPI master/slave controller with multiple chip selects, all four clock modes and FIFO buffering.",
    status: "coming-soon",
    tags: ["Master / Slave", "Modes 0–3"],
  },
  {
    slug: "i2c-controller",
    categorySlug: "design-ip",
    name: "I2C Controller IP",
    shortName: "I2C Controller",
    tagline: "Standard, Fast and Fast-mode Plus I2C.",
    summary:
      "Multi-master I2C controller supporting standard, fast and fast-mode plus speeds with clock stretching and arbitration.",
    status: "coming-soon",
    tags: ["Multi-master", "Up to 1 MHz"],
  },
];

// ---- Helpers -----------------------------------------------------------------

export function getProductHref(p: Product): string {
  return `/products/${p.categorySlug}/${p.slug}`;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(categorySlug: string, slug: string): Product | undefined {
  return products.find((p) => p.categorySlug === categorySlug && p.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export const availableProducts = products.filter((p) => p.status === "available");
export const featuredProduct = products.find((p) => p.featured) ?? availableProducts[0];
