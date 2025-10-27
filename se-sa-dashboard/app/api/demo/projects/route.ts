export async function GET() {
  return new Response(JSON.stringify([
    { id: 'p1', title: 'Aerial Dashboard v2', status: 'ACTIVE', category: 'Dashboard' },
    { id: 'p2', title: 'RFID Middleware', status: 'BLOCKED', category: 'Middleware' },
    { id: 'p3', title: 'POS Fiscal (FR)', status: 'PLANNING', category: 'Compliance' },
  ]), { headers: { 'Content-Type': 'application/json' } });
}
