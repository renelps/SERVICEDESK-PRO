import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { TicketItem } from "./components/ticket";
import prismaClient from "@/lib/prisma"
import { ModalTicket } from "@/components/modal";
import { ButtonRefresh } from "./components/buttonReflesh";

export default async function DashBoard(){

  const session = await getServerSession(authOptions);

  if(!session || !session?.user) redirect("/")

    const tickets = await prismaClient.ticket.findMany({
      where: {
        status: "ABERTO",
        customer: {
          userId: session.user.id
        }
      }, 
      include: {
        customer: true,
      },
      orderBy: {
        created_at: "desc"
      }
    })

  return (
    <Container>
      <main className="my-2 relative">
       <ModalTicket />


        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Chamados</h2>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/customer/new" className="font-medium bg-blue-500 text-white py-2 px-5 rounded-sm">
              cadastrar
            </Link>
            <ButtonRefresh />
          </div>
        </div>

        <table className="min-w-full my-2 w-full border-separate border-spacing-y-4">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">CLIENTE</th>
              <th className="font-medium text-left hidden sm:block">DATA CADASTRO</th>
              <th className="font-medium text-left">STATUS</th>
              <th className="font-medium text-left">#</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((item) => (
              <TicketItem 
                key={item.id} 
                ticket={item}
                customer={item.customer}
              />
            ))}
          </tbody>

        </table>

        {tickets.length === 0 && 
          <p className="text-center mt-5">Você ainda não tem nenhum chamado, 
            <Link href="/dashboard/customer" className="text-blue-600 border-b-1 pl-1">
              Cadastrar chamado
            </Link>
          </p>
        }
      </main>
    </Container>
  )
}