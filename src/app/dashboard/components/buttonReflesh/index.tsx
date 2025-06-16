"use client"

import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

export function ButtonRefresh(){

  const router = useRouter();

  return (
    <button onClick={() => router.refresh()} className="cursor-pointer">
      <FiRefreshCcw size={24} color="#444" />
    </button>
  )
}