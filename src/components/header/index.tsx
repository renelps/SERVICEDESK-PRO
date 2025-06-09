import Link from "next/link";
import { FiUser, FiLogOut } from "react-icons/fi";


export function Header(){
  return (
    <header className="w-full flex items-center justify-center px-2 h-20 py-4 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7xl">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
            <span className="text-blue-500 pr-1">
              DEV
            </span> 
  
            CONTROLE
          </h1>
        </Link>


        <div className="flex items-center gap-1">
          <Link href="/dashboard">
            <FiUser size={26} color="#4b5563" />
          </Link>
          <button>
            <Link href="/login">
              <FiLogOut size={26} color="#4b5563" />
            </Link>
          </button>
        </div>
      </div>
    </header>
  )
}