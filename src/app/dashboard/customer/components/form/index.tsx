"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation"

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  email: z.string().min(1, "O Campo email é Obrigatório"),
  phone: z.string().refine((value) => {
    return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
  }, {
    message: "O número de telefone deve conter (DD) 99999999"
  }),
  address: z.string(),
})


type FormData = z.infer<typeof schema>

export function NewCustomerForm({ userId }: { userId: string }){
  
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  
  async function handleRegisterCustomer(data: FormData ){
    
    await api.post("/api/customer", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      userId: userId
    })

    router.refresh();
    router.replace("/dashboard/customer");

  }

  
  return (
    <form onSubmit={ handleSubmit(handleRegisterCustomer) } className="flex flex-col gap-2">
      <label htmlFor="namefull" className="font-medium mb-1">Nome completo: </label>
          <Input
            type="name" 
            name="name" 
            placeholder="Digite seu nome completo"
            id="namefull"
            error={errors?.name?.message}
            register={register}
          />

      <div className="flex flex-col sm:flex-row w-full gap-2">
        <div className="flex w-full flex-col">
          <label htmlFor="email">Email: </label>
          <Input
            type="email" 
            name="email" 
            placeholder="Digite o seu email"
            id="email"
            error={errors?.email?.message}
            register={register}
          />
        </div>
        <div className="flex w-full flex-col"> 
          <label htmlFor="phone">Número de telefone: </label>
          <Input
            type="tel" 
            name="phone" 
            placeholder="Digite seu número de telefone"
            id="phone"
            error={errors?.phone?.message}
            register={register}
          />
        </div>
      </div>

      <label htmlFor="address">Endereço: </label>
      <Input
        type="text" 
        name="address" 
        placeholder="Digite seu endereço"
        id="address"
        error={errors?.address?.message}
        register={register}
      />

      <button 
        className="flex items-center justify-center bg-blue-500 py-1 text-white cursor-pointer hover:bg-blue-600 duration-300 my-3"
      >
        Cadastrar
      </button>
    </form>
  )
}