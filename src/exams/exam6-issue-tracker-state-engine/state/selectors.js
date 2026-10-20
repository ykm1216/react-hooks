/**
 * Derived selectors. Kept beside the reducer so the "view" rules live in one
 * place and the components stay thin.
 */

export function selectVisibleIssues(state) {
  switch (state.filter) {
    case 'open':
      return state.issues.filter((issue) => !issue.done);
    case 'done':
      return state.issues.filter((issue) => issue.done);
    case 'all':
    default:
      return state.issues;
  }
}

export function selectCounts(state) {
  let done = 0;
  for (const issue of state.issues) {
    if (issue.done) done += 1;
  }
  const total = state.issues.length;
  return { all: total, open: total - done, done };
}
