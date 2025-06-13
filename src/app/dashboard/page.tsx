import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { TicketItem } from "./components/ticket";



export default async function DashBoard(){

  const session = await getServerSession(authOptions);

  if(!session || !session?.user) redirect("/")

  return (
    <Container>
      <main className="my-2">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Chamados</h2>
          <Link href="/dashboard/customer/new" className="font-medium bg-blue-500 text-white py-2 px-5 rounded-sm">
            cadastrar
          </Link>
        </div>

        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">CLIENTE</th>
              <th className="font-medium text-left hidden sm:block">DATA CADASTRO</th>
              <th className="font-medium text-left">STATUS</th>
              <th className="font-medium text-left">#</th>
            </tr>
          </thead>

          <tbody>
            <TicketItem />
          </tbody>

        </table>
      </main>
    </Container>
  )
}