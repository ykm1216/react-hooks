/**
 * The "expensive" part of the explorer, deliberately isolated from React so it
 * can be memoized, profiled, and reasoned about as a pure function.
 *
 * Filtering + sorting is the *only* input-dependent work here; nothing in this
 * module touches state, the DOM, timers, or the network.
 */

const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Rating: best first' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

export { SORT_OPTIONS };

/**
 * Stands in for a real fuzzy-search / ranking library. It is a tight numeric
 * loop so the cost is obvious in a profile and measurable with performance.now.
 * The returned "heat" is woven into the sort as a stable tiebreaker, so the work
 * genuinely affects the output and cannot be optimised away.
 */
function fuzzyHeat(record, salt) {
  let heat = 0;
  for (let i = 1; i <= 2000; i += 1) {
    heat += Math.sin(i * salt) * Math.cos(i / 7);
  }
  return heat;
}

function matches(record, needle) {
  if (!needle) return true;
  return (
    record.name.toLowerCase().includes(needle) ||
    record.category.toLowerCase().includes(needle)
  );
}

function sortComparator(sortOrder) {
  switch (sortOrder) {
    case 'price-desc':
      return (a, b) => b.price - a.price;
    case 'rating-desc':
      return (a, b) => b.rating - a.rating;
    case 'name-asc':
      return (a, b) => a.name.localeCompare(b.name);
    case 'price-asc':
    default:
      return (a, b) => a.price - b.price;
  }
}

/**
 * @returns {{ items: Array, considered: number }}
 */
export function computeVisibleProducts(products, query, category, sortOrder) {
  const needle = query.trim().toLowerCase();
  const inCategory = (record) => category === 'All' || record.category === category;

  // Decorate each surviving record with its (expensive) heat score, then sort.
  const decorated = [];

  for (const record of products) {
    if (!inCategory(record) || !matches(record, needle)) continue;
    decorated.push({ record, heat: fuzzyHeat(record, needle.length + record.id) });
  }

  const compare = sortComparator(sortOrder);

  decorated.sort((a, b) => {
    const primary = compare(a.record, b.record);
    if (primary !== 0) return primary;
    // Deterministic tiebreaker that USES the expensive score.
    return a.heat - b.heat;
  });

  return { items: decorated.map((entry) => entry.record), considered: decorated.length };
}
