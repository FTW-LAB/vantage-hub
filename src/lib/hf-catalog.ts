/**
 * Curated HF catalog — high-signal public artifacts.
 * Operator-controlled cache only; never rehost weights illegally.
 */

export type LegalRisk = 'low' | 'medium' | 'review'

export type HfCatalogRow = {
  id: string
  kind: 'model' | 'dataset' | 'space'
  repoId: string
  title: string
  summary: string
  infosecUse: string
  legalRisk: LegalRisk
  license: string
  queryPack: string
  githubBridge: string
  /** FTW-LAB package slugs that pair with this model */
  packageSlugs: string[]
  /**
   * public_hub = third-party public model (not hosted under huggingface.co/FTWLAB)
   * house = would be FTWLAB-authored (none published yet)
   */
  catalogScope: 'public_hub' | 'house'
  tarxPull: string
  opsAction: string
  opsRole: string
  agentPrompt: string
  pairings?: string[]
}

export const HF_QUERY_PACKS: { id: string; label: string; query: string; note: string }[] =
  [
    {
      id: 'cti-ner',
      label: 'CTI / NER / IOC',
      query: 'cybersecurity',
      note: 'Entity extraction for public CTI text — no private intel sources.',
    },
    {
      id: 'sec-cls',
      label: 'Security text classification',
      query: 'phishing',
      note: 'Public-label classifiers for triage labs.',
    },
    {
      id: 'osint-embed',
      label: 'OSINT embeddings',
      query: 'sentence-transformers',
      note: 'Embeddings for public-source retrieval only.',
    },
    {
      id: 'ocr-layout',
      label: 'Document OCR / layout',
      query: 'document OCR',
      note: 'Authorized document corpora only.',
    },
    {
      id: 'geo-nlp',
      label: 'Geo / place NLP',
      query: 'geoparsing',
      note: 'Place NLP only — no household GeoIP claims.',
    },
    {
      id: 'code-sec',
      label: 'Code security research',
      query: 'codebert',
      note: 'Research models; not a substitute for review.',
    },
    {
      id: 'multi-sec',
      label: 'Multilingual security NLP',
      query: 'multilingual security',
      note: 'Public multilingual security text tasks.',
    },
    {
      id: 'gguf-local',
      label: 'Local / GGUF LLMs',
      query: 'gguf',
      note: 'Sovereign SOC lab local inference; respect model licenses.',
    },
  ]

