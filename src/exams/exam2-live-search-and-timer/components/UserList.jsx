/** Purely presentational list of matching users. */
export default function UserList({ users }) {
  return (
    <ul className="grid list-none gap-2 p-0" data-testid="user-list">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex items-center justify-between gap-3 rounded-xl border border-stone-200/70 bg-[#fafafa] px-3.5 py-3"
        >
          <span className="font-semibold">{user.name}</span>
          <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
            {user.role}
          </span>
        </li>
      ))}
    </ul>
  );
}
