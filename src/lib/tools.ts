/** Public tools catalog — dual-forge peers. */
export type ToolEntry = {
  id: string
  name: string
  lane: 'github' | 'huggingface' | 'bridge'
  opsRole: string
  href: string
  summary: string
}

export const TOOLS: ToolEntry[] = [
  {
    id: 'gh-scout',
    name: 'GitHub Scout',
    lane: 'github',
    opsRole: 'Discover',
    href: '/daemon',
    summary: 'Public repos only. Rate-limited. legal_risk tags. Agent setup prompts.',
  },
  {
    id: 'hf-model-scout',
    name: 'HF Model Scout',
    lane: 'huggingface',
    opsRole: 'Discover',
    href: '/models',
    summary: 'Public models / datasets / spaces via hub search. Seed fallback if empty.',
  },
  {
    id: 'implementer-sdk',
    name: 'Implementer SDK',
    lane: 'github',
    opsRole: 'Package',
    href: '/daemon#packages',
    summary: 'Typed contracts for legal implementer workflows.',
  },
  {
    id: 'geolite2-bridge',
    name: 'GeoLite2 Bridge',
    lane: 'github',
    opsRole: 'Geo',
    href: '/daemon#packages',
    summary: 'City/ASN geo only. MaxMind license honesty. No household claims.',
  },
  {
    id: 'tarx-bridge',
    name: 'TARX Bridge',
    lane: 'bridge',
    opsRole: 'Field',
    href: '/models#tarx',
    summary: 'Upstream local private runtime. Pull models offline; never vendor TARX.',
  },
  {
    id: 'ops-flywheel',
    name: 'Ops Flywheel',
    lane: 'bridge',
    opsRole: 'Compound',
    href: '/activity',
    summary: 'Dual-forge pulse: GH Scout + HF Scout + model_pull + package events.',
  },
]
