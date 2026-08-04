import { createFileRoute, Link } from '@tanstack/react-router'
import { FLYWHEEL_STAGES } from '#/lib/brand'
import { getActivity } from '#/lib/activity-api'
import { CopyPage } from '#/components/CopyPage'

const SOURCE_LABEL: Record<string, string> = {
  gh_scout: 'GH Scout',
  hf_scout: 'HF Scout',
  model_pull: 'model_pull',
  org: 'org',
  implementer: 'implementer',
  package: 'package',
  seed: 'seed',
}

export const Route = createFileRoute('/activity')({
  loader: () => getActivity(),
  component: ActivityPage,
})

function ActivityPage() {
  const data = Route.useLoaderData()

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="ops-label">Ops · dual-forge flywheel</div>
          <CopyPage title="Activity flywheel" />
        </div>
        <h1 className="text-2xl font-semibold tracking-[0.06em] text-white uppercase">
          Activity
        </h1>
        <p className="max-w-2xl text-sm text-[var(--ftw-muted)]">
          One flywheel language for both lanes: Discover (GH + HF) → Contribute →
          Package → Field → Compound. Seed events keep the board honest when APIs
          rate-limit. No personal handle themes.
        </p>
        <div className="flex flex-wrap gap-2">
          {data.sources.map((s) => (
            <span
              key={s}
              className={`ops-chip ${s === 'hf_scout' || s === 'gh_scout' || s === 'model_pull' ? 'ops-chip-live' : ''}`}
            >
              {SOURCE_LABEL[s] || s}
            </span>
          ))}
          <span className={`ops-chip ${data.live ? 'ops-chip-live' : ''}`}>
            {data.live ? 'org live' : 'seed fallback'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/models" className="ops-btn no-underline">
            HF Scout
          </Link>
          <Link to="/daemon" className="ops-btn no-underline">
            GH Scout
          </Link>
        </div>
      </header>

      <section>
        <h2 className="ops-label mb-3">Stages</h2>
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {FLYWHEEL_STAGES.map((s, i) => (
            <li key={s.id} className="ops-panel p-3">
              <span className="ops-accent text-[10px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="mt-1 text-xs font-semibold text-white uppercase tracking-wide">
                {s.label}
              </div>
              <p className="mt-1 text-[11px] text-[var(--ftw-muted)]">{s.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="ops-label mb-3">Event stream</h2>
        <ul className="divide-y divide-[var(--ftw-border)] border border-[var(--ftw-border)] bg-[var(--ftw-panel)]">
          {data.events.map((e) => (
            <li key={e.id} className="px-3 py-3 sm:px-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="text-[13px] text-white break-words">{e.title}</div>
                <time className="text-[10px] text-[var(--ftw-label)] shrink-0">
                  {new Date(e.createdAt).toLocaleString()}
                </time>
              </div>
              {e.detail ? (
                <p className="mt-1 text-[11px] text-[var(--ftw-muted)] break-words">
                  {e.detail}
                </p>
              ) : null}
              <div className="mt-1.5 flex flex-wrap gap-2 text-[10px] text-[var(--ftw-label)]">
                <span className="ops-chip ops-chip-live">
                  {SOURCE_LABEL[e.source] || e.source}
                </span>
                <span className="ops-chip">{e.stage}</span>
                {e.actor ? <span>{e.actor}</span> : null}
                {e.repo ? <span className="break-all">{e.repo}</span> : null}
                {e.url ? (
                  <a
                    href={e.url}
                    className="ops-accent no-underline hover:underline"
                    rel="noreferrer"
                    target="_blank"
                  >
                    open
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
