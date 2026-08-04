import { createFileRoute, Link } from '@tanstack/react-router'
import { BRAND, FLYWHEEL_STAGES } from '#/lib/brand'
import { getPulse } from '#/lib/activity-api'
import { PulseStrip } from '#/components/PulseStrip'

export const Route = createFileRoute('/')({
  loader: () => getPulse(),
  component: Home,
})

function Home() {
  const pulse = Route.useLoaderData()

  return (
    <div className="space-y-12">
      <section className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(56,173,250,0.35)] bg-[rgba(56,173,250,0.1)] px-3 py-1 text-xs font-medium text-[#38ADFA]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38ADFA]" />
            Product house · {BRAND.domain}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {BRAND.productHouse}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-400">{BRAND.tagline}</p>
          <p className="mt-2 max-w-xl text-sm text-zinc-500">{BRAND.posture}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/activity"
              className="rounded-md bg-[#38ADFA] px-4 py-2 text-sm font-semibold text-black no-underline hover:bg-[#65c4ff]"
            >
              View activity flywheel
            </Link>
            <a
              href={`https://github.com/${BRAND.githubOrg}/vantage-hub`}
              className="rounded-md border border-white/15 px-4 py-2 text-sm text-zinc-200 no-underline hover:border-white/30"
              rel="noreferrer"
              target="_blank"
            >
              ftwforge/vantage-hub
            </a>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div
            className="relative flex h-40 w-40 items-center justify-center rounded-2xl shadow-2xl sm:h-48 sm:w-48"
            style={{ backgroundColor: BRAND.color }}
          >
            <img
              src={BRAND.logoPath}
              alt="FTW Lab geometric F"
              className="h-28 w-28 object-contain sm:h-32 sm:w-32"
            />
          </div>
        </div>
      </section>

      <PulseStrip events={pulse.events} live={pulse.live} />

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-400">
          Flywheel stages
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FLYWHEEL_STAGES.map((stage) => (
            <div
              key={stage.id}
              className="rounded-xl border border-white/10 bg-zinc-900/40 p-4"
            >
              <div className="text-xs font-medium uppercase tracking-wide text-[#38ADFA]">
                {stage.label}
              </div>
              <div className="mt-1 font-mono text-sm text-white">{stage.repo}</div>
              <p className="mt-2 text-sm text-zinc-400">{stage.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-zinc-500">
          Full stage map and live merges live on{' '}
          <Link to="/activity" className="text-[#38ADFA] hover:underline">
            /activity
          </Link>
          .
        </p>
      </section>

      <section className="rounded-xl border border-white/10 bg-gradient-to-br from-[rgba(56,173,250,0.08)] to-transparent p-6">
        <h2 className="text-lg font-semibold text-white">Identity</h2>
        <ul className="mt-3 space-y-1 text-sm text-zinc-400">
          <li>
            Human GitHub:{' '}
            <a
              className="text-[#38ADFA]"
              href={`https://github.com/${BRAND.humanGithub}`}
              rel="noreferrer"
              target="_blank"
            >
              {BRAND.humanGithub}
            </a>{' '}
            (credible account — not abandoned)
          </li>
          <li>
            Org:{' '}
            <a
              className="text-[#38ADFA]"
              href={`https://github.com/${BRAND.githubOrg}`}
              rel="noreferrer"
              target="_blank"
            >
              {BRAND.githubOrg}
            </a>
          </li>
          <li>
            Ops:{' '}
            <a className="text-[#38ADFA]" href={`mailto:${BRAND.email}`}>
              {BRAND.email}
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
