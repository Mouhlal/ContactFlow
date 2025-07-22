import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const contacts = await prisma.contact.findMany({
    where: { userId: Number(session.user.id) },
  });
  return NextResponse.json(contacts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const data = await req.json();

  const contact = await prisma.contact.create({
    data: {
      ...data,
      userId: Number(session.user.id),
    },
  });

  return NextResponse.json(contact);
}
