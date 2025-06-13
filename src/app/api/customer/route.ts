
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma"
export async function POST(request: Request){

  const session = await getServerSession(authOptions);

  if(!session || !session?.user) return NextResponse.json({ error: "Not authorized" }, { status: 401 })

  const { name, email, phone, address, userId } = await request.json();


  try {

    prismaClient.customer.create({
      data: {
        name,
        email,
        phone: phone,
        address: address ? address : "",
        userId: userId
      }
    })


    return NextResponse.json({ message: "cliente cadastrado!!" })

  }catch(err) {
    console.log(err)
    return NextResponse.json({ error: "Failed create new customer" }, { status: 400 })
  }


}