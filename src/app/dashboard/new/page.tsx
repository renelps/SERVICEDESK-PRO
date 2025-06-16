import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import { FiLink } from "react-icons/fi"

export default async function NewTicket(){
  const session = await getServerSession(authOptions);

  if(!session || !session.user) redirect("/")

  const customs = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id
    }
  })

  async function handleRegisterTicket(formData: FormData){
    "use server"

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if(!name || !description || !customerId) return;


    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "ABERTO",
        userId: session?.user.id
      }
    })

    redirect("/dashboard")
  }


  return (
    <Container>
      <div className="flex items-center gap-2">
        <Link href="/dashboard/customer" className="bg-slate-900 text-white py-1 px-4 rounded-sm">
          Voltar
        </Link>
        <h2 className="font-bold text-2xl">
          Novo cliente
        </h2>
      </div>

      <form className="my-3 flex flex-col gap-3" action={handleRegisterTicket}>
        <div>
          <label className="font-medium mb-1" htmlFor="name">Nome do chamado</label>
          <input
            type="text"
            className="w-full border-1 p-1 outline-0"
            required
            id="name"
            name="name"
          />
        </div>

        <div>
          <label className="font-medium mb-1" htmlFor="description">Qual é o problema que está enfrentando</label>
          <textarea
            className="w-full border-1 p-1 outline-0 h-36 resize-none"
            placeholder="Digite o problema que está enfrentando"
            required
            id="description"
            name="description"
          >
          </textarea>
        </div>


        {customs.length !== 0 && (
          <div>
            <label 
              className="font-medium mb-1" 
            >
              Qual é o problema que está enfrentando
            </label>
            <select 
              name="customer" 
              className="w-full border-1 p-1 outline-0 h-11 bg-white resize-none"
            >
              {customs.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {customs.length === 0 && (
          <p className="flex items-center gap-2 text-center justify-center">
            Você ainda não cadastrou nenhum cliente,
            <Link 
              href="/dashboard/customer/new"
              className="text-blue-600 flex items-center gap-1 border-b-2 hover:text-blue-900 duration-300"
            >
            <FiLink size={16} color="#155dfc"/>
              Cadastrar Cliente
            </Link>
          </p>
        )}

        <button 
          className="w-full bg-blue-500 flex items-center justify-center py-2 text-white $  cursor-pointer hover:bg-blue-600 duration-300 disabled:cursor-not-allowed disabled:bg-gray-600"
          disabled={customs.length === 0}
        >
          Casdastrar
        </button>

      </form>
    </Container>
  )
}