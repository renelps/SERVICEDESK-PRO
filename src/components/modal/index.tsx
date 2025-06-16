"use client"

import { ModalContext } from "@/providers/modal"
import { formatPhone } from "@/utils/formatPhone"
import { useContext } from "react"
import { FaTimesCircle, FaCheckCircle, FaUser, FaTools } from "react-icons/fa"

export function ModalTicket() {
  const { visible, handleModalVisible, ticket } = useContext(ModalContext)

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      handleModalVisible()
    }
  }

  return (
    <section
      onClick={handleBackdropClick}
      className={`${
        visible ? "flex" : "hidden"
      } fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[95vh] overflow-y-auto mx-4 sm:mx-auto bg-gradient-to-br from-[#1e1e2f] to-[#0f172a] border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-12 text-white animate-fadeIn"
      >
        <button
          onClick={handleModalVisible}
          className="absolute top-5 right-5 text-white/60 hover:text-red-500 transition-all cursor-pointer"
        >
          <FaTimesCircle size={28} />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold flex items-center justify-center gap-3">
            <FaCheckCircle className="text-green-400 animate-pulse" />
            Detalhes do Chamado
          </h2>
          <p className="text-white/70 text-lg mt-1">
            Informações completas e status do chamado
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-inner">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FaTools className="text-indigo-400" />
              Problema
            </h3>
            <p className="text-white font-semibold mb-2 text-lg">
              {ticket?.ticket.name}
            </p>
            <div className="text-white/80 leading-relaxed max-h-64 overflow-y-auto pr-2">
              {ticket?.ticket.description}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-inner">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <FaUser className="text-cyan-400" />
              Cliente
            </h3>
            <ul className="space-y-2 text-white/80">
              <li><span className="font-semibold">Nome:</span> {ticket?.customer?.name}</li>
              <li><span className="font-semibold">Telefone:</span> {ticket?.customer?.phone ? formatPhone(ticket.customer.phone) : ""}</li>
              <li><span className="font-semibold">Email:</span> {ticket?.customer?.email}</li>
              <li><span className="font-semibold">Endereço:</span> {ticket?.customer?.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleModalVisible}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-10 rounded-full font-semibold text-lg shadow-md transition-all hover:scale-105 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </section>
  )
}