# FTW Lab dual-forge parity audit

**Date:** 2026-08-04  
**Org (code):** `FTW-LAB` · **HF house:** `FTWLAB` · **Site:** Vantage (`vantage-hub`)  
**Posture:** legal public-source only · no personal handles on public UI · no vendor affiliation claims

---

## A. Inventory (actual tree)

### Site routes (live)

| Route | Role |
|-------|------|
| `/` | Dual-forge home + tools strip + flywheel stages |
| `/models` | HF Scout HQ + curated catalog + agent prompts |
| `/daemon` | GH Scout + package list |
| `/activity` | Ops flywheel (GH + HF + model_pull + package) |
| `/security` | Dual-forge supply chain + edge controls |
| `/legal` | AUP / ethics |
| `/tools` | Packages catalog (normalized) |
| `/use-cases` | Join table: package ↔ model ↔ ops |

**Not in this tree (documented gaps, not re-scaffolded):**  
`/links`, `/ecosystem`, `/about`, `/terms` (covered by `/legal`), `/hwihf`, `packages/*` monorepo layout inside app, server files named `*.server.ts` (logic lives in `activity-api.ts` / `hf-scout.ts` / `flywheel.ts`).

### Data modules

| Module | Role |
|--------|------|
| `src/lib/brand.ts` | Brand + `GH_PACKAGES` |
| `src/lib/tools.ts` | Tools catalog (scouts + packages + flywheel) |
| `src/lib/packages.ts` | Canonical package REPOS + clone + agent prompts |
| `src/lib/hf-catalog.ts` | HF query packs + curated rows + bridges |
| `src/lib/hf-scout.ts` | Live HF API scout + seed_only |
| `src/lib/use-cases.ts` | Join table use-cases |
| `src/lib/flywheel.ts` | Seed + org live events |
| `src/lib/activity-api.ts` | Server functions |

### GitHub `FTW-LAB` (remote, verified)

| Repo | Exists |
|------|--------|
| `vantage-hub` | yes |
| `scout-daemon` | yes |
| `implementer-sdk` | yes |
| `geolite2-bridge` | yes |
| `redirect-intel` | yes |
| `tarx-bridge` | yes |
| `ecosystem-prompts` | yes |
| `sovereignty-lab-kit` | yes |
| `.github` (org profile) | yes |

### Hugging Face `FTWLAB`

| Kind | Count (public API) |
|------|---------------------|
| models authored by FTWLAB | **0** |
| datasets | **0** |
| spaces | **0** (assumed empty) |

Curated catalog on site references **public third-party** models (SecureBERT, CodeBERT, Whisper, BGE, GGUF) as **discovery/fielding targets**, not as FTWLAB-hosted weights. Marked `catalogScope: public_hub` — no false org ownership.

---

## B. Parity matrix

### Packages

| Artifact | Site | GitHub story | HF story | Status | Fix |
|----------|------|--------------|----------|--------|-----|
| vantage-hub | Home hub | Repo + README | N/A | OK | Keep as product surface |
| scout-daemon | /daemon, /tools | Repo README (had personal line) | N/A | FIXED | README depersonalized; catalog complete |
| implementer-sdk | /daemon, /tools | Repo README thin | N/A | FIXED | README + agent prompt |
| geolite2-bridge | /daemon, /tools | Repo README | Geo NLP pack only | OK | MaxMind honesty noted |
| redirect-intel | /daemon list | Repo exists | N/A | FIXED | tools catalog + package card |
| tarx-bridge | /models#tarx, /tools | Repo README | Field notes on all HF rows | OK | — |
| ecosystem-prompts | /daemon | Repo README | N/A | FIXED | tools + use-case join |
| sovereignty-lab-kit | missing from GH_PACKAGES | Repo exists | N/A | FIXED | added to packages + tools |

### HF catalog rows

| Artifact | Site | GitHub bridge | Use-case | Status | Fix |
|----------|------|---------------|----------|--------|-----|
| SecureBERT | /models curated | scout-daemon CTI | cti-offline | OK | bridge fields explicit |
| CodeBERT | /models | ecosystem-prompts / scout code | code-sec-research | OK | — |
| Whisper large-v3 | /models | authorized audio only | authorized-asr | OK | risk medium |
| BGE small EN | /models | public Scout notes embed | osint-retrieval | OK | — |
| Mistral GGUF | /models | tarx-bridge local | sovereign-soc-lab | OK | license review |
| FTWLAB-hosted models | none | n/a | n/a | MISSING | org empty — catalog only public hub; no fake ownership |

### Tools / scouts

| Artifact | Site | Live path | Status | Fix |
|----------|------|-----------|--------|-----|
| GH Scout | /daemon | seed agent prompt; org events on /activity if token | OK | document seed vs live |
| HF Scout | /models Run button | live API + seed_only | OK | queries simplified for hits |
| Ops flywheel | /activity | seeds + org live | FIXED | package seeds complete; no personal actors |
| Copy page | header missing | n/a | FIXED | Copy page control on major routes |

### Ecosystem / use-cases / links

| Artifact | Site | Status | Fix |
|----------|------|--------|-----|
| use-cases join table | /use-cases | FIXED | data module + page |
| ecosystem detail pages | MISSING | GAP | ecosystem-prompts package covers prompts; no multi-repo ecosystem UI |
| /links + /hwihf | MISSING | GAP | out of current tree; not re-scaffolded |
| /about /terms | /legal covers terms | OK | alias language on nav footer |

### Org / handle drift

| Location | Status | Fix |
|----------|--------|-----|
| Public UI `src/**` wantzjt | OK (none) | — |
| Package READMEs wantzjt | FIXED | ops@ only |
| org-github profile wantzjt + ftwforge | FIXED | FTW-LAB only |
| LICENSE copyright wantzjt | OK | legal copyright, not UI marketing |
| DEPLOY.md ops notes wantzjt | PARTIAL | ops runbook may name admin account; not rendered in UI |
| bootstrap script wantzjt | OK | operator automation identity |

---

## C. Flywheel acuity

| Stage | Reality | Notes |
|-------|---------|-------|
| Discover | GH Scout UI + HF Scout live | Seed events if API empty |
| Contribute | Org public events when `GITHUB_TOKEN` | No personal event merge on public surface |
| Package | GH_PACKAGES = remote repos | READMEs agent setup |
| Field | model_pull seeds + TARX notes | Offline only |
| Compound | /activity dual language | GH + HF + package |

---

## D. Top drifts (pre-fix) → disposition

1. sovereignty-lab-kit missing from site packages → **fixed**
2. redirect-intel missing from tools strip → **fixed**
3. scout-daemon README personal handle → **fixed**
4. org-github still said ftwforge → **fixed**
5. HF org empty but catalog implies house models → **documented public_hub scope**
6. No use-case join table → **fixed**
7. No /tools package catalog page → **fixed**
8. No Copy page control → **fixed**
9. Flywheel missing package seeds for all repos → **fixed**
10. /links /hwihf /ecosystem pages → **remaining gap** (not re-scaffolded)
11. DEPLOY ops still names human admin → **acceptable ops doc**
12. Package READMEs thin agent prompts → **fixed**
13. Nav lacked Tools / Use-cases → **fixed**
14. tools.ts incomplete vs GH_PACKAGES → **fixed**
15. Index models table incomplete → **fixed** via /models + home tools

---

## E. Remaining gaps (honest)

- **HF account FTWLAB** has zero public models/datasets — site catalogs public hub artifacts only.
- **No `/links` or `/hwihf` proof path** in this codebase.
- **No per-package deep route** `/tools/:slug` — cards on `/tools` + GitHub README.
- **GitHub Git → Vercel** may still need org app authorization for auto-deploy.
- **ftwlab.com DNS → Vercel** may still need CF CNAME if not completed outside this audit.
