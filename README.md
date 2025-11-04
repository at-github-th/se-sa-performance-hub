# SE/SA Performance Hub

Language: Rust (axum)

## How to run

API
```bash
cd se-sa-performance-hub-native/api && cargo run
```

Web
```bash
cd se-sa-performance-hub-native/web && python3 -m http.server 5501
```

Open http://localhost:5501

## Endpoints
- Health: GET /health\n- KPIs: GET /api/kpis
