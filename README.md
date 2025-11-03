# SE/SA Performance Hub — Native Backend (RUST)

This repo provides a **language-native backend** on port **5101**, with minimal **web** and **mobile** clients and a tiny **SDK**.

## Run
See `api/README.md` for language-specific steps, then:
- Web: open `web/index.html` via a static server
- Mobile: `cd mobile && npm install && npm run start` (Android emulator uses `10.0.2.2:5101`)

## Endpoints
Project-specific routes are implemented in the backend (see `api/`). Try typical paths like:
- `/api/kpis`, `/api/opps`, `/api/notes`
- `/api/devices`, `/api/heartbeats`
- `/api/resources`, `/api/availability`, `/api/book`
- `/api/payments/create`, `/api/webhooks`
- `/api/ingest`, `/api/dash/summary`
