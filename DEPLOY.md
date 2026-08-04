# FTW Lab production deploy — ftwlab.com

**Path chosen:** Cloudflare DNS in front of GoDaddy registrar (primary).  
**Alt path:** Stay on GoDaddy DNS with Vercel A/CNAME only (documented below).

**Brand locked:** FTW Lab · `#38ADFA` · `public/ftw-logo.png` · human `wantzjt` · ops@ftwlab.com

## Live status (as of bootstrap)

| Item | Status |
|------|--------|
| App code | `/Users/master/ftw-lab/vantage-hub` (TanStack Start + Nitro vercel preset) |
| Vercel project | Hobby team `tarx-75a403e7` / project **vantage-hub** |
| Green URL | https://vantage-hub-seven.vercel.app (**200**) · latest deploy aliases to project |
| Domains on project | `ftwlab.com`, `www.ftwlab.com` (attached; www→apex 301) |
| Env (Production) | `VITE_PUBLIC_HOSTNAME=ftwlab.com`, `VITE_PUBLIC_GITHUB_ORG=FTW-LAB`, `VITE_PUBLIC_HF_ORG=FTWLAB` |
| GitHub org | **[FTW-LAB](https://github.com/FTW-LAB)** |
| App repo | https://github.com/FTW-LAB/vantage-hub |
| DNS / NS | **Cloudflare** (`ada.ns.cloudflare.com` / `ignacio.ns.cloudflare.com`) via GoDaddy registrar |
| Security wrap | HSTS/CSP/COOP/CORP + Vercel WAF rules published + `/.well-known/security.txt` |

### Cloudflare DNS → Vercel (DNS-only / grey cloud recommended)

Re-check with `vercel domains verify ftwlab.com --scope tarx-75a403e7`. Current target pattern:

```
CNAME  @    ee12a1d701552ed1.vercel-dns-017.com.   # Proxy OFF (DNS only)
CNAME  www  ee12a1d701552ed1.vercel-dns-017.com.   # Proxy OFF (DNS only)
```

Or A records if Vercel UI shows them. Automated (needs token):

```bash
export CLOUDFLARE_API_TOKEN=…
/Users/master/ftw-lab/scripts/cloudflare-secure-ftwlab.sh
```

### Cloudflare security checklist (dashboard if no token)

1. **SSL/TLS** → Overview → **Full (strict)**
2. **SSL/TLS** → Edge Certificates → **Always Use HTTPS** On · min TLS **1.2** · TLS 1.3 On
3. **Speed** → Optimization → **Rocket Loader Off** (breaks React hydration)
4. **Security** → Settings → Security Level **High** · Browser Integrity Check On
5. **Rules** → Redirect Rules → `www.ftwlab.com` → `https://ftwlab.com` 301
6. Do **not** enable email address obfuscation on API-heavy paths if it breaks JSON (optional)

Re-check anytime:

```bash
dig +short NS ftwlab.com
vercel domains verify ftwlab.com --scope tarx-75a403e7
curl -sI https://vantage-hub-seven.vercel.app | head
```

---

## PHASE A — GitHub (as wantzjt) — DONE

**Org:** [https://github.com/FTW-LAB](https://github.com/FTW-LAB)  
**Admin:** wantzjt  
**Profile:** `FTW Lab — sovereign open tooling. Contributions by wantzjt.` · URL https://ftwlab.com · ops@ftwlab.com  
**Org README:** [FTW-LAB/.github](https://github.com/FTW-LAB/.github) (flywheel → https://ftwlab.com/activity)

### Repos (public, MIT + SECURITY.md + AUP) — all on `main`

| Repo | URL |
|------|-----|
| `vantage-hub` | https://github.com/FTW-LAB/vantage-hub |
| `scout-daemon` | https://github.com/FTW-LAB/scout-daemon |
| `implementer-sdk` | https://github.com/FTW-LAB/implementer-sdk |
| `geolite2-bridge` | https://github.com/FTW-LAB/geolite2-bridge |
| `tarx-bridge` | https://github.com/FTW-LAB/tarx-bridge |
| `ecosystem-prompts` | https://github.com/FTW-LAB/ecosystem-prompts |
| `sovereignty-lab-kit` | https://github.com/FTW-LAB/sovereignty-lab-kit |

```bash
/Users/master/ftw-lab/scripts/bootstrap-github.sh
```

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
