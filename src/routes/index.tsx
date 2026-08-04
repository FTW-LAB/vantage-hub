import { createFileRoute, Link } from '@tanstack/react-router'
import { FLYWHEEL_STAGES } from '#/lib/brand'
import { getHomeData } from '#/lib/activity-api'
import { PulseStrip } from '#/components/PulseStrip'
import { CopyPage } from '#/components/CopyPage'
import { REPOS } from '#/lib/packages'
import { CURATED_HF } from '#/lib/hf-catalog'

export const Route = createFileRoute('/')({
  loader: () => getHomeData(),
  component: Home,
})

function Home() {
  const data = Route.useLoaderData()

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="ops-label">Unclassified · product hub</div>
          <CopyPage
            title="Home"
            body={`Packages: ${REPOS.map((r) => r.id).join(', ')}\nHF curated: ${CURATED_HF.map((m) => m.repoId).join(', ')}`}
          />
        </div>
        <h1 className="text-2xl font-semibold tracking-[0.06em] text-white uppercase sm:text-3xl">
          {data.productHouse}
          <span className="block text-[var(--ftw-muted)] sm:inline sm:before:content-['·_']">
            {data.productHub}
          </span>
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--ftw-muted)]">
          {data.tagline}
        </p>
        <p className="ops-label">{data.doctrine}</p>
        <div className="flex flex-wrap gap-2">
          <Link to="/models" className="ops-btn ops-btn-solid no-underline">
            HF Models
          </Link>
          <Link to="/tools" className="ops-btn no-underline">
            Packages
          </Link>
          <Link to="/daemon" className="ops-btn no-underline">
            GH Daemon
          </Link>
          <Link to="/activity" className="ops-btn no-underline">
            Ops flywheel
          </Link>
        </div>
      </section>

      <section className="ops-panel overflow-x-auto p-3 sm:p-4">
        <div className="ops-label mb-2">Packages (clone)</div>
        <table className="w-full min-w-[520px] text-left text-[11px]">
          <tbody>
            {REPOS.map((r) => (
              <tr key={r.id} className="border-t border-[var(--ftw-border)]">
                <td className="py-1.5 pr-3 font-mono text-white">{r.id}</td>
                <td className="ops-pre py-1.5 text-[10px] text-[var(--ftw-muted)]">
                  {r.clone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="ops-panel overflow-x-auto p-3 sm:p-4">
        <div className="ops-label mb-2">HF curated (public hub)</div>
        <table className="w-full min-w-[480px] text-left text-[11px]">
          <tbody>
            {CURATED_HF.map((m) => (
              <tr key={m.id} className="border-t border-[var(--ftw-border)]">
                <td className="py-1.5 pr-3 text-white">{m.title}</td>
                <td className="py-1.5 pr-3 font-mono text-[var(--ftw-muted)] break-all">
                  {m.repoId}
                </td>
                <td className="py-1.5 text-[var(--ftw-label)]">{m.catalogScope}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <div className="ops-panel p-4">
          <div className="ops-label">GitHub lane</div>
          <p className="mt-2 text-sm text-white">Code · packages · public Scout</p>
          <p className="mt-1 text-[12px] text-[var(--ftw-muted)]">
            Org repos under {data.githubOrg}. Rate-limited public discovery only.
          </p>
          <Link
            to="/daemon"
            className="mt-3 inline-block text-[11px] tracking-wide uppercase no-underline ops-accent"
          >
            Open daemon →
          </Link>
        </div>
        <div className="ops-panel p-4">
          <div className="ops-label">Hugging Face lane</div>
          <p className="mt-2 text-sm text-white">Models · datasets · spaces</p>
          <p className="mt-1 text-[12px] text-[var(--ftw-muted)]">
            Hub account {data.hfOrg}. License-respecting offline fielding.
          </p>
          <a
            href={data.hfUrl}
            className="mt-1 block break-all text-[11px] no-underline ops-accent"
            rel="noreferrer"
            target="_blank"
          >
            {data.hfUrl}
          </a>
          <Link
            to="/models"
            className="mt-3 inline-block text-[11px] tracking-wide uppercase no-underline ops-accent"
          >
            Open models →
          </Link>
        </div>
      </section>

      <PulseStrip events={data.pulse.events} live={data.pulse.live} />

      <section>
        <h2 className="ops-label mb-3">Flywheel</h2>
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {FLYWHEEL_STAGES.map((s, i) => (
            <li key={s.id} className="ops-panel p-3">
              <div className="ops-accent text-[10px] tracking-widest">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mt-1 text-xs font-semibold tracking-wide text-white uppercase">
                {s.label}
              </div>
              <p className="mt-1 text-[11px] text-[var(--ftw-muted)]">{s.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="tools">
        <h2 className="ops-label mb-3">Tools catalog</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {data.tools.map((t) => (
            <Link
              key={t.id}
              to={t.href.startsWith('/') ? t.href.split('#')[0] : '/'}
              className="ops-panel block p-3 no-underline transition-colors hover:border-[rgba(56,173,250,0.25)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="ops-chip">{t.lane}</span>
                <span className="ops-chip ops-chip-live">{t.opsRole}</span>
              </div>
              <div className="mt-2 text-sm text-white">{t.name}</div>
              <p className="mt-1 text-[11px] text-[var(--ftw-muted)]">{t.summary}</p>
              {t.id === 'hf-model-scout' ? (
                <span className="mt-2 inline-block text-[10px] ops-accent">
                  id: hf-model-scout
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      </section>

      <section className="ops-panel p-4">
        <div className="ops-label">Sovereign stack</div>
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--ftw-muted)]">
          GitHub × Hugging Face as one dual-forge: public discovery, local inference
          on TARX-upstream metal, offline geo (city/ASN only — no household GeoIP).
          No consulting arm. No personal contributor marketing.
        </p>
      </section>
    </div>
  )
}
