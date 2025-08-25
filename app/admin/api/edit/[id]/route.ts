import { getServerSession } from 'next-auth';
import { prisma } from '../../../lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await request.formData();
  const type = formData.get('type') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const file = formData.get('file') as File | null;
  const fileUrl = formData.get('fileUrl') as string;
  const linkUrl = formData.get('linkUrl') as string;

  let finalUrl = fileUrl;
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(process.cwd(), 'public/uploads', filename);
    await writeFile(filepath, buffer);
    finalUrl = `/uploads/${filename}`;
  }

  const artItem = await prisma.artItem.update({
    where: { id: parseInt(params.id) },
    data: {
      type,
      title,
      description,
      fileUrl: finalUrl,
      linkUrl: linkUrl || null,
    },
  });

  return NextResponse.json(artItem);
}