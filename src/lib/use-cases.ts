/**
 * Use-cases = join table between packages, HF models, and ops stages.
 * Only real tool slugs from REPOS / tools catalog.
 */
export type UseCase = {
  id: string
  title: string
  summary: string
  packages: string[]
  models: string[]
  /** catalog_only = model listed for discovery without package install path */
  modelScope: 'bridged' | 'catalog_only'
  opsAction: string
  legalRisk: 'low' | 'medium' | 'review'
}

export const USE_CASES: UseCase[] = [
  {
    id: 'cti-offline',
    title: 'Offline CTI text labs',
    summary:
      'Public CTI notes + SecureBERT/BGE style embeddings. Scout inventories public repos only.',
    packages: ['scout-daemon', 'ecosystem-prompts', 'tarx-bridge'],
    models: ['ehsanaghaei/SecureBERT', 'BAAI/bge-small-en-v1.5'],
    modelScope: 'bridged',
    opsAction: 'GH Scout public CTI repos → HF pull → TARX-local embed',
    legalRisk: 'low',
  },
  {
    id: 'code-sec-research',
    title: 'Code security research baselines',
    summary:
      'CodeBERT research only — not a vuln oracle. Pair with public code Scout.',
    packages: ['scout-daemon', 'ecosystem-prompts'],
    models: ['microsoft/codebert-base'],
    modelScope: 'bridged',
    opsAction: 'Research baseline on public code only',
    legalRisk: 'low',
  },
  {
    id: 'osint-retrieval',
    title: 'Public-source OSINT retrieval',
    summary: 'BGE embeddings over public Scout summaries — no private issue bodies.',
    packages: ['scout-daemon', 'implementer-sdk', 'vantage-hub'],
    models: ['BAAI/bge-small-en-v1.5'],
    modelScope: 'bridged',
    opsAction: 'Index public Scout notes offline',
    legalRisk: 'low',
  },
  {
    id: 'authorized-asr',
    title: 'Authorized transcription',
    summary: 'Whisper for operator-authorized audio only. Consent and law required.',
    packages: ['tarx-bridge', 'ecosystem-prompts'],
    models: ['openai/whisper-large-v3'],
    modelScope: 'bridged',
    opsAction: 'Offline pull + authorization path in run notes',
    legalRisk: 'medium',
  },
  {
    id: 'sovereign-soc-lab',
    title: 'Sovereign offline SOC lab',
    summary: 'GGUF local LLM + sovereignty kit + TARX upstream runtime.',
    packages: ['tarx-bridge', 'sovereignty-lab-kit', 'implementer-sdk'],
    models: ['TheBloke/Mistral-7B-Instruct-v0.2-GGUF'],
    modelScope: 'bridged',
    opsAction: 'model_pull offline=true · license_reviewed=true',
    legalRisk: 'review',
  },
  {
    id: 'geo-city-asn',
    title: 'City/ASN geo (not household)',
    summary: 'GeoLite2 bridge honesty. Place NLP models remain public-hub catalog only.',
    packages: ['geolite2-bridge'],
    models: [],
    modelScope: 'catalog_only',
    opsAction: 'MaxMind attribution + city/ASN class signals only',
    legalRisk: 'low',
  },
  {
    id: 'redirect-public-signals',
    title: 'Public redirect signals',
    summary: 'redirect-intel for public infrastructure signals — no covert intercept.',
    packages: ['redirect-intel', 'scout-daemon'],
    models: [],
    modelScope: 'catalog_only',
    opsAction: 'legal_risk tag every hit',
    legalRisk: 'medium',
  },
]
