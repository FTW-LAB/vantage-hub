import { createFileRoute } from '@tanstack/react-router'
import { BRAND } from '#/lib/brand'

export const Route = createFileRoute('/legal')({
  component: LegalPage,
})

function LegalPage() {
  return (
    <article className="prose prose-invert max-w-none space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Legal & acceptable use</h1>
        <p className="mt-2 text-zinc-400">
          {BRAND.productHouse} publishes open tooling under a legal public-source
          (OSINT) posture only.
        </p>
      </header>

      <section className="rounded-xl border border-white/10 bg-zinc-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Acceptable use (AUP)</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-400">
          <li>
            Use only publicly available information and systems you are authorized
            to access.
          </li>
          <li>
            No unauthorized access, credential stuffing, malware distribution, or
            exploitation of non-public vulnerabilities.
          </li>
          <li>
            No targeting of personal data beyond what is lawfully published by the
            data subject or a public authority.
          </li>
          <li>
            TARX integration is <strong className="text-zinc-200">upstream only</strong>{' '}
            — do not rebrand or fork proprietary TARX surfaces as FTW Lab product.
          </li>
          <li>
            Security issues: report to{' '}
            <a className="text-[#38ADFA]" href={`mailto:${BRAND.email}`}>
              {BRAND.email}
            </a>{' '}
            (see SECURITY.md in each repo).
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-white/10 bg-zinc-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">OSINT posture</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Flywheel activity on this site merges public GitHub events for{' '}
          {BRAND.humanGithub} and the {BRAND.githubOrg} organization with local
          seed / implementer / scout_runs metadata. No private repos, no private
          emails, no non-public telemetry.
        </p>
      </section>

      <section className="rounded-xl border border-white/10 bg-zinc-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Contact</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Ops:{' '}
          <a className="text-[#38ADFA]" href={`mailto:${BRAND.email}`}>
            {BRAND.email}
          </a>
        </p>
      </section>
    </article>
  )
}
