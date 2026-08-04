import { createServerFn } from '@tanstack/react-start'
import { loadFlywheelEvents, loadPulse } from './flywheel'
import { BRAND } from './brand'

/** Server-only: optional GITHUB_TOKEN for higher rate limits (read-only PAT). */
function serverToken(): string | undefined {
  return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || undefined
}

export const getActivity = createServerFn({ method: 'GET' }).handler(
  async () => {
    return loadFlywheelEvents({
      token: serverToken(),
      org: process.env.VITE_PUBLIC_GITHUB_ORG || BRAND.githubOrg,
      human: process.env.VITE_PUBLIC_GITHUB_HUMAN || BRAND.humanGithub,
    })
  },
)

export const getPulse = createServerFn({ method: 'GET' }).handler(async () => {
  return loadPulse(serverToken())
})
