# Security Policy

## Reporting

Email **ops@ftwlab.com** with:

- Affected surface / package / model id
- Impact assessment
- Legal reproduction steps (public or authorized targets only)

Do **not** open a public issue for unfixed security problems.

Public policy surface: https://ftwlab.com/security

## Dual-forge supply chain (actual behavior)

### GitHub lane

- Public organization packages only (`FTW-LAB` org)
- Scout: public repos, rate-limited clients, `legal_risk` tags
- No private repository access from Vantage surfaces

### Hugging Face lane

- Public hub search via `https://huggingface.co/api/models`
- User-Agent: `ftwlab-scout`
- Timeouts + seed catalog fallback when API empty / rate-limited
- Model card license review required before fielding
- Operator-controlled cache only — never illegal rehost of weights

### TARX

- Upstream local private runtime
- Integrate via `tarx-bridge` — do not vendor
- Model fielding = offline pull success + documentation
- No dark phone-home on weights

### Geo

- MaxMind GeoLite2 honesty: city / ASN class only
- No household GeoIP claims

## Scope

- FTW Lab dual-forge surfaces and public packages
- Public site at ftwlab.com

## Out of scope

- Unauthorized access, credential stuffing, malware distribution
- Multiplayer spy networks or private-intel cosplay as product
- Consulting marketplace

## Legal-use only

All tooling use must comply with AUP and applicable law. Legal public-source (OSINT) posture only.
