/**
 * Global site configuration.
 * Edit company-wide values (URL, email, navigation) here.
 */
export const site = {
  name: "Pineapplix",
  // PLACEHOLDER: set NEXT_PUBLIC_SITE_URL in Vercel to your real domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pineapplix.com",
  description:
    "Pineapplix is a fabless semiconductor IP company delivering configurable, verified design IP for ASIC, FPGA and SoC development.",
  // PLACEHOLDER: replace with your real contact address.
  email: "info@pineapplix.com",
  nav: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
