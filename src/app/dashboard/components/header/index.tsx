import { Container } from "@/components/container";
import Link from "next/link";


export function DashboardHeader() {
  return (
    <Container>
      <header className="w-full flex items-center rounded-sm gap-3 bg-gray-900 my-4 p-3 px-3 text-white">
        <Link href="/dashboard/new">
          Chamados
        </Link>
        <Link href="/dashboard/customer">
          Clientes
        </Link>
      </header>
    </Container>
  )
}