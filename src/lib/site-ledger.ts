/**
 * In-memory site ledger for field-stage proof (links / implementer ticks).
 * Process-local — honest about ephemerality on serverless cold starts.
 */

export type LedgerEvent = {
  id: string
  kind: 'redirect_hit' | 'access_event' | 'implementer_tick'
  path: string
  detail?: string
  createdAt: string
}

const MAX = 200
const events: LedgerEvent[] = []

export function recordLedger(
  kind: LedgerEvent['kind'],
  path: string,
  detail?: string,
): LedgerEvent {
  const ev: LedgerEvent = {
    id: `ledger-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kind,
    path,
    detail,
    createdAt: new Date().toISOString(),
  }
  events.unshift(ev)
  if (events.length > MAX) events.length = MAX
  return ev
}

export function listLedger(limit = 40): LedgerEvent[] {
  return events.slice(0, limit)
}

export function ledgerCount(): number {
  return events.length
}
