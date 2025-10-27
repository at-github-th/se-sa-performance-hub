export async function GET() {
  return new Response(JSON.stringify([
    { stage: 'Prospecting', amount: 12000 },
    { stage: 'Qualification', amount: 48000 },
    { stage: 'Proposal', amount: 32000 },
    { stage: 'Negotiation', amount: 15000 },
  ]), { headers: { 'Content-Type': 'application/json' } });
}
