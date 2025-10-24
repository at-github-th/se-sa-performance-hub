// Tiny TypeScript SDK for this project's API
export const apiBase = "http://localhost:4101";

export async function get(path: string) {
  const r = await fetch(`${apiBase}${path}`);
  if (!r.ok) throw new Error(`GET ${path} failed: ${r.status}`);
  return r.json();
}

export async function post(path: string, body: any) {
  const r = await fetch(`${apiBase}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error(`POST ${path} failed: ${r.status}`);
  return r.json();
}
