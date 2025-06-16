"use client"

import { api } from "@/lib/api";
import { formatDate } from "@/utils/date";
import { CustomerProps } from "@/utils/types/customer.type";
import { TicketProps } from "@/utils/types/tickets.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";
interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ ticket, customer }: TicketItemProps){
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext);
  const router = useRouter()
  async function handleChangeStatus(){
    try {
      await api.patch("/api/ticket", {
        id: ticket.id
      })

      router.refresh()

    }catch(err){
      console.log(err)
    }
  }

  function handleOpenModal(){
    handleModalVisible()
    setDetailTicket({ ticket: ticket, customer: customer })
  }


  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-slate-200 duration-200 w-full mb-10 rounded">
        <td className="text-left pl-3">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell">
          {formatDate(ticket.created_at)}
        </td>
        <td className="text-left">
          <span className="bg-green-500 py-1 px-2">Aberto</span>
        </td>
        <td className="text-left">
          <button className="mr-2 cursor-pointer" onClick={handleChangeStatus}> 
            <FiCheckSquare size={24} color="#016630"/>
          </button>
          <button className="cursor-pointer" onClick={handleOpenModal}>
            <FiFile size={24} color="#3b82f6"/>
          </button>
        </td>
      </tr>
    </>
  )
}