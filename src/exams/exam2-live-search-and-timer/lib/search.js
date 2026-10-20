import { USERS } from '../data/users.js';

/** Simulated network latency for the "search request". */
export const SEARCH_DELAY_MS = 400;

/** Case-insensitive match on name or role. An empty query returns everyone. */
export function searchUsers(query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return USERS;
  return USERS.filter(
    (user) => user.name.toLowerCase().includes(needle) || user.role.toLowerCase().includes(needle)
  );
}
