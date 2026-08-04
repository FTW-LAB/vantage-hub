/**
 * FTW Lab brand — public surface constants only.
 * Never export personal handles for UI rendering.
 */
import { REPOS } from './packages'

export const BRAND = {
  productHouse: 'FTW Lab',
  productHub: 'Vantage',
  domain: 'ftwlab.com',
  hostname:
    (import.meta.env.VITE_PUBLIC_HOSTNAME as string | undefined) || 'ftwlab.com',
  /** CSS uses --ftw-accent; do not print this hex in public UI copy. */
  accentToken: 'var(--ftw-accent)',
  email: 'ops@ftwlab.com',
  /** Org lane only — never personal handles on public UI */
  githubOrg:
    (import.meta.env.VITE_PUBLIC_GITHUB_ORG as string | undefined) || 'FTW-LAB',
  githubUrl:
    (import.meta.env.VITE_PUBLIC_GITHUB_URL as string | undefined) ||
    'https://github.com/FTW-LAB',
  hfOrg: (import.meta.env.VITE_PUBLIC_HF_ORG as string | undefined) || 'FTWLAB',
  hfUrl: 'https://huggingface.co/FTWLAB',
  logoPath: '/ftw-logo.png',
  tagline: 'Dual-forge sovereign tooling. Code on GitHub. Weights on Hugging Face.',
  posture:
    'Legal public-source only. Authorized use. MaxMind honesty. HF license respect.',
  doctrine: 'Discover → Contribute → Package → Field → Compound',
} as const

/** @deprecated prefer REPOS from packages.ts — kept for daemon page compat */
export const GH_PACKAGES = REPOS.map((r) => ({
  id: r.id,
  label: r.id,
  opsRole: r.opsRole,
  description: r.summary,
}))

export const FLYWHEEL_STAGES = [
  { id: 'discover', label: 'Discover', detail: 'GH Scout + HF Scout (public only)' },
  { id: 'contribute', label: 'Contribute', detail: 'Patches, datasets, eval notes' },
  { id: 'package', label: 'Package', detail: 'SDKs, bridges, catalog rows' },
  { id: 'field', label: 'Field', detail: 'Clone repo or pull model to TARX-local' },
  { id: 'compound', label: 'Compound', detail: 'Ops flywheel + offline evidence' },
] as const

/** Reserved route tokens for short-code hygiene */
export const ROUTE_TOKENS = [
  'about',
  'terms',
  'legal',
  'security',
  'models',
  'daemon',
  'tools',
  'use-cases',
  'activity',
  'links',
  'ecosystem',
] as const
