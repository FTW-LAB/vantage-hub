# vantage-hub

**FTW Lab** public hub — sovereign open tooling surface for [ftwlab.com](https://ftwlab.com).

| | |
|---|---|
| Brand | `#38ADFA` + geometric **F** logo |
| Stack | TanStack Start + Nitro (Vercel preset) |
| Human | [wantzjt](https://github.com/wantzjt) |
| Org | [ftwforge](https://github.com/ftwforge) |
| Ops | ops@ftwlab.com |

## Features

- Homepage brand + **live pulse** strip
- `/activity` flywheel (wantzjt + org public events + implementer + scout_runs; seed fallback)
- `/legal` AUP + OSINT posture
- Local dev: `0.0.0.0:8080`

## Develop

```bash
npm install
npm run dev
# → http://0.0.0.0:8080
```

## Build / deploy

```bash
npm run build
```

On Vercel, Nitro applies the **vercel** preset automatically. See [DEPLOY.md](./DEPLOY.md).

## Env

Copy `.env.example`. Production requires at least:

- `VITE_PUBLIC_HOSTNAME=ftwlab.com`

Optional: `GITHUB_TOKEN` (read-only PAT) for live flywheel rate limits.

## Legal

MIT · [SECURITY.md](./SECURITY.md) · [AUP.md](./AUP.md) · legal public-source only.
