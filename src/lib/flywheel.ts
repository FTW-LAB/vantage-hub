/**
 * Flywheel activity sources — legal public GitHub events only.
 * Merges: wantzjt + org public events + implementer seed + scout_runs seed.
 * When GITHUB_TOKEN is set (server), live public events are preferred;
 * seed events remain if rate-limited or unauthenticated.
 */

import { BRAND } from './brand'

export type FlywheelSource =
  | 'wantzjt'
  | 'org'
  | 'implementer'
  | 'scout_runs'
  | 'seed'

export type FlywheelEvent = {
  id: string
  source: FlywheelSource
  stage: string
  title: string
  detail?: string
  url?: string
  actor?: string
  repo?: string
  createdAt: string
}

/** Seed events keep /activity useful when API is rate-limited. */
export const SEED_EVENTS: FlywheelEvent[] = [
  {
    id: 'seed-vantage-boot',
    source: 'seed',
    stage: 'vantage',
    title: 'Vantage Hub online',
    detail: 'Public hub surface for FTW Lab flywheel stages.',
    actor: BRAND.productHouse,
    repo: 'vantage-hub',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-scout-pass',
    source: 'scout_runs',
    stage: 'scout',
    title: 'Scout run: public GitHub org inventory',
    detail: 'Legal public-source scan of org beachhead repos.',
    actor: 'scout-daemon',
    repo: 'scout-daemon',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'seed-implementer',
    source: 'implementer',
    stage: 'implement',
    title: 'Implementer SDK contract freeze',
    detail: 'AUP + legal-use headers documented for integrators.',
    actor: BRAND.humanGithub,
    repo: 'implementer-sdk',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'seed-bridge',
    source: 'seed',
    stage: 'bridge',
    title: 'TARX bridge: upstream-only posture',
    detail: 'tarx-bridge documents consume-only upstream integration.',
    actor: BRAND.humanGithub,
    repo: 'tarx-bridge',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: 'seed-sovereignty',
    source: 'seed',
    stage: 'sovereignty',
    title: 'Sovereignty lab kit published',
    detail: 'Local-first defaults and evidence checklist.',
    actor: BRAND.productHouse,
    repo: 'sovereignty-lab-kit',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
  },
]

type GhEvent = {
  id: string
  type: string
  actor?: { login?: string }
  repo?: { name?: string }
  created_at?: string
  payload?: Record<string, unknown>
}

function mapGhEvent(
  e: GhEvent,
  source: Extract<FlywheelSource, 'wantzjt' | 'org'>,
): FlywheelEvent {
  const type = e.type || 'Event'
  const repo = e.repo?.name
  const actor = e.actor?.login
  let title = type.replace(/Event$/, '')
  if (type === 'PushEvent') title = `Push to ${repo ?? 'repo'}`
  if (type === 'CreateEvent') title = `Created ${repo ?? 'resource'}`
  if (type === 'WatchEvent') title = `Starred ${repo ?? 'repo'}`
  if (type === 'IssuesEvent') title = `Issue activity on ${repo ?? 'repo'}`
  if (type === 'PullRequestEvent') title = `PR activity on ${repo ?? 'repo'}`
  if (type === 'PublicEvent') title = `Open-sourced ${repo ?? 'repo'}`

  return {
    id: `gh-${source}-${e.id}`,
    source,
    stage: source === 'org' ? 'vantage' : 'implement',
    title,
    detail: type,
    url: repo ? `https://github.com/${repo}` : undefined,
    actor,
    repo,
    createdAt: e.created_at || new Date().toISOString(),
  }
}

async function fetchPublicEvents(
  path: string,
  token?: string,
): Promise<GhEvent[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'ftw-lab-vantage-hub',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`https://api.github.com${path}`, {
    headers,
    // Public events only — legal OSINT posture
  })
  if (!res.ok) {
    // Rate limit or auth — caller falls back to seed
    return []
  }
  return (await res.json()) as GhEvent[]
}

export async function loadFlywheelEvents(options?: {
  token?: string
  org?: string
  human?: string
  limit?: number
}): Promise<{
  events: FlywheelEvent[]
  live: boolean
  sources: string[]
}> {
  const org = options?.org || BRAND.githubOrg
  const human = options?.human || BRAND.humanGithub
  const token = options?.token
  const limit = options?.limit ?? 40

  const [userEv, orgEv] = await Promise.all([
    fetchPublicEvents(`/users/${human}/events/public?per_page=20`, token),
    fetchPublicEvents(`/orgs/${org}/events?per_page=20`, token),
  ])

  const liveMapped: FlywheelEvent[] = [
    ...userEv.map((e) => mapGhEvent(e, 'wantzjt')),
    ...orgEv.map((e) => mapGhEvent(e, 'org')),
  ]

  const live = liveMapped.length > 0
  const sources = new Set<string>(['seed', 'implementer', 'scout_runs'])
  if (userEv.length) sources.add('wantzjt')
  if (orgEv.length) sources.add('org')

  const merged = [...liveMapped, ...SEED_EVENTS]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit)

  return { events: merged, live, sources: [...sources] }
}

/** Lightweight pulse for homepage — last few events. */
export async function loadPulse(token?: string) {
  const { events, live } = await loadFlywheelEvents({ token, limit: 6 })
  return { events, live }
}
