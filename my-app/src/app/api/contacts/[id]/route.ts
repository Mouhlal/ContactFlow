import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface Params {
  params: { id: string }
}

export async function GET(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const contact = await prisma.contact.findUnique({
    where: { id: Number(params.id) },
  });

  if (!contact || contact.userId !== Number(session.user.id)) {
    return NextResponse.json({ message: 'Contact non trouvé ou accès refusé' }, { status: 404 });
  }

  return NextResponse.json(contact);
}

export async function PUT(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const data = await req.json();

  const contact = await prisma.contact.findUnique({
    where: { id: Number(params.id) },
  });

  if (!contact || contact.userId !== Number(session.user.id)) {
    return NextResponse.json({ message: 'Contact non trouvé ou accès refusé' }, { status: 404 });
  }

  const updatedContact = await prisma.contact.update({
    where: { id: Number(params.id) },
    data: {
      name: data.name,
      email: data.email,
      departement: data.departement,
      phone: data.phone,
    },
  });

  return NextResponse.json(updatedContact);
}

export async function DELETE(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const contact = await prisma.contact.findUnique({
    where: { id: Number(params.id) },
  });

  if (!contact || contact.userId !== Number(session.user.id)) {
    return NextResponse.json({ message: 'Contact non trouvé ou accès refusé' }, { status: 404 });
  }

  await prisma.contact.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: 'Contact supprimé' });
}
