# Securist flywheel audit (bring-up)

**Date:** 2026-08-04  
**Auth:** wantzjt (admin of org securist)  
**Org:** https://github.com/securist · 9 public repos before bring-up

| Plane | Current state | Gap | Action |
|-------|---------------|-----|--------|
| Site pulse | `flywheel.ts` seed + optional org events only | No unified pulse control plane; no HF live merge; no site ledger | Add `pulse.server.ts` merge GH+HF+ledger; surface source cards |
| GitHub org/repos | 8 packages + hub + .github | Missing `hf-model-scout`; thin READMEs; no topics/homepage; no Actions clock | Create repo; AGENT/SECURITY/stub; topics; homepage; scout-pulse workflow |
| HF catalog/scout | `/models` live API + curated | securist house empty; catalog is public_hub | Keep honest; bridge to securist packages |
| Package 1:1 | `REPOS` in packages.ts | Site had packages; GH repos thin | Scaffold stubs + docs on every repo |
| Implementer | package + seed only | No field ledger path | Minimal `/links` ledger + implementer note |
| Links proof | MISSING | No `/links` `/hwihf` | Add reserved short-link + ledger tick |

## Package matrix (target)

| Package | Site | GitHub | README | AGENT | Pulse-visible |
|---------|------|--------|--------|-------|---------------|
| hub | ✅ | ✅ | ✅ | ✅ | ✅ |
| scout-daemon | ✅ | ✅ | ✅ | ✅ | ✅ |
| implementer-sdk | ✅ | ✅ | ✅ | ✅ | ✅ |
| geolite2-bridge | ✅ | ✅ | ✅ | ✅ | ✅ |
| redirect-intel | ✅ | ✅ | ✅ | ✅ | ✅ |
| tarx-bridge | ✅ | ✅ | ✅ | ✅ | ✅ |
| ecosystem-prompts | ✅ | ✅ | ✅ | ✅ | ✅ |
| sovereignty-lab-kit | ✅ | ✅ | ✅ | ✅ | ✅ |
| hf-model-scout | ✅ /models | create | ✅ | ✅ | ✅ |

## LIVE vs seed (post bring-up)

Documented after Phase 5 verification.

## Post bring-up verification

| Check | Result |
|-------|--------|
| hf-model-scout repo | created |
| Package scaffolds AGENT/SECURITY/Actions | pushed |
| Pulse control plane | `src/lib/pulse-core.ts` |
| Links /hwihf | routes added |
| Classification strip | header |
| CONTRIBUTING + issue templates | hub |

### LIVE vs seed (runtime)
Depends on network: GH org events/repos + HF search → HYBRID/LIVE; site ledger after /hwihf fire.

### 7-day cadence
- **Mon:** Scout digest (Actions + human review)
- **Wed:** Package PR / stub improvement  
- **Fri:** HF shortlist review on /models
