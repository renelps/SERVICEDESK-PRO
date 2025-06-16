"use client"

import { CustomerProps } from "@/utils/types/customer.type";
import { TicketProps } from "@/utils/types/tickets.type";
import { createContext, ReactNode, useState } from "react"

interface ModalContextProps {
  visible: boolean;
  handleModalVisible: () => void;
  ticket: TicketInfo | undefined;
  setDetailTicket: (detail: TicketInfo) => void;
}
interface ModalProviderProps {
  children: ReactNode;
}

interface TicketInfo {
  ticket: TicketProps;
  customer: CustomerProps | null;
}
export const ModalContext = createContext({} as ModalContextProps)

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState<TicketInfo>();

  function handleModalVisible(){
    setVisible(!visible)
  }

  function setDetailTicket(detail: TicketInfo){
    setTicket(detail)
    console.log(detail)
  }


  return (
    <ModalContext.Provider value={{ visible, handleModalVisible, ticket, setDetailTicket }} >
      {children}
    </ModalContext.Provider>
  )
}