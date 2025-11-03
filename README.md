# SE/SA Performance Hub

**Stack:** Rust (axum)  
**API:** http://127.0.0.1:5101  
**Web:** http://localhost:5501

## Run (local)

### API
cd se-sa-performance-hub-native/api && cargo run

### Web (static tester)
cd se-sa-performance-hub-native/web && python3 -m http.server 5501

## Test
- **Ping:** curl -s http://127.0.0.1:5101 | jq .
- **KPIs:** GET /api/kpis\n- **Health:** GET /health

