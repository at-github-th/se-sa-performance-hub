# SE/SA Performance Hub

Minimal, runnable starter (API + web + mobile + SDK) to showcase the concept.

## Quick start

### 1) API
```bash
cd api
npm install
npm start
# API on http://localhost:4101
```

### 2) Web (static HTML)
```bash
cd web
# Open index.html in your browser (use Live Server or any static server)
# Example: python3 -m http.server 5500
```

### 3) Mobile (Expo)
```bash
cd mobile
npm install
npm run start
# Use 10.0.2.2 for Android emulator to reach localhost:4101
```

### 4) SDK
- See `sdk/index.ts` for a tiny fetch wrapper (GET/POST).
- You can `npm init -y && tsc` to build if desired.

## API Routes
- `GET /api/kpis`
- `GET /api/opps`
- `POST /api/notes`

## Docker
```yaml
# docker-compose.yml
# Runs the API only; serve web with any static server.
```
```bash
docker compose up --build
```

## GitHub upload (fast)
```bash
git init
git add -A
git commit -m "init se-sa-performance-hub"
git branch -M main
git remote add origin git@github.com:at-github-th/se-sa-performance-hub.git
git push -u origin main
```

## Next steps
- Replace mocked data with real integrations.
- Harden auth, validation, and logging.
- Add tests and CI.
