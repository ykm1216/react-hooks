/**
 * Deterministic product catalogue.
 *
 * A seeded PRNG is used instead of `Math.random()` so the same 600 records are
 * produced on every reload. That matters for a performance demo: without it,
 * "the list re-sorted" would be impossible to distinguish from "the data
 * changed".
 */

export const PRODUCT_COUNT = 600;

const CATEGORY_CATALOG = [
  { category: 'Audio', items: ['Headphones', 'Earbuds', 'Speaker', 'Soundbar', 'Microphone'] },
  { category: 'Wearables', items: ['Watch', 'Fitness Band', 'Smart Ring', 'Tracker'] },
  { category: 'Keyboards', items: ['Mechanical Keyboard', 'Keycap Set', 'Num Pad', 'Split Keyboard'] },
  { category: 'Monitors', items: ['4K Monitor', 'Ultrawide Display', 'Portable Screen', 'Studio Panel'] },
  { category: 'Cameras', items: ['Mirrorless Camera', 'Webcam', 'Action Cam', 'Lens Kit'] },
  { category: 'Accessories', items: ['USB-C Hub', 'Laptop Stand', 'Desk Mat', 'Cable Set', 'Charging Dock'] },
];

const BRANDS = ['Nimbus', 'Lumen', 'Vertex', 'Orbit', 'Kestrel', 'Halo', 'Parallel', 'Foundry'];

export const CATEGORIES = ['All', ...CATEGORY_CATALOG.map((entry) => entry.category)];

/** Small, fast, seedable PRNG (mulberry32). Same seed -> same sequence. */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function random() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildProducts(total) {
  const random = mulberry32(20261016);
  const products = [];

  for (let i = 0; i < total; i += 1) {
    const group = CATEGORY_CATALOG[i % CATEGORY_CATALOG.length];
    const item = group.items[Math.floor(random() * group.items.length)];
    const brand = BRANDS[Math.floor(random() * BRANDS.length)];

    products.push({
      id: i + 1,
      name: `${brand} ${item} ${String.fromCharCode(65 + (i % 26))}${(i % 9) + 1}`,
      category: group.category,
      price: Math.round((12 + random() * 1188) * 100) / 100,
      rating: Math.round((3 + random() * 2) * 10) / 10,
      inStock: random() > 0.18,
    });
  }

  return products;
}

export const PRODUCTS = buildProducts(PRODUCT_COUNT);
