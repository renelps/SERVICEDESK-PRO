"use client"

import { Input } from "@/components/input";
import { FaSearch } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import { FormTicket } from "./components/formTicket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z.string().email("Digite o email").min(1, "O campo é obrigatório")
})

type FormData = z.infer<typeof schema>

export interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket(){

  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null)

  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  function handleClearCustomer(){
    setCustomer(null)
    setValue("email", "")
  }

  async function handleSearchCustomer(data: FormData){
  try {
    const response = await api.get("/api/customer", {
      params: {
        email: data.email
      }
    })

      setCustomer({
        id: response.data.id,
        name: response.data.name
      })

    } catch (error) {
      console.error("Erro ao buscar cliente:", error)
      setCustomer(null)
      setError("email", { type: "custom", message: "Cliente não encontrado. Verifique o e-mail digitado."})
    }
  }

  return (
    <div className="mx-auto max-w-xl shadow-xl">

      <div className="mt-20 w-full flex flex-col items-center ">
        <h2 className="font-medium text-2xl mb-2">Abrir chamado</h2>
        {customer ? (
          <div className="flex items-center justify-between w-full gap-2 p-4 rounded-md border-1 border-slate-400">
            <p>Usuario secionado: <span>{customer?.name}</span></p>
            <button onClick={handleClearCustomer} className="cursor-pointer">
              <FaX size={22} color="#fb2c36" />
            </button>
          </div>
        ): (
          <div className="w-full">
            <form className="flex items-center w-full gap-2 p-4 rounded-md" onSubmit={handleSubmit(handleSearchCustomer)}>
              <div className="w-full">
                <Input
                  type="text"
                  name="email"
                  placeholder="Digite o email do chamado"
                  register={register}
                />
              </div>
              <button type="submit" className="cursor-pointer">
                <FaSearch size={24} color="#62748e"/>
              </button>
            </form>
            {errors.email?.message && (
              <p className="text-red-500 text-sm my-2 pl-2">{errors.email.message}</p>
            )}
          </div>
        )
      }

      {customer && <FormTicket customer={customer} />}
      </div>
    </div>
  )
}