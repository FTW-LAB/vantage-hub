import { createServerFn } from '@tanstack/react-start'
import { getFlywheelPulse } from './pulse-core'
import { runHfScout } from './hf-scout'
import { BRAND, GH_PACKAGES } from './brand'
import { CURATED_HF, HF_QUERY_PACKS } from './hf-catalog'
import { TOOLS } from './tools'
import { recordLedger, listLedger } from './site-ledger'
import { findLink, SHORT_LINKS } from './links'
import { REPOS } from './packages'
import { warmConsoleBoot } from './boot'
import { USE_CASES } from './use-cases'

function serverToken(): string | undefined {
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || undefined
}

export const getActivity = createServerFn({ method: 'GET' }).handler(
  async () => {
    const pulse = await getFlywheelPulse({ token: serverToken() })
    return {
      mode: pulse.mode,
      live: pulse.mode !== 'SEED',
      sourceCards: pulse.sources,
      sources: pulse.sources.map((s) => s.id),
      events: pulse.events,
      classification: pulse.classification,
      stack: pulse.stack,
      fetchedAt: pulse.fetchedAt,
    }
  },
)

export const getPulse = createServerFn({ method: 'GET' }).handler(async () => {
  const pulse = await getFlywheelPulse({ token: serverToken() })
  return {
    events: pulse.events.slice(0, 8),
    live: pulse.mode !== 'SEED',
    mode: pulse.mode,
    sourceCards: pulse.sources,
    classification: pulse.classification,
    stack: pulse.stack,
    fetchedAt: pulse.fetchedAt,
  }
})

export const getHfScout = createServerFn({ method: 'GET' })
  .validator((data: { packId?: string } | undefined) => data ?? {})
  .handler(async ({ data }) => {
    return runHfScout(data?.packId)
  })

export const getModelsPage = createServerFn({ method: 'GET' }).handler(
  async () => {
    // Auto-scout on load (no human Run CTA)
    const scout = await runHfScout('cti-ner')
    return {
      scout,
      packs: HF_QUERY_PACKS,
      curated: CURATED_HF,
      brand: {
        productHouse: BRAND.productHouse,
        hfOrg: BRAND.hfOrg,
        hfUrl: BRAND.hfUrl,
        githubOrg: BRAND.githubOrg,
        doctrine: BRAND.doctrine,
      },
    }
  },
)

export const getDaemonPage = createServerFn({ method: 'GET' }).handler(
  async () => {
    // Auto inventory warm
    const pulse = await getFlywheelPulse({ token: serverToken() })
    return {
      packages: GH_PACKAGES,
      tools: TOOLS.filter((t) => t.lane === 'github' || t.lane === 'bridge'),
      brand: {
        productHouse: BRAND.productHouse,
        githubOrg: BRAND.githubOrg,
        doctrine: BRAND.doctrine,
      },
      pulseSlice: pulse.events
        .filter((e) => e.source === 'org' || e.source === 'gh_scout' || e.source === 'package')
        .slice(0, 12),
      pulseMode: pulse.mode,
    }
  },
)

export const getHomeData = createServerFn({ method: 'GET' }).handler(
  async () => {
    // Zero-human open: warm ledger + scouts + activity merge
    const boot = await warmConsoleBoot(serverToken())
    const pulse = boot.pulse
    return {
      pulse: {
        events: pulse.events.slice(0, 10),
        live: pulse.mode !== 'SEED',
        mode: pulse.mode,
        sourceCards: pulse.sources,
        classification: pulse.classification,
        stack: pulse.stack,
        fetchedAt: pulse.fetchedAt,
      },
      tools: TOOLS,
      packages: REPOS,
      curated: CURATED_HF,
      cases: USE_CASES,
      doctrine: BRAND.doctrine,
      tagline: BRAND.tagline,
      productHouse: BRAND.productHouse,
      productHub: BRAND.productHub,
      githubOrg: BRAND.githubOrg,
      hfOrg: BRAND.hfOrg,
      hfUrl: BRAND.hfUrl,
      classification: pulse.classification,
      stack: pulse.stack,
      boot: {
        throttled: boot.throttled,
        bootedAt: boot.bootedAt,
        hfMode: boot.hf.mode,
        hfHits: boot.hf.hits.length,
      },
    }
  },
)

export const getLinksPage = createServerFn({ method: 'GET' }).handler(
  async () => {
    return {
      links: SHORT_LINKS,
      ledger: listLedger(15),
      repos: REPOS.map((r) => r.id),
    }
  },
)

export const hitShortLink = createServerFn({ method: 'POST' })
  .validator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const link = findLink(data.token)
    if (!link) {
      return { ok: false as const, error: 'unknown_or_reserved' }
    }
    recordLedger(
      'redirect_hit',
      `/${link.token}`,
      `→ ${link.target} · ${link.label}`,
    )
    recordLedger('access_event', `/${link.token}`, 'field proof tick')
    return { ok: true as const, target: link.target, token: link.token }
  })