/** High-signal curated rows — honest licenses + agent prompts. */
export const CURATED_HF: HfCatalogRow[] = [
  {
    id: 'curated-securebert',
    kind: 'model',
    repoId: 'ehsanaghaei/SecureBERT',
    title: 'SecureBERT',
    summary:
      'BERT variant trained on cybersecurity text for domain language understanding.',
    infosecUse:
      'CTI note clustering, security NER fine-tunes, SOC knowledge base retrieval features.',
    legalRisk: 'low',
    license: 'Check model card (research use)',
    queryPack: 'cti-ner',
    githubBridge:
      'Pair with org scout-daemon public CTI repo inventory; never scrape private feeds.',
    packageSlugs: ['scout-daemon', 'ecosystem-prompts', 'tarx-bridge'],
    catalogScope: 'public_hub',
    tarxPull:
      'huggingface-cli download ehsanaghaei/SecureBERT --local-dir $TARX_MODELS/SecureBERT',
    opsAction: 'Pull for offline CTI embedding labs',
    opsRole: 'Discover → Field',
    agentPrompt: `You are an FTW Lab fielding agent. Task: legally pull SecureBERT for offline CTI labs.
Rules: public sources only; respect model card license; operator-controlled cache only; do not rehost weights.
1) Confirm license on https://huggingface.co/ehsanaghaei/SecureBERT
2) Pull with: huggingface-cli download ehsanaghaei/SecureBERT --local-dir $TARX_MODELS/SecureBERT
3) Wire through tarx-bridge upstream runtime (do not vendor TARX).
4) Log a model_pull event with repoId + license + offline=true.
Ethics gate: refuse private data, unauthorized access, or illegal rehost.`,
    pairings: ['OpenCTI (public) + embeddings', 'Scout public CTI repos'],
  },
  {
    id: 'curated-codebert',
    kind: 'model',
    repoId: 'microsoft/codebert-base',
    title: 'CodeBERT base',
    summary: 'Bimodal code/natural language model for code understanding research.',
    infosecUse:
      'Code security research baselines (similarity, retrieval). Not a vuln oracle.',
    legalRisk: 'low',
    license: 'MIT (verify card)',
    queryPack: 'code-sec',
    githubBridge:
      'Pair with public CodeBERT research repos and org ecosystem-prompts only.',
    packageSlugs: ['scout-daemon', 'ecosystem-prompts'],
    catalogScope: 'public_hub',
    tarxPull:
      'huggingface-cli download microsoft/codebert-base --local-dir $TARX_MODELS/codebert-base',
    opsAction: 'Research-only code security baselines',
    opsRole: 'Package → Field',
    agentPrompt: `You are an FTW Lab fielding agent. Task: pull CodeBERT for research-only code security labs.
Rules: legal public weights; MIT/card license; no production "auto-exploit" framing.
1) Read https://huggingface.co/microsoft/codebert-base license
2) Pull offline to TARX-local metal
3) Document evaluation limits — research baseline only
Ethics gate: no private repo access; no unauthorized scanning.`,
    pairings: ['Scout code public repos + CodeBERT research only'],
  },
  {
    id: 'curated-whisper',
    kind: 'model',
    repoId: 'openai/whisper-large-v3',
    title: 'Whisper large-v3',
    summary: 'Robust speech recognition model for multilingual transcription.',
    infosecUse:
      'Authorized audio/OSINT workflows (e.g. public briefings). Consent and law required.',
    legalRisk: 'medium',
    license: 'Apache-2.0 (verify card)',
    queryPack: 'ocr-layout',
    githubBridge: 'Pair with WorldMonitor-style public signal stacks; no covert wiretaps.',
    packageSlugs: ['tarx-bridge', 'ecosystem-prompts'],
    catalogScope: 'public_hub',
    tarxPull:
      'huggingface-cli download openai/whisper-large-v3 --local-dir $TARX_MODELS/whisper-large-v3',
    opsAction: 'Authorized transcription only',
    opsRole: 'Field',
    agentPrompt: `You are an FTW Lab fielding agent. Task: pull Whisper for authorized transcription labs.
Rules: operator-authorized audio only; respect Apache-2.0/card; no covert collection.
1) Confirm license on model card
2) Offline pull to TARX-local
3) Document consent/authorization path in run notes
Ethics gate: refuse unauthorized audio surveillance.`,
    pairings: ['WorldMonitor + Whisper (public signals)'],
  },
  {
    id: 'curated-bge',
    kind: 'model',
    repoId: 'BAAI/bge-small-en-v1.5',
    title: 'BGE small EN v1.5',
    summary: 'Compact English embedding model for retrieval pipelines.',
    infosecUse: 'OSINT embeddings over public corpora; dual-forge retrieval with GH Scout notes.',
    legalRisk: 'low',
    license: 'MIT (verify card)',
    queryPack: 'osint-embed',
    githubBridge: 'Index public GH Scout summaries — no private issue bodies.',
    packageSlugs: ['scout-daemon', 'implementer-sdk', 'vantage-hub', 'tarx-bridge'],
    catalogScope: 'public_hub',
    tarxPull:
      'huggingface-cli download BAAI/bge-small-en-v1.5 --local-dir $TARX_MODELS/bge-small-en-v1.5',
    opsAction: 'Build offline public-source retrieval',
    opsRole: 'Discover → Compound',
    agentPrompt: `You are an FTW Lab fielding agent. Task: field BGE embeddings for public-source OSINT retrieval.
Rules: public corpora only; MIT/card; operator cache only.
1) Pull model offline via huggingface-cli
2) Embed public Scout notes only
3) Emit model_pull + retrieval_ready events without personal identities
Ethics gate: no private data embeddings.`,
    pairings: ['OpenCTI public notes + embeddings'],
  },
  {
    id: 'curated-gguf-sec',
    kind: 'model',
    repoId: 'TheBloke/Mistral-7B-Instruct-v0.2-GGUF',
    title: 'Mistral-7B Instruct GGUF',
    summary: 'GGUF quantizations for local LLM inference on operator metal.',
    infosecUse: 'Sovereign SOC lab assistants — offline, license-respecting local inference.',
    legalRisk: 'review',
    license: 'Apache-2.0 base + quant notes (verify card)',
    queryPack: 'gguf-local',
    githubBridge: 'Pair with tarx-bridge local runtime docs; never vendor TARX.',
    packageSlugs: ['tarx-bridge', 'sovereignty-lab-kit', 'implementer-sdk'],
    catalogScope: 'public_hub',
    tarxPull:
      'huggingface-cli download TheBloke/Mistral-7B-Instruct-v0.2-GGUF --include "*Q4_K_M*" --local-dir $TARX_MODELS/mistral-7b-instruct-gguf',
    opsAction: 'Local GGUF fielding for offline SOC lab',
    opsRole: 'Field → Compound',
    agentPrompt: `You are an FTW Lab fielding agent. Task: pull a GGUF quant for sovereign offline SOC lab use.
Rules: verify license chain; operator-controlled cache; no illegal rehost; no phone-home on weights.
1) Select Q4_K_M (or operator-specified) quant from model card
2) huggingface-cli download … --local-dir $TARX_MODELS/…
3) Load via TARX upstream local runtime only
4) Log model_pull offline=true + license_reviewed=true
Ethics gate: refuse data exfil tooling; authorized use only.`,
    pairings: ['Local GGUF + tarx-bridge', 'Scout daemon setup prompts'],
  },
]
