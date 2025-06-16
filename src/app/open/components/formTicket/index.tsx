"use client"

import { Input } from "@/components/input"
import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CustomerDataInfo } from "../../page"

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  description: z.string().min(1, "O campo descrição é obrigatório")
})

type FormData = z.infer<typeof schema>

export function FormTicket({ customer }: { customer: CustomerDataInfo }){

  const { register, handleSubmit, setValue, formState: { errors }} = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  async function handleRegisterTicket(data: FormData){
    await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id
    })

    setValue("name", "")
    setValue("description", "")
  }


  return (
    <form className="w-full p-4 " onSubmit={handleSubmit(handleRegisterTicket)}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Nome do chamado: </label>
        <Input 
          type="text"
          name="name"
          id="name"
          placeholder="Digite o nome do chamado"
          register={register}
          error={errors.name?.message}
        />
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="description">Qual é o detalhes do problema: </label>
        <textarea
          id="description"
          placeholder="Explique melhor o problema"
          {...register("description")}
          className="resize-none h-24 p-1 border-1 border-slate-400 outline-none"
        >

        </textarea>
        {errors.description?.message && <p className="text-red-500">{errors.description.message}</p>}
      </div>
        <button 
          className="bg-blue-500 text-white w-full mt-4 p-2 rounded-sm cursor-pointer hover:bg-blue-600 duration-300"
          type="submit"

        >
          cadastrar
        </button>
    </form>
  )
}