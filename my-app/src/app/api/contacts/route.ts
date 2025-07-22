
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const contacts = await prisma.contact.findMany();
  return NextResponse.json(contacts);
}

export async function POST(req : Request){
    const data = await req.json();
    const contact = await prisma.contact.create({data})
    return NextResponse.json(contact);
}

