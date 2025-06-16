import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CardCustomer } from "./components/card";
import prismaClient from "@/lib/prisma";

export default async function Customer() {

  const session = await getServerSession(authOptions);

  if(!session || !session?.user) redirect("/")

  const customs = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id
    }
  })

  return ( 
    <Container>
      <main>
        <div className="flex items-center justify-between">  
          <h2 className="text-3xl font-bold">Meus clientes</h2>
          <Link href="/dashboard/customer/new" className="bg-blue-500 text-white font-medium py-1 px-4 rounded-sm">
            Novo client
          </Link>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
          {customs && customs.map((customer) => (
            <CardCustomer key={customer.id} customer={customer} />
          ))}
        </section>

        {customs.length === 0 && (
          <p className="text-center mt-4">Você ainda nao cadastrou nenhum cliente</p>
        )}
      </main>
    </Container>
  )
}