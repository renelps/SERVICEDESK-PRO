"use client"

import { api } from "@/lib/api";
import { formatPhone } from "@/utils/formatPhone";
import { CustomerProps } from "@/utils/types/customer.type";
import { useRouter } from "next/navigation"
export function CardCustomer({ customer }: { customer: CustomerProps} ){
  const router = useRouter();

  async function handleDeleteCustomer(){

    try {
      const response = await api.delete("/api/customer", {
        params: {
          id: customer.id
        }
    })

    console.log(response)

    router.refresh();
    }catch(err) {
      console.log(err)
    }
  }


  return (
    <article className="flex flex-col bg-gray-100 p-2 border-2 rounded-sm gap-2 hover:bg-gray-200 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold">Nome: </a>
        {customer.name}
      </h2>
      <p>
        <a className="font-bold">Email: </a>
        {customer.email}
      </p>
      <p>
        <a className="font-bold pr-1">
          Telefone: 
        </a>

        {formatPhone(customer.phone)}
      </p>
      <button 
        className="text-white font-medium bg-red-500 py-1 px-4 self-start rounded-sm cursor-pointer"
        onClick={handleDeleteCustomer}
      > 
        Deletar
      </button>
    </article>
  )
}