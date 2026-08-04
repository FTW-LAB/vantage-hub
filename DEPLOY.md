# FTW Lab production deploy — ftwlab.com

**Path chosen:** Cloudflare DNS in front of GoDaddy registrar (primary).  
**Alt path:** Stay on GoDaddy DNS with Vercel A/CNAME only (documented below).

**Brand locked:** FTW Lab · `#38ADFA` · `public/ftw-logo.png` · human `wantzjt` · ops@ftwlab.com

## Live status (as of bootstrap)

| Item | Status |
|------|--------|
| App code | `/Users/master/ftw-lab/vantage-hub` (TanStack Start + Nitro vercel preset) |
| Vercel project | Hobby team `tarx-75a403e7` / project **vantage-hub** |
| Green URL | https://vantage-hub-seven.vercel.app (**200**) |
| Production alias | https://vantage-hub-seven.vercel.app |
| Domains on project | `ftwlab.com`, `www.ftwlab.com` (attached; DNS not yet pointed) |
| Env (Production) | `VITE_PUBLIC_HOSTNAME`, `VITE_PUBLIC_GITHUB_ORG`, `VITE_PUBLIC_GITHUB_HUMAN` |
| GitHub org `FTW-LAB` | **Not created yet** — GitHub has no free-org create API; use click-path + `scripts/bootstrap-github.sh` |
| DNS | Still GoDaddy NS (`ns45/46.domaincontrol.com`); parking A records |

### Exact Vercel DNS targets (use these, not older docs)

```
A      @    216.198.79.1
A      @    64.29.17.1
CNAME  www  ee12a1d701552ed1.vercel-dns-017.com.
```

Re-check anytime:

```bash
vercel domains verify ftwlab.com --scope tarx-75a403e7
vercel domains verify www.ftwlab.com --scope tarx-75a403e7
```

---

## PHASE A — GitHub (as wantzjt)

### Create org (dashboard)

GitHub API cannot create orgs for free accounts via `gh`. Use the UI:

1. Open **https://github.com/account/organizations/new** while logged in as **wantzjt**
2. Choose **Create a free organization**
3. **Organization name:** `FTW-LAB`  
   (If taken try in order: `ftw-hub`, `ftwhq`, `getftw`, `ftwops`, `withftw`, `lab-ftw`)  
   Note: `ftwlab` is **TAKEN** — do not use.
4. **Contact email:** ops@ftwlab.com (or your verified email)
5. Complete captcha / plan selection (Free)
6. Skip inviting members for now
7. **Profile description:**  
   `FTW Lab — sovereign open tooling. Contributions by wantzjt.`
8. **URL:** `https://ftwlab.com`
9. Confirm you (**wantzjt**) are an **Owner**

### Org profile README

