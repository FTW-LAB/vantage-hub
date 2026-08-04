import type { FlywheelEvent } from '#/lib/flywheel'

export function PulseStrip({
  events,
  live,
}: {
  events: FlywheelEvent[]
  live: boolean
}) {
  return (
    <section
      aria-label="Flywheel pulse"
      className="rounded-xl border border-white/10 bg-zinc-900/60 p-4"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
          Live pulse
        </h2>
        <span
          className={
            live
              ? 'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium bg-[rgba(56,173,250,0.15)] text-[#38ADFA]'
              : 'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium bg-zinc-800 text-zinc-400'
          }
        >
          <span
            className={
              live
                ? 'h-1.5 w-1.5 rounded-full bg-[#38ADFA] animate-pulse'
                : 'h-1.5 w-1.5 rounded-full bg-zinc-500'
            }
          />
          {live ? 'GitHub live' : 'Seed mode'}
        </span>
      </div>
      <ul className="space-y-2">
        {events.map((e) => (
          <li
            key={e.id}
            className="flex items-start gap-3 rounded-lg border border-white/5 bg-black/20 px-3 py-2"
          >
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#38ADFA]" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm text-zinc-100">{e.title}</div>
              <div className="mt-0.5 flex flex-wrap gap-x-2 text-[11px] text-zinc-500">
                <span className="text-[#38ADFA]">{e.source}</span>
                {e.repo ? <span>{e.repo}</span> : null}
                <span>{new Date(e.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
