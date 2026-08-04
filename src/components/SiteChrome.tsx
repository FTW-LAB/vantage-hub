import { Link } from '@tanstack/react-router'
import { BRAND } from '#/lib/brand'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/activity', label: 'Activity' },
  { to: '/legal', label: 'Legal' },
] as const

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-white/10 bg-zinc-950/90 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img
              src={BRAND.logoPath}
              alt="FTW Lab"
              width={36}
              height={36}
              className="h-9 w-9 rounded-md shadow-lg shadow-[rgba(56,173,250,0.35)]"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide text-white">
                {BRAND.productHouse}
              </div>
              <div className="text-[11px] text-zinc-400">{BRAND.domain}</div>
            </div>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-3 py-1.5 text-sm text-zinc-300 no-underline hover:bg-white/5 hover:text-white [&.active]:bg-[rgba(56,173,250,0.15)] [&.active]:text-[#38ADFA]"
                activeOptions={{ exact: item.to === '/' }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`https://github.com/${BRAND.githubOrg}`}
              className="ml-1 rounded-md border border-[rgba(56,173,250,0.4)] bg-[#38ADFA] px-3 py-1.5 text-sm font-medium text-black no-underline hover:bg-[#65c4ff]"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.productHouse}. Contributions by{' '}
            <a
              className="text-[#38ADFA] no-underline hover:underline"
              href={`https://github.com/${BRAND.humanGithub}`}
              rel="noreferrer"
              target="_blank"
            >
              {BRAND.humanGithub}
            </a>
            .
          </p>
          <p className="text-xs text-zinc-600">{BRAND.posture}</p>
        </div>
      </footer>
    </div>
  )
}