Repo: `FTW-LAB/.github` with `profile/README.md` (flywheel stages → https://ftwlab.com/activity).

### Repos (each public, MIT + SECURITY.md + AUP)

| Repo | Role |
|------|------|
| `vantage-hub` | Public site (this repo) |
| `scout-daemon` | Scout stage |
| `implementer-sdk` | Implement stage |
| `geolite2-bridge` | Geo IP bridge (legal MaxMind terms) |
| `tarx-bridge` | TARX **upstream only** |
| `ecosystem-prompts` | Prompt library |
| `sovereignty-lab-kit` | Local-first kit |

CLI pattern (after org exists):

```bash
gh repo create FTW-LAB/vantage-hub --public --source=. --remote=origin --push
```

SECURITY.md contact: **ops@ftwlab.com** in every repo.

---

## PHASE B — Vercel

### Dashboard click-path

1. **https://vercel.com** → log in as wantzjt
2. Team switcher (top left) → select personal or a dedicated FTW team (optional; Hobby is fine)
3. **Add New…** → **Project**
4. **Import Git Repository** → authorize GitHub if needed → select **FTW-LAB/vantage-hub**
5. **Configure Project**
   - Framework: TanStack Start (or Other; Nitro handles output)
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`
   - **Output:** leave default (Nitro vercel preset)
6. **Environment Variables** → add for Production + Preview:

| Name | Value |
|------|--------|
| `VITE_PUBLIC_HOSTNAME` | `ftwlab.com` |
| `VITE_PUBLIC_GITHUB_ORG` | `FTW-LAB` |
| `VITE_PUBLIC_GITHUB_HUMAN` | `wantzjt` |
| `GITHUB_TOKEN` | *(optional)* read-only PAT for live flywheel |

7. **Deploy** → wait for green
8. Confirm `https://vantage-hub-….vercel.app` returns **200**

### CLI alternative

```bash
cd vantage-hub
vercel link --yes
vercel env add VITE_PUBLIC_HOSTNAME production
# paste: ftwlab.com
vercel --prod
```

---

## PHASE C — Cloudflare + GoDaddy (recommended path)

### C1. Cloudflare Add site

1. **https://dash.cloudflare.com** → **Add a site**
2. Enter **ftwlab.com** → **Continue**
3. Plan: **Free** → **Continue**
4. Cloudflare scans DNS → **Continue**
5. Note the **nameserver pair** (e.g. `ada.ns.cloudflare.com` / `bob.ns.cloudflare.com`)

### C2. GoDaddy nameservers

1. **https://dcc.godaddy.com** → **Domains** → **ftwlab.com**
2. **DNS** / **Nameservers** → **Change Nameservers** → **I'll use my own nameservers**
3. Replace both NS with the Cloudflare pair → **Save**
4. **Domain lock:** ON  
5. **Privacy:** ON  
6. Disable **Domain Forwarding** and any **GoDaddy Website Builder** / parking page

Propagation: often 15 min–2 h (can be up to 48 h).

### C3. Vercel custom domains

1. Vercel project **vantage-hub** → **Settings** → **Domains**
2. Add **ftwlab.com**
3. Add **www.ftwlab.com**
4. Copy the **exact** DNS records Vercel shows (apex may be A `76.76.21.21` or CNAME flatten; www usually CNAME to `cname.vercel-dns.com`)

### C4. Cloudflare DNS (use EXACT Vercel values)

1. Cloudflare → **ftwlab.com** → **DNS** → **Records**
2. Apex (`@`): as instructed by Vercel (A or CNAME flattening)
3. `www`: CNAME per Vercel
4. Proxy status: **Proxied** (orange cloud) is OK if SSL mode is Full (strict)

### C5. SSL / TLS

1. Cloudflare → **SSL/TLS** → **Overview** → **Full (strict)**
2. **SSL/TLS** → **Edge Certificates**
   - **Always Use HTTPS:** On
   - **Minimum TLS Version:** TLS 1.2
3. **Speed** → **Optimization** → **Rocket Loader:** **Off** (breaks React hydration)

### C6. www → apex 301

1. Cloudflare → **Rules** → **Redirect Rules** → **Create rule**
2. Name: `www to apex`
3. If: Hostname equals `www.ftwlab.com`
4. Then: Dynamic redirect → `concat("https://ftwlab.com", http.request.uri.path)`  
   Status: **301**  
   Or static: `https://ftwlab.com` with preserve path if available

---

## PHASE D — GoDaddy residual / alt path

After NS cutover, GoDaddy is **registrar only**: renewals, lock, contact info.

### Alt path (if Cloudflare not used)

Stay on **GoDaddy DNS**:

1. Vercel → Domains → add ftwlab.com + www
2. GoDaddy → DNS → Records:
   - **A** `@` → `76.76.21.21` (or current Vercel apex instruction)
   - **CNAME** `www` → `cname.vercel-dns.com` (or Vercel exact target)
3. Remove parking/forwarding

Document which path you used at the top of this file.

**Path in use:** Cloudflare DNS + GoDaddy registrar (primary).

---

## PHASE E — Email (optional)

Cloudflare → **Email** → **Email Routing** → enable → destination address →  
create `ops@ftwlab.com` → forward to personal inbox.  
Does **not** block deploy.

---

## PHASE F — Flywheel when live

- `/activity` always shows **seed** implementer + scout_runs events
- With `GITHUB_TOKEN` (read-only): merges **wantzjt** + **org** public events
- Homepage **pulse** stays on (seed or live)
- Rate-limited API → seed remains intact

---

## PHASE G — Done checklist

- [ ] `https://ftwlab.com` → **200** + valid cert
- [ ] `https://www.ftwlab.com` → **301** → `https://ftwlab.com`
- [ ] Logo + `#38ADFA` visible
- [ ] `/activity` works
- [ ] wantzjt owns org `FTW-LAB`
- [ ] No secrets in git (`.env` gitignored; tokens only in Vercel)
- [ ] This DEPLOY.md matches the path used

---

## Local preview (do not break)

```bash
npm run dev
# 0.0.0.0:8080 — host binding preserved in package.json + vite.config.ts
```

## TARX

`tarx-bridge` is **upstream-only**. Do not fork proprietary TARX product code into FTW Lab repos.
