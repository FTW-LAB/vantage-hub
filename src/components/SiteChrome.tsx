import { Link } from '@tanstack/react-router'
import { BRAND } from '#/lib/brand'

const nav = [
  { to: '/', label: 'Home', exact: true },
  { to: '/tools', label: 'Tools' },
  { to: '/models', label: 'Models' },
  { to: '/daemon', label: 'Daemon' },
  { to: '/links', label: 'Links' },
  { to: '/use-cases', label: 'Use-cases' },
  { to: '/activity', label: 'Ops' },
  { to: '/security', label: 'Security' },
] as const

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="ops-shell min-h-screen bg-[var(--ftw-void)] text-[#e8e8ec]">
      <div className="border-b border-[var(--ftw-border)] bg-black/50">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-3 py-1.5 text-[10px] tracking-[0.12em] text-[var(--ftw-label)] uppercase sm:px-4">
          <span className="ops-accent">UNCLASSIFIED // PUBLIC SOURCE</span>
          <span className="truncate">INFOSEC · OSINT · CTI · GEOIP · MODELS</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-[var(--ftw-border)] bg-[rgba(5,5,6,0.92)] backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 no-underline">
            <img
              src={BRAND.logoPath}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 rounded-sm"
            />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-xs font-semibold tracking-[0.12em] text-white uppercase">
                {BRAND.productHouse}
              </div>
              <div className="ops-label truncate">
                {BRAND.productHub} · dual-forge
              </div>
            </div>
          </Link>
          <nav className="flex max-w-full flex-wrap items-center gap-0.5 sm:gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-sm px-2 py-1.5 text-[11px] tracking-[0.1em] text-[var(--ftw-muted)] uppercase no-underline hover:bg-white/5 hover:text-white [&.active]:bg-[var(--ftw-accent-dim)] [&.active]:text-[var(--ftw-accent)] sm:px-2.5"
                activeOptions={{ exact: 'exact' in item ? item.exact : false }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-3 py-8 sm:px-4 sm:py-10">{children}</main>

      <footer className="border-t border-[var(--ftw-border)] py-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-3 text-[11px] text-[var(--ftw-label)] sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <p className="tracking-wide">
            {BRAND.productHouse} · unclassified ops board · {BRAND.domain} ·{' '}
            <Link to="/legal" className="ops-accent no-underline">
              legal
            </Link>
          </p>
          <p className="max-w-md text-[10px] leading-relaxed">{BRAND.posture}</p>
        </div>
      </footer>
    </div>
  )
}
