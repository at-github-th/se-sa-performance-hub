import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string }}) {
  const item = await prisma.skill.findUnique({ where: { id: params.id } });
  return Response.json(item);
}

export async function PATCH(req: Request, { params }: { params: { id: string }}) {
  const data = await req.json();
  const item = await prisma.skill.update({ where: { id: params.id }, data });
  return Response.json(item);
}

export async function DELETE(_: Request, { params }: { params: { id: string }}) {
  await prisma.skill.delete({ where: { id: params.id } });
  return Response.json({ ok: true });
}
