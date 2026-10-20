import SearchPanel from './SearchPanel.jsx';
import SessionTimer from './SessionTimer.jsx';

/**
 * Groups the timer and the search panel so App can mount/unmount them as one
 * unit. This is the component whose unmount proves that BOTH effects clean up.
 */
export default function SessionWidget() {
  return (
    <>
      <SessionTimer />
      <SearchPanel />
    </>
  );
}
