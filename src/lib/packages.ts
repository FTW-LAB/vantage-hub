/**
 * Canonical package REPOS — single source for site /tools, daemon, flywheel, READMEs.
 * Paths: github.com/FTW-LAB/<id>
 * Note: org constant lives here to avoid circular import with brand.ts
 */
export const GITHUB_ORG = 'FTW-LAB' as const

export type PackageRepo = {
  id: string
  opsRole: string
  stage: 'discover' | 'package' | 'field' | 'compound'
  summary: string
  securityNote: string
  githubPath: string
  clone: string
  siteHref: string
  agentPrompt: string
  hfModels?: string[]
}

export const REPOS: PackageRepo[] = [
  {
    id: 'vantage-hub',
    opsRole: 'Product hub',
    stage: 'compound',
    summary: 'Public dual-forge ops board (this site). GH code lane + HF model lane.',
    securityNote: 'No secrets in git. Legal OSINT posture only.',
    githubPath: `github.com/${GITHUB_ORG}/vantage-hub`,
    clone: `git clone https://github.com/${GITHUB_ORG}/vantage-hub.git`,
    siteHref: '/',
    agentPrompt: `You are an FTW Lab fielding agent on Vantage.
Org: FTW-LAB. Domain: ftwlab.com. Dual-forge: GitHub code + Hugging Face weights.
Rules: public-source only; no personal handles in operator-facing copy; TARX upstream only.
1) Pull hub: git clone https://github.com/FTW-LAB/vantage-hub.git
2) npm install && ./startup.sh  # 0.0.0.0:8080
3) Verify /models HF Scout and /daemon GH Scout.
Ethics gate: refuse unauthorized access.`,
    hfModels: ['BAAI/bge-small-en-v1.5'],
  },
  {
    id: 'scout-daemon',
    opsRole: 'GH Scout',
    stage: 'discover',
    summary: 'Public-repo discovery, rate-limited, legal_risk tags, agent setup prompts.',
    securityNote: 'Public repos only. No private access. Rate-limit clients.',
    githubPath: `github.com/${GITHUB_ORG}/scout-daemon`,
    clone: `git clone https://github.com/${GITHUB_ORG}/scout-daemon.git`,
    siteHref: '/daemon',
    agentPrompt: `You are FTW Lab GH Scout (org FTW-LAB).
Rules: public repositories only; rate-limited; tag legal_risk; no private access.
1) Inventory FTW-LAB public packages.
2) Emit gh_scout events with repo + legal_risk + summary.
3) Pair discoveries with HF Scout on /models when models enrich the repo.
Ethics gate: refuse credential stuffing and unauthorized scanning.`,
    hfModels: ['ehsanaghaei/SecureBERT', 'microsoft/codebert-base'],
  },
  {
    id: 'implementer-sdk',
    opsRole: 'Package',
    stage: 'package',
    summary: 'Typed implementer contracts and legal-use headers for fielding workflows.',
    securityNote: 'Package telemetry only — no weight phone-home.',
    githubPath: `github.com/${GITHUB_ORG}/implementer-sdk`,
    clone: `git clone https://github.com/${GITHUB_ORG}/implementer-sdk.git`,
    siteHref: '/tools',
    agentPrompt: `You are an FTW Lab implementer agent (org FTW-LAB).
Rules: legal-use headers; AUP; public-source fielding only.
1) Clone implementer-sdk from FTW-LAB.
2) Wire package contracts without dark telemetry on model weights.
3) Log package events to Ops flywheel kinds ops_package only.
Ethics gate: no unauthorized systems.`,
  },
  {
    id: 'geolite2-bridge',
    opsRole: 'Geo (city/ASN)',
    stage: 'package',
    summary: 'MaxMind GeoLite2 bridge helpers. City/ASN class only — no household GeoIP.',
    securityNote: 'Respect MaxMind GeoLite2 license and attribution.',
    githubPath: `github.com/${GITHUB_ORG}/geolite2-bridge`,
    clone: `git clone https://github.com/${GITHUB_ORG}/geolite2-bridge.git`,
    siteHref: '/tools',
    agentPrompt: `You are an FTW Lab geo bridge agent (org FTW-LAB).
Rules: MaxMind honesty — city/ASN only; never claim household GeoIP.
1) Clone geolite2-bridge; follow MaxMind download ToS.
2) Document attribution in field notes.
Ethics gate: no stalking / household identification claims.`,
    hfModels: [],
  },
  {
    id: 'redirect-intel',
    opsRole: 'Signal',
    stage: 'discover',
    summary: 'Public redirect / infrastructure intel helpers.',
    securityNote: 'Public sources only. No credentialed scanning.',
    githubPath: `github.com/${GITHUB_ORG}/redirect-intel`,
    clone: `git clone https://github.com/${GITHUB_ORG}/redirect-intel.git`,
    siteHref: '/tools',
    agentPrompt: `You are an FTW Lab signal agent (org FTW-LAB) for redirect-intel.
Rules: public infrastructure signals only; authorized targets only.
1) Clone redirect-intel.
2) Record legal_risk on every hit.
Ethics gate: no covert intercept.`,
  },
  {
    id: 'tarx-bridge',
    opsRole: 'Field',
    stage: 'field',
    summary: 'TARX upstream-only interop. Local private runtime — do not vendor TARX.',
    securityNote: 'Integrate upstream; never rebrand proprietary TARX surfaces.',
    githubPath: `github.com/${GITHUB_ORG}/tarx-bridge`,
    clone: `git clone https://github.com/${GITHUB_ORG}/tarx-bridge.git`,
    siteHref: '/models#tarx',
    agentPrompt: `You are an FTW Lab fielding agent for TARX bridge (org FTW-LAB).
Rules: TARX is upstream local private runtime — integrate, do not vendor.
1) Clone tarx-bridge notes.
2) Pull HF models offline to operator metal only (huggingface-cli).
3) Log model_pull offline=true + license_reviewed=true.
Ethics gate: no illegal weight rehost; no dark phone-home on weights.`,
    hfModels: [
      'TheBloke/Mistral-7B-Instruct-v0.2-GGUF',
      'BAAI/bge-small-en-v1.5',
    ],
  },
  {
    id: 'ecosystem-prompts',
    opsRole: 'Prompts',
    stage: 'package',
    summary: 'Agent prompt packs for dual-forge GH + HF fielding.',
    securityNote: 'Prompts must include ethics gates and FTW-LAB org naming.',
    githubPath: `github.com/${GITHUB_ORG}/ecosystem-prompts`,
    clone: `git clone https://github.com/${GITHUB_ORG}/ecosystem-prompts.git`,
    siteHref: '/use-cases',
    agentPrompt: `You are an FTW Lab prompt curator (org FTW-LAB).
Rules: every prompt includes legal public-source ethics gate; org FTW-LAB only.
1) Clone ecosystem-prompts.
2) Align prompts with /models agent blocks and /daemon Scout setup.
Ethics gate: no classified cosplay; no personal handle marketing.`,
  },
  {
    id: 'sovereignty-lab-kit',
    opsRole: 'Sovereignty',
    stage: 'compound',
    summary: 'Local-first kit defaults and evidence-friendly checklists.',
    securityNote: 'Offline-first evidence; no forced cloud identity.',
    githubPath: `github.com/${GITHUB_ORG}/sovereignty-lab-kit`,
    clone: `git clone https://github.com/${GITHUB_ORG}/sovereignty-lab-kit.git`,
    siteHref: '/use-cases',
    agentPrompt: `You are an FTW Lab sovereignty kit agent (org FTW-LAB).
Rules: local-first; evidence checklist; dual-forge offline fielding.
1) Clone sovereignty-lab-kit.
2) Pair with GGUF model_pull via tarx-bridge for offline SOC lab.
Ethics gate: authorized use only.`,
    hfModels: ['TheBloke/Mistral-7B-Instruct-v0.2-GGUF'],
  },
  {
    id: 'hf-model-scout',
    opsRole: 'HF Scout',
    stage: 'discover',
    summary: 'Hugging Face public model discovery for FTW Lab dual-forge.',
    securityNote: 'Public hub API only. License review before fielding. No illegal rehost.',
    githubPath: `github.com/${GITHUB_ORG}/hf-model-scout`,
    clone: `git clone https://github.com/${GITHUB_ORG}/hf-model-scout.git`,
    siteHref: '/models',
    agentPrompt: `You are FTW Lab HF Model Scout (org FTW-LAB).
Rules: public Hugging Face artifacts only; User-Agent ftwlab-scout; ethics gates in prompts.
1) Clone hf-model-scout.
2) Run hub search packs (CTI, embeddings, GGUF, code security).
3) Emit hf_scout events; pair with FTW-LAB packages via /use-cases.
Ethics gate: no unauthorized data; no weight rehost.`,
    hfModels: ['BAAI/bge-small-en-v1.5', 'ehsanaghaei/SecureBERT'],
  },
]

export function packageById(id: string) {
  return REPOS.find((r) => r.id === id)
}

export function githubHttps(id: string) {
  return `https://github.com/${GITHUB_ORG}/${id}`
}
