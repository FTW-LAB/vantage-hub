import { useState } from 'react'
import { BRAND } from '#/lib/brand'

/** Operator "Copy page" — captures route context for agent handoff. */
export function CopyPage({
  title,
  body,
}: {
  title: string
  body?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    const href =
      typeof window !== 'undefined' ? window.location.href : `https://${BRAND.domain}`
    const text = [
      `FTW Lab · Vantage — ${title}`,
      `URL: ${href}`,
      `Org: ${BRAND.githubOrg} · HF: ${BRAND.hfOrg}`,
      `Doctrine: ${BRAND.doctrine}`,
      `Posture: ${BRAND.posture}`,
      body?.trim() || '',
    ]
      .filter(Boolean)
      .join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button type="button" className="ops-btn" onClick={copy}>
      {copied ? 'Copied' : 'Copy page'}
    </button>
  )
}
