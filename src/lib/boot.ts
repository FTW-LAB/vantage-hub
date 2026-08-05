/**
 * Zero-human boot: warm ledger + proof tokens on index/activity load.
 * Throttled in-memory so serverless cold starts don't hammer APIs.
 */
import { recordLedger } from './site-ledger'
import { runHfScout } from './hf-scout'
import { getFlywheelPulse } from './pulse-core'

let lastBoot = 0
const BOOT_COOLDOWN_MS = 60_000

export async function warmConsoleBoot(token?: string) {
  const now = Date.now()
  const throttled = now - lastBoot < BOOT_COOLDOWN_MS
  if (!throttled) {
    lastBoot = now
    recordLedger('access_event', '/', 'console boot')
    recordLedger('access_event', '/activity', 'activity merge warm')
    // Proof path warm (does not external-redirect here)
    recordLedger('redirect_hit', '/hwihf', 'boot warm · HF house path')
  }

  const [pulse, hf] = await Promise.all([
    getFlywheelPulse({ token, force: !throttled }),
    runHfScout('cti-ner'),
  ])

  return {
    throttled,
    pulse,
    hf,
    bootedAt: new Date().toISOString(),
  }
}
