/**
 * FTW Lab brand — public surface constants only.
 * Never export personal handles for UI rendering.
 */
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
  hfOrg: (import.meta.env.VITE_PUBLIC_HF_ORG as string | undefined) || 'FTWLAB',
  hfUrl: 'https://huggingface.co/FTWLAB',
  logoPath: '/ftw-logo.png',
  tagline: 'Dual-forge sovereign tooling. Code on GitHub. Weights on Hugging Face.',
  posture:
    'Legal public-source only. Authorized use. MaxMind honesty. HF license respect.',
  doctrine: 'Discover → Contribute → Package → Field → Compound',
} as const

/** GitHub package beachheads (public org repos). */
export const GH_PACKAGES = [
  {
    id: 'scout-daemon',
    label: 'scout-daemon',
    opsRole: 'GitHub Scout',
    description: 'Public-repo discovery, rate-limited, legal_risk tags, agent setup prompts.',
  },
  {
    id: 'implementer-sdk',
    label: 'implementer-sdk',
    opsRole: 'Package',
    description: 'Typed implementer contracts and legal-use headers.',
  },
  {
    id: 'geolite2-bridge',
    label: 'geolite2-bridge',
    opsRole: 'Geo (city/ASN only)',
    description: 'MaxMind GeoLite2 bridge. No household GeoIP claims.',
  },
  {
    id: 'redirect-intel',
    label: 'redirect-intel',
    opsRole: 'Signal',
    description: 'Public redirect / infrastructure intel helpers.',
  },
  {
    id: 'tarx-bridge',
    label: 'tarx-bridge',
    opsRole: 'Field',
    description: 'TARX upstream-only interop. Local private runtime — do not vendor.',
  },
  {
    id: 'ecosystem-prompts',
    label: 'ecosystem-prompts',
    opsRole: 'Prompts',
    description: 'Agent prompt packs for dual-forge fielding.',
  },
] as const

export const FLYWHEEL_STAGES = [
  { id: 'discover', label: 'Discover', detail: 'GH Scout + HF Scout (public only)' },
  { id: 'contribute', label: 'Contribute', detail: 'Patches, datasets, eval notes' },
  { id: 'package', label: 'Package', detail: 'SDKs, bridges, catalog rows' },
  { id: 'field', label: 'Field', detail: 'Clone repo or pull model to TARX-local' },
  { id: 'compound', label: 'Compound', detail: 'Ops flywheel + offline evidence' },
] as const
