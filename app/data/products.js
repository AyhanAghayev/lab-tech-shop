// The shop's inventory. Plain data, imported by the Server Component that
// renders the product grid. Images are real photos served from Unsplash
// (see `images.remotePatterns` in next.config.mjs).
const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

export const products = [
  {
    id: "aurora-headphones",
    name: "Aurora Wireless Headphones",
    price: 149.99,
    blurb: "40h battery, active noise cancelling, absurdly comfy ear cups.",
    image: img("1505740420928-5e560c06d30e"),
  },
  {
    id: "pulse-smartwatch",
    name: "Pulse Smartwatch",
    price: 199.0,
    blurb: "Heart rate, GPS, and notifications you'll proudly ignore.",
    image: img("1523275335684-37898b6baf30"),
  },
  {
    id: "lumen-mirrorless",
    name: "Lumen Mirrorless Camera",
    price: 899.0,
    blurb: "24MP sensor and a kit lens that makes coffee look gourmet.",
    image: img("1516035069371-29a1b244cc32"),
  },
  {
    id: "clack-keyboard",
    name: "Clack Mechanical Keyboard",
    price: 129.5,
    blurb: "Hot-swappable switches your office neighbours will adore.",
    image: img("1587829741301-dc798b83add3"),
  },
  {
    id: "boom-speaker",
    name: "Boom Portable Speaker",
    price: 79.99,
    blurb: "Waterproof, dustproof, neighbour-proof... almost.",
    image: img("1608043152269-423dbba4e7e1"),
  },
  {
    id: "skyline-drone",
    name: "Skyline Camera Drone",
    price: 549.0,
    blurb: "4K aerial footage and a battery that lasts one good idea.",
    image: img("1473968512647-3e447244af8f"),
  },
];
