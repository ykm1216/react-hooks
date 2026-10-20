import test from 'node:test';
import assert from 'node:assert/strict';

import { ACTION_TYPES, INITIAL_STATE, reducer } from './reducer.js';
import { selectCounts, selectVisibleIssues } from './selectors.js';

/**
 * Reducer tests.
 *
 * Run with:  npm test        (node --test src/state/reducer.test.js)
 *
 * The reducer is pure, so it needs no React and no DOM here. Each test also
 * asserts immutability, because "the previous state was mutated" is precisely
 * the class of bug the UI would hide (React skips re-rendering when the state
 * reference does not change).
 */

function addIssue(state, title) {
  return reducer(state, { type: ACTION_TYPES.ADD_ISSUE, payload: { title } });
}

test('ADD_ISSUE appends a new issue, increments nextId, and never mutates previous state', () => {
  const first = addIssue(INITIAL_STATE, 'Fix login redirect');
  const second = addIssue(first, 'Add dark mode');

  assert.equal(first.issues.length, 1);
  assert.deepEqual(first.issues[0], { id: 1, title: 'Fix login redirect', done: false });
  assert.equal(first.nextId, 2, 'nextId advances so ids are never reused');

  assert.equal(second.issues.length, 2);
  assert.equal(second.issues[1].id, 2);
  assert.equal(second.nextId, 3);

  // Immutability: the original state and its array are untouched, and the new
  // state is a different object.
  assert.equal(INITIAL_STATE.issues.length, 0);
  assert.notEqual(first, INITIAL_STATE);
  assert.notEqual(second, first);
  assert.notEqual(second.issues, first.issues);

  // Blank titles are rejected by returning the very same state object.
  assert.equal(addIssue(second, '   '), second);
});

test('TOGGLE_ISSUE flips done for the matching issue and replaces only that object', () => {
  const state = addIssue(addIssue(INITIAL_STATE, 'Write tests'), 'Ship it');
  const originalFirst = state.issues[0];

  const toggled = reducer(state, { type: ACTION_TYPES.TOGGLE_ISSUE, payload: { id: 1 } });

  assert.equal(toggled.issues[0].done, true);
  assert.equal(toggled.issues[1].done, false);

  // A NEW object replaces the toggled issue...
  assert.notEqual(toggled.issues[0], originalFirst);
  // ...while the original issue object is left alone.
  assert.equal(originalFirst.done, false);
  // Untouched issues keep their identity (cheap downstream comparisons).
  assert.equal(toggled.issues[1], state.issues[1]);
  assert.notEqual(toggled.issues, state.issues);

  // Toggling twice returns to the original value.
  const back = reducer(toggled, { type: ACTION_TYPES.TOGGLE_ISSUE, payload: { id: 1 } });
  assert.equal(back.issues[0].done, false);
});

test('CLEAR_DONE removes completed issues, keeps open ones, and is a no-op otherwise', () => {
  let state = addIssue(INITIAL_STATE, 'Alpha');
  state = addIssue(state, 'Beta');
  state = addIssue(state, 'Gamma');
  state = reducer(state, { type: ACTION_TYPES.TOGGLE_ISSUE, payload: { id: 2 } });

  const cleared = reducer(state, { type: ACTION_TYPES.CLEAR_DONE });

  assert.deepEqual(
    cleared.issues.map((issue) => issue.title),
    ['Alpha', 'Gamma']
  );
  assert.equal(cleared.nextId, state.nextId, 'ids are not rewound after a clear');
  assert.equal(state.issues.length, 3, 'the previous state is untouched');

  // Nothing completed -> the same state object comes back.
  const noneDone = addIssue(INITIAL_STATE, 'Only open');
  assert.equal(reducer(noneDone, { type: ACTION_TYPES.CLEAR_DONE }), noneDone);
});

test('unknown or malformed actions return the existing state object unchanged', () => {
  const state = addIssue(INITIAL_STATE, 'Keep me');

  // Unknown type (the default branch).
  assert.equal(reducer(state, { type: 'SOME_UNKNOWN_ACTION' }), state);
  // Right type, wrong shape: no payload -> nothing is added, no crash.
  assert.equal(reducer(state, { type: ACTION_TYPES.ADD_ISSUE, title: 'ignored' }), state);
  // Unknown filter value is rejected.
  assert.equal(reducer(state, { type: ACTION_TYPES.SET_FILTER, payload: { filter: 'nope' } }), state);
  // Deleting an id that is not present is a no-op.
  assert.equal(reducer(state, { type: ACTION_TYPES.DELETE_ISSUE, payload: { id: 999 } }), state);
});

test('SET_FILTER drives the All / Open / Done views and counts stay accurate', () => {
  let state = addIssue(INITIAL_STATE, 'First');
  state = addIssue(state, 'Second');
  state = reducer(state, { type: ACTION_TYPES.TOGGLE_ISSUE, payload: { id: 1 } });

  assert.deepEqual(selectCounts(state), { all: 2, open: 1, done: 1 });

  const openView = reducer(state, { type: ACTION_TYPES.SET_FILTER, payload: { filter: 'open' } });
  assert.deepEqual(
    selectVisibleIssues(openView).map((issue) => issue.title),
    ['Second']
  );

  const doneView = reducer(state, { type: ACTION_TYPES.SET_FILTER, payload: { filter: 'done' } });
  assert.deepEqual(
    selectVisibleIssues(doneView).map((issue) => issue.title),
    ['First']
  );

  const allView = reducer(doneView, { type: ACTION_TYPES.SET_FILTER, payload: { filter: 'all' } });
  assert.equal(selectVisibleIssues(allView).length, 2);
  assert.equal(allView.filter, 'all');
});
