import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewCustomerForm } from "../components/form";



export default async function NewCustomer(){


  const session  = await getServerSession(authOptions);

  if(!session || !session?.user) redirect("/")

  return (
    <Container>
      <div className="flex items-center gap-5 my-3">
        <Link href="/dashboard/customer" className="bg-slate-900 text-white py-1 px-4 rounded-sm">
          Voltar
        </Link>
        <h2 className="font-bold text-2xl">
          Novo cliente
        </h2>
      </div>

      <NewCustomerForm userId={session.user.id} />
    </Container>
  )
}