# vantage-hub

**FTW Lab · Vantage** — dual-forge product hub for [ftwlab.com](https://ftwlab.com).

| Lane | Role |
|------|------|
| GitHub | Code, packages, public Scout |
| Hugging Face | Models, datasets, spaces — [FTWLAB](https://huggingface.co/FTWLAB) |

## Surfaces

| Path | Role |
|------|------|
| `/` | Dual-forge home + tools catalog |
| `/models` | HF HQ — Scout, packs, curated catalog, agent prompts |
| `/daemon` | GitHub Scout + packages |
| `/activity` | Ops flywheel (GH + HF + model_pull) |
| `/security` | Dual-forge supply chain policy |
| `/legal` | AUP / ethics |

## Develop

```bash
./startup.sh
# → http://0.0.0.0:8080
```

```bash
npm run typecheck
npm run build
```

## Env

See `.env.example`. Production: `VITE_PUBLIC_HOSTNAME`, `VITE_PUBLIC_GITHUB_ORG`, `VITE_PUBLIC_HF_ORG`.

Optional server: `GITHUB_TOKEN` (read-only) for org public events.

## Posture

Legal public-source only · MaxMind honesty · HF license respect · TARX upstream only · no personal handles on public UI.
