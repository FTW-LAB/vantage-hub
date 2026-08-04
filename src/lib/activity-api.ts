import { createServerFn } from '@tanstack/react-start'
import { loadFlywheelEvents, loadPulse } from './flywheel'
import { runHfScout } from './hf-scout'
import { BRAND, GH_PACKAGES } from './brand'
import { CURATED_HF, HF_QUERY_PACKS } from './hf-catalog'
import { TOOLS } from './tools'

function serverToken(): string | undefined {
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || undefined
}

export const getActivity = createServerFn({ method: 'GET' }).handler(
  async () => {
    return loadFlywheelEvents({
      token: serverToken(),
      org: process.env.VITE_PUBLIC_GITHUB_ORG || BRAND.githubOrg,
    })
  },
)

export const getPulse = createServerFn({ method: 'GET' }).handler(async () => {
  return loadPulse(serverToken())
})

export const getHfScout = createServerFn({ method: 'GET' })
  .validator((data: { packId?: string } | undefined) => data ?? {})
  .handler(async ({ data }) => {
    return runHfScout(data?.packId)
  })

export const getModelsPage = createServerFn({ method: 'GET' }).handler(
  async () => {
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
    return {
      packages: GH_PACKAGES,
      tools: TOOLS.filter((t) => t.lane === 'github' || t.lane === 'bridge'),
      brand: {
        productHouse: BRAND.productHouse,
        githubOrg: BRAND.githubOrg,
        doctrine: BRAND.doctrine,
      },
    }
  },
)

export const getHomeData = createServerFn({ method: 'GET' }).handler(
  async () => {
    const pulse = await loadPulse(serverToken())
    return {
      pulse,
      tools: TOOLS,
      doctrine: BRAND.doctrine,
      tagline: BRAND.tagline,
      productHouse: BRAND.productHouse,
      productHub: BRAND.productHub,
      githubOrg: BRAND.githubOrg,
      hfOrg: BRAND.hfOrg,
      hfUrl: BRAND.hfUrl,
    }
  },
)
