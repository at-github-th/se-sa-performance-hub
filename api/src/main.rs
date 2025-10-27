
use axum::{routing::get, Router, Json};
use serde::{Serialize, Deserialize};
use std::net::SocketAddr;

#[derive(Serialize, Deserialize)]
struct KPI { name: String, value: f64 }

async fn root() -> Json<serde_json::Value> {
    Json(serde_json::json!({"name":"SE/SA Performance Hub API","ok":true}))
}

async fn kpis() -> Json<Vec<KPI>> {
    Json(vec![KPI{name:"Win Rate".into(), value:0.31}, KPI{name:"Pipeline".into(), value:750000.0}])
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(root))
        .route("/api/kpis", get(kpis));

    let addr = SocketAddr::from(([127,0,0,1], 5101));
    println!("Listening on http://{}", addr);
    axum::serve(tokio::net::TcpListener::bind(addr).await.unwrap(), app).await.unwrap();
}
