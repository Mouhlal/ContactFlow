import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface Params {
    params : {id:string}
}

export async function GET(req : Request , {params}:Params) {
    const contact = await prisma.contact.findUnique({
        where : {id: Number(params.id)}
    })
    return contact ? NextResponse.json(contact) : NextResponse.json({ message: 'Contact not found' }, { status: 404 })
}

export async function PUT(req:Request,{params}:Params){
    const data = await req.json()
    const update = await prisma.contact.update({
        where : {id: Number(params.id)},
        data : {
            name : data.name ,
            email : data.email,
            departement : data.departement,
        },
    })
    return NextResponse.json(update)
}

export async function DELETE(req: Request , {params} :Params){
    await prisma.contact.delete({
        where : {id:Number(params.id)},
    })
    return NextResponse.json({
        message : 'Deleted'
    })
}
