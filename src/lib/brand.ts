/** FTW Lab brand constants (locked). */
export const BRAND = {
  productHouse: 'FTW Lab',
  domain: 'ftwlab.com',
  hostname: (import.meta.env.VITE_PUBLIC_HOSTNAME as string | undefined) || 'ftwlab.com',
  color: '#38ADFA',
  colorRgb: '56, 173, 250',
  email: 'ops@ftwlab.com',
  humanGithub: 'wantzjt',
  /** Set after org create; override with VITE_PUBLIC_GITHUB_ORG */
  githubOrg:
    (import.meta.env.VITE_PUBLIC_GITHUB_ORG as string | undefined) || 'ftwforge',
  logoPath: '/ftw-logo.png',
  tagline: 'Sovereign open tooling. Legal public-source only.',
  posture: 'Legal OSINT / public-source only. No unauthorized access.',
} as const

export const FLYWHEEL_STAGES = [
  {
    id: 'scout',
    label: 'Scout',
    repo: 'scout-daemon',
    description: 'Public-source discovery and signal collection.',
  },
  {
    id: 'vantage',
    label: 'Vantage',
    repo: 'vantage-hub',
    description: 'Hub surface — activity pulse, identity, and lab status.',
  },
  {
    id: 'implement',
    label: 'Implement',
    repo: 'implementer-sdk',
    description: 'Typed hooks for legal implementer workflows.',
  },
  {
    id: 'bridge',
    label: 'Bridge',
    repo: 'tarx-bridge',
    description: 'Upstream TARX interop only — no proprietary forks.',
  },
  {
    id: 'sovereignty',
    label: 'Sovereignty',
    repo: 'sovereignty-lab-kit',
    description: 'Local-first kits and evidence-friendly defaults.',
  },
] as const
