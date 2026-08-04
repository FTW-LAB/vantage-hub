import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { getModelsPage, getHfScout } from '#/lib/activity-api'
import { CatalogCard } from '#/components/CatalogCard'
import type { HfScoutResult } from '#/lib/hf-scout'

export const Route = createFileRoute('/models')({
  loader: () => getModelsPage(),
  component: ModelsPage,
})

function ModelsPage() {
  const initial = Route.useLoaderData()
  const [scout, setScout] = useState<HfScoutResult>(initial.scout)
  const [packId, setPackId] = useState(initial.scout.packId)
  const [busy, setBusy] = useState(false)

  async function runScout(nextPack?: string) {
    setBusy(true)
    try {
      const res = await getHfScout({
        data: { packId: nextPack || packId },
      })
      setScout(res)
      if (nextPack) setPackId(nextPack)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <div className="ops-label">Hugging Face lane · dual-forge HQ</div>
        <h1 className="text-2xl font-semibold tracking-[0.06em] text-white uppercase">
          Models
        </h1>
        <p className="max-w-2xl text-sm text-[var(--ftw-muted)]">
          HF Model Scout discovers public models, datasets, and spaces. Curated
          catalog rows include infosec use, legal risk, GitHub bridge notes, TARX
          pull, ops action, and copy-paste agent prompts. Never rehost weights
          illegally — operator-controlled cache only.
        </p>
        <div className="flex flex-wrap gap-2 text-[11px]">
          <a
            href={initial.brand.hfUrl}
            className="ops-chip ops-chip-live no-underline"
            rel="noreferrer"
            target="_blank"
          >
            {initial.brand.hfOrg}
          </a>
          <Link to="/daemon" className="ops-chip no-underline">
            Cross-link: GH Daemon
          </Link>
          <Link to="/activity" className="ops-chip no-underline">
            Ops flywheel
          </Link>
        </div>
      </header>

      <section className="ops-panel p-3 sm:p-4" id="scout">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="ops-label">HF Model Scout</h2>
          <span className={`ops-chip ${scout.mode === 'live' ? 'ops-chip-live' : ''}`}>
            {scout.mode === 'live' ? 'live hub API' : 'seed_only'}
          </span>
        </div>
        <p className="mt-2 text-[11px] text-[var(--ftw-muted)]">
          Public API: huggingface.co/api/models · User-Agent ftwlab-scout ·
          timeout + graceful seed fallback
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {initial.packs.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`ops-btn ${packId === p.id ? 'ops-btn-solid' : ''}`}
              disabled={busy}
              onClick={() => runScout(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            className="ops-btn ops-btn-solid"
            disabled={busy}
            onClick={() => runScout()}
          >
            {busy ? 'Scouting…' : 'Run HF Scout'}
          </button>
          <span className="self-center text-[10px] text-[var(--ftw-label)]">
            pack={scout.packId} · q={scout.query}
          </span>
        </div>

        {scout.note ? (
          <p className="mt-2 text-[11px] text-amber-200/80">{scout.note}</p>
        ) : null}

        {scout.hits.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {scout.hits.map((h) => (
              <li
                key={h.id || h.modelId}
                className="border border-[var(--ftw-border)] bg-black/30 px-3 py-2"
              >
                <a
                  href={`https://huggingface.co/${h.modelId}`}
                  className="break-all text-[12px] no-underline hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  {h.modelId}
                </a>
                <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-[var(--ftw-label)]">
                  {h.pipeline_tag ? <span>{h.pipeline_tag}</span> : null}
                  {typeof h.downloads === 'number' ? (
                    <span>dl {h.downloads}</span>
                  ) : null}
                  {typeof h.likes === 'number' ? <span>♥ {h.likes}</span> : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-[12px] text-[var(--ftw-muted)]">
            No live hits — curated seed catalog below remains authoritative.
          </p>
        )}
      </section>

      <section id="catalog">
        <h2 className="ops-label mb-3">Curated catalog</h2>
        <div className="grid gap-3 lg:grid-cols-2">
          {(scout.curated.length ? scout.curated : initial.curated).map((row) => (
            <CatalogCard key={row.id} row={row} />
          ))}
        </div>
      </section>

      <section id="tarx" className="ops-panel p-4">
        <h2 className="ops-label">TARX fielding</h2>
        <p className="mt-2 text-[12px] leading-relaxed text-[var(--ftw-muted)]">
          TARX is the upstream local private runtime. Integrate via tarx-bridge —
          do not vendor. Model fielding = offline pull success + docs. No dark
          phone-home on weights. Prefer{' '}
          <code className="text-[var(--ftw-accent)]">huggingface-cli download</code>{' '}
          into operator-controlled cache on metal.
        </p>
      </section>

      <section className="ops-panel p-4">
        <h2 className="ops-label">Legal rails</h2>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-[12px] text-[var(--ftw-muted)]">
          <li>Public HF artifacts only; respect each model card license</li>
          <li>No illegal rehost of weights</li>
          <li>Geo / place NLP is not household GeoIP</li>
          <li>Ethics gates required in every agent prompt</li>
        </ul>
      </section>
    </div>
  )
}
