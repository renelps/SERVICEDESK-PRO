import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma"



export async function PATCH(request: Request){
  const session = await getServerSession(authOptions);

  if(!session || !session.user) return NextResponse.json({ error: "Not authorized"}, { status: 401 })

  const { id } = await request.json();

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string
    }
  })

  if(!findTicket) return NextResponse.json({ error: "Failed update ticket" }, { status: 400 })

  try {

    await prismaClient.ticket.update({
      where: {
        id: id as string
      },
      data: {
        status: "FECHADO"
      }
    })

    return NextResponse.json({ message: "Status updated successfully" })

  }catch(err){
    console.log(err)
  }

  return NextResponse.json({ message: "test" })
}

export async function POST(request: Request){
  const { name, description, customerId } = await request.json();

  if(!name || !description || !customerId) return NextResponse.json({ error: "Failed create new ticket"}, { status: 400 })


  try {

    await prismaClient.ticket.create({
      data: {
        name: name,
        description: description,
        customerId: customerId,
        status: "ABERTO"
      }
    })

    return NextResponse.json({ message: "Ticket registered successfully"})
    
  }catch(err) {
    console.log(err)
     return NextResponse.json({ error: "Failed create new ticket"}, { status: 400 })
  }
}