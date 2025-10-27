import { prisma } from '@/lib/prisma';

export async function GET() {
  const items = await prisma.project.findMany({ orderBy: { updatedAt: 'desc' } });
  return Response.json(items);
}

export async function POST(req: Request) {
  const data = await req.json();
  const item = await prisma.project.create({ data });
  return Response.json(item, { status: 201 });
}
