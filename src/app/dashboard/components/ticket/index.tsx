import { FiFile, FiTrash2 } from "react-icons/fi";

export function TicketItem(){
  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-slate-200 duration-200">
        <td className="text-left pl-1">Renan Gabriel</td>
        <td className="text-left hidden sm:table-cell">10/06/2025</td>
        <td className="text-left">
          <span className="bg-green-500 py-1 px-2">Aberto</span>
        </td>
        <td className="text-left">
          <button className="mr-2"> 
            <FiTrash2 size={24} color="#EF4444"/>
          </button>
          <button>
            <FiFile size={24} color="#3b82f6"/>
          </button>
        </td>
      </tr>
    </>
  )
}