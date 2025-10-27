# SE/SA Personal Dashboard — Add-on Pack

This zip contains all custom files to add Admin CRUD, KPI snapshots, and Salesforce sync scaffolding
to a fresh Next.js (App Router, TypeScript, Tailwind) project.

## Quick start

1) Create the base app:
```bash
npm create next@latest se-sa-dashboard --typescript --eslint --tailwind --app --src-dir false --import-alias "@/ *"
cd se-sa-dashboard
```

2) Unzip these files **into the project root**, allowing it to create/overwrite paths.

3) Install deps:
```bash
npm i @prisma/client prisma recharts papaparse
```

4) Init Prisma & DB (use Docker Postgres or Supabase; example below is Docker):
```bash
docker run --name se-pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=se_dashboard -p 5432:5432 -d postgres:16
echo 'DATABASE_URL=postgresql://postgres:postgres@localhost:5432/se_dashboard' >> .env.local
npx prisma migrate dev -n init
npx prisma generate
```

5) Run dev:
```bash
npm run dev
```

6) Seed KPI once (optional):
```bash
curl -X POST http://localhost:3000/api/kpi/snapshot
```

7) Add Vercel Cron (when deployed):
- 02:00 → POST `/api/sf/sync`
- 03:00 → POST `/api/kpi/snapshot`

## Notes

- Salesforce OAuth storage is stubbed — wire your secure storage (KV/DB) for `refresh_token`.
- Opportunities have a `source` field for `manual` vs `salesforce` (you can lock fields for SF data).
- Admin UI: /admin with sections for Projects, Skills, Activities, Opportunities.
