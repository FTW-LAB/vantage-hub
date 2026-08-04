import { createFileRoute, Link } from '@tanstack/react-router'
import { getDaemonPage } from '#/lib/activity-api'
import { AgentPrompt } from '#/components/AgentPrompt'
import { CopyPage } from '#/components/CopyPage'

export const Route = createFileRoute('/daemon')({
  loader: () => getDaemonPage(),
  component: DaemonPage,
})

const SCOUT_PROMPT = `You are an FTW Lab fielding agent running GitHub Scout.
Rules: public repositories only; rate-limited; tag legal_risk; no private access; no credential stuffing.
1) Inventory public org packages (scout-daemon, implementer-sdk, geolite2-bridge, redirect-intel, tarx-bridge, ecosystem-prompts).
2) Emit gh_scout events with repo + legal_risk + summary.
3) Produce agent setup prompts for dual-forge pairing with HF Model Scout.
Ethics gate: refuse unauthorized access. MaxMind honesty for geo (city/ASN only).`

function DaemonPage() {
  const data = Route.useLoaderData()

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="ops-label">GitHub lane · Scout daemon</div>
          <CopyPage title="Daemon / GH Scout" />
        </div>
        <h1 className="text-2xl font-semibold tracking-[0.06em] text-white uppercase">
          Daemon
        </h1>
        <p className="max-w-2xl text-sm text-[var(--ftw-muted)]">
          Public-repo discovery only. Rate-limited. legal_risk tags. Agent setup
          prompts for dual-forge fielding. Cross-link to HF Models for weights.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link to="/models" className="ops-btn ops-btn-solid no-underline">
            HF Models
          </Link>
          <Link to="/activity" className="ops-btn no-underline">
            Ops
          </Link>
          <a
            href={`https://github.com/${data.brand.githubOrg}`}
            className="ops-btn no-underline"
            rel="noreferrer"
            target="_blank"
          >
            Org repos
          </a>
        </div>
      </header>

      <section className="ops-panel p-4">
        <h2 className="ops-label">GH Scout posture</h2>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-[12px] text-[var(--ftw-muted)]">
          <li>Public repositories only</li>
          <li>Rate-limited hub / API clients</li>
          <li>legal_risk tags on every hit</li>
          <li>No personal contributor marketing on the board</li>
        </ul>
      </section>

      <section id="packages">
        <h2 className="ops-label mb-3">Packages</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {data.packages.map((p) => (
            <div key={p.id} className="ops-panel p-3">
              <div className="flex flex-wrap gap-2">
                <span className="ops-chip ops-chip-live">{p.opsRole}</span>
              </div>
              <a
                href={`https://github.com/${data.brand.githubOrg}/${p.label}`}
                className="mt-2 block font-mono text-sm text-white no-underline hover:underline"
                rel="noreferrer"
                target="_blank"
              >
                {p.label}
              </a>
              <p className="mt-1 text-[11px] text-[var(--ftw-muted)]">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="ops-label mb-3">Agent setup</h2>
        <AgentPrompt title="GitHub Scout agent prompt" prompt={SCOUT_PROMPT} />
      </section>

      <section className="ops-panel p-4">
        <h2 className="ops-label">Dual-forge pairing</h2>
        <p className="mt-2 text-[12px] text-[var(--ftw-muted)]">
          Examples: OpenCTI-style public CTI notes + HF embeddings; WorldMonitor
          public signals + Whisper (authorized audio only); Scout code inventory +
          CodeBERT research baselines only. Field models via{' '}
          <Link to="/models" className="ops-accent">
            /models
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
