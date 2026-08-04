import { createFileRoute } from '@tanstack/react-router'
import { BRAND, FLYWHEEL_STAGES } from '#/lib/brand'
import { getActivity } from '#/lib/activity-api'

export const Route = createFileRoute('/activity')({
  loader: () => getActivity(),
  component: ActivityPage,
})

function ActivityPage() {
  const data = Route.useLoaderData()

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-white">Activity flywheel</h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Public-source events only. Live merge of{' '}
          <strong className="text-zinc-200">{BRAND.humanGithub}</strong> +{' '}
          <strong className="text-zinc-200">{BRAND.githubOrg}</strong> GitHub
          activity with implementer + scout_runs. Seed events remain if the API
          is rate-limited.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {data.sources.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 bg-zinc-900 px-2.5 py-1 text-zinc-300"
            >
              {s}
            </span>
          ))}
          <span
            className={`rounded-full px-2.5 py-1 ${
              data.live
                ? 'bg-[rgba(56,173,250,0.15)] text-[#38ADFA]'
                : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            {data.live ? 'live GitHub' : 'seed fallback'}
          </span>
        </div>
      </header>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
          Stages → repos
        </h2>
        <ol className="grid gap-2 sm:grid-cols-2">
          {FLYWHEEL_STAGES.map((s, i) => (
            <li
              key={s.id}
              className="flex gap-3 rounded-lg border border-white/10 bg-zinc-900/50 p-3"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#38ADFA] text-xs font-bold text-black">
                {i + 1}
              </span>
              <div>
                <div className="font-medium text-white">{s.label}</div>
                <a
                  href={`https://github.com/${BRAND.githubOrg}/${s.repo}`}
                  className="font-mono text-xs text-[#38ADFA] no-underline hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  {BRAND.githubOrg}/{s.repo}
                </a>
                <p className="mt-1 text-sm text-zinc-500">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
          Event stream
        </h2>
        <ul className="divide-y divide-white/5 rounded-xl border border-white/10 bg-zinc-900/40">
          {data.events.map((e) => (
            <li key={e.id} className="px-4 py-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="font-medium text-zinc-100">{e.title}</div>
                <time className="text-xs text-zinc-500">
                  {new Date(e.createdAt).toLocaleString()}
                </time>
              </div>
              {e.detail ? (
                <p className="mt-1 text-sm text-zinc-500">{e.detail}</p>
              ) : null}
              <div className="mt-1.5 flex flex-wrap gap-2 text-[11px] text-zinc-500">
                <span className="rounded bg-[rgba(56,173,250,0.12)] px-1.5 py-0.5 text-[#38ADFA]">
                  {e.source}
                </span>
                <span className="rounded bg-zinc-800 px-1.5 py-0.5">
                  {e.stage}
                </span>
                {e.actor ? <span>@{e.actor}</span> : null}
                {e.repo ? <span>{e.repo}</span> : null}
                {e.url ? (
                  <a
                    href={e.url}
                    className="text-[#38ADFA] hover:underline"
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
