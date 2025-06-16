
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma"



export async function GET(request: Request){
  const { searchParams } = new URL(request.url)

  const customerEmail = searchParams.get("email")

  if(!customerEmail || customerEmail === "") return NextResponse.json({ error: "Customer not found"})

  try{
    const customer = await prismaClient.customer.findFirst({
      where: {
        email: customerEmail
      }
    })

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    return NextResponse.json(customer)

  }catch(err){
    console.log(err);
    return NextResponse.json({ error: "Customer not afound"}, { status: 400 })
  }
}

export async function DELETE(request: Request){

  const session = await getServerSession(authOptions);

  if(!session || !session?.user) return NextResponse.json({ error: "Not authorized" }, { status: 401 })

  const { searchParams} = new URL(request.url)

  const userId = searchParams.get("id")

  if(!userId) return NextResponse.json({ error: "Failed delete customer" }, { status: 400 })

  const findTikets = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId
    }
  })

  if(findTikets) return NextResponse.json({ error: "Failed delete customer" }, { status: 400 })

  try {

    await prismaClient.customer.delete({
      where: {
        id: userId as string
      }
    })

    return NextResponse.json({ message: "Customer deleted successfully"})

  }catch(err) {
    console.log(err)
    return NextResponse.json({ error: "Failed delete customer" }, { status: 400 })
  }



}

export async function POST(request: Request){

  const session = await getServerSession(authOptions);

  if(!session || !session?.user) return NextResponse.json({ error: "Not authorized" }, { status: 401 })

  const { name, email, phone, address, userId } = await request.json();


  try {

    await prismaClient.customer.create({
      data: {
        name,
        email,
        phone: phone,
        address: address ? address : "",
        userId: userId
      }
    })


    return NextResponse.json({ message: "Customer registered!" })

  }catch(err) {
    console.log(err)
    return NextResponse.json({ error: "Failed create new customer" }, { status: 400 })
  }


}