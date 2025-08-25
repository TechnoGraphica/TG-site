import { getServerSession } from 'next-auth';
import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await prisma.artItem.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({ message: 'Deleted' });
}