use axum::{routing::{get,post,patch}, Router, Json, extract::{State,Path}, http::{HeaderMap, StatusCode}};
use serde::{Serialize, Deserialize};
use std::{net::SocketAddr, sync::{Arc,Mutex}};
use tower_http::cors::{Any, CorsLayer};
use std::env;

#[derive(Serialize, Deserialize, Clone)]
struct KPI { id:u32, name:String, value:f64, unit:String, target:f64 }

#[derive(Clone)]
struct AppState { token:String, kpis: Arc<Mutex<Vec<KPI>>> }

fn ok(h:&HeaderMap, token:&str)->bool{
  h.get("x-api-key").and_then(|v| v.to_str().ok()).map(|v| v==token).unwrap_or(false)
}

async fn health()->Json<serde_json::Value>{ Json(serde_json::json!({"ok":true})) }
async fn version()->Json<serde_json::Value>{ Json(serde_json::json!({"service":"se-sa-performance-hub","version":"0.2.0"})) }

async fn root()->Json<serde_json::Value>{ Json(serde_json::json!({"name":"SE/SA Performance Hub API","ok":true})) }

async fn list_kpis(State(st):State<AppState>, headers:HeaderMap)->Result<Json<Vec<KPI>>,StatusCode>{
  if !ok(&headers,&st.token){ return Err(StatusCode::UNAUTHORIZED); }
  Ok(Json(st.kpis.lock().unwrap().clone()))
}

async fn patch_kpi(State(st):State<AppState>, headers:HeaderMap, Path(id):Path<u32>, Json(body):Json<serde_json::Value>)
  ->Result<Json<KPI>,StatusCode>{
  if !ok(&headers,&st.token){ return Err(StatusCode::UNAUTHORIZED); }
  let mut v=st.kpis.lock().unwrap();
  if let Some(k)=v.iter_mut().find(|k| k.id==id){
    if let Some(val)=body.get("value").and_then(|x| x.as_f64()){ k.value=val; }
    return Ok(Json(k.clone()));
  }
  Err(StatusCode::NOT_FOUND)
}

#[tokio::main]
async fn main() {
  let port: u16 = env::var("API_PORT").ok().and_then(|s| s.parse().ok()).unwrap_or(5101);
  let token = env::var("API_TOKEN").unwrap_or_else(|_| "dev-12345".into());
  let state = AppState{
    token,
    kpis: Arc::new(Mutex::new(vec![
      KPI{ id:1, name:"Win Rate".into(), value:0.34, unit:"%".into(), target:0.35 },
      KPI{ id:2, name:"Pipeline".into(), value:750000.0, unit:"$".into(), target:900000.0 },
    ]))
  };
  let app = Router::new()
    .route("/", get(root))
    .route("/health", get(health))
    .route("/version", get(version))
    .route("/api/kpis", get(list_kpis))
    .route("/api/kpis/:id", patch(patch_kpi))
    .with_state(state)
    .layer(CorsLayer::new().allow_origin(Any).allow_methods(Any).allow_headers(Any));
  let addr=SocketAddr::from(([127,0,0,1], port));
  println!("Listening on http://{}", addr);
  axum::serve(tokio::net::TcpListener::bind(addr).await.unwrap(), app).await.unwrap();
}
