//import Image from "next/image";
import Image from "next/image";
import Logo from "../assets/hero.svg";
export default function Home() {
  return (
    <main className="flex items-center justify-center flex-col min-h-[calc(100vh-80px)]">
      <h2 className="text-2xl font-medium mb-2">Gerencie sua empresa</h2>
      <h1 className="text-3xl font-bold mb-8 text-blue-600 md:4xl">Atendimentos, clientes</h1>

      <Image 
        src={Logo}
        alt="Logo Home"
        priority={true}
        quality={100}
        width={600}
        className="max-w-sm md:max-w-xl"
      />

    </main>
  );
}
