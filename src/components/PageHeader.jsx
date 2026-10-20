/**
 * Notion-style page header: soft pastel cover, floating emoji icon, title and
 * property pills. Purely presentational (UI only, no state).
 */
export default function PageHeader({ icon, title, subtitle, tags = [], cover = 'from-rose-100 via-amber-50 to-sky-100', right }) {
  return (
    <header className="relative">
      <div className={`h-28 rounded-2xl bg-gradient-to-r ${cover} grayscale sm:h-36 dark:opacity-80`} />
      <div className="-mt-9 flex flex-wrap items-end justify-between gap-3 px-5 sm:px-8">
        <div className="min-w-0">
          <div className="grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl border-4 border-white bg-white text-4xl shadow-sm dark:border-stone-950 dark:bg-stone-800">
            <span className="grayscale" aria-hidden="true">{icon}</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{subtitle}</p>}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span key={t.label} className={`rounded-full px-2.5 py-1 text-xs font-medium ${t.tone}`}>
                  {t.label}
                </span>
              ))}
            </div>
          )}
        </div>
        {right}
      </div>
    </header>
  );
}
