

export function CardCustomer(){
  return (
    <article className="flex flex-col bg-gray-100 p-2 border-2 rounded-sm gap-2 hover:bg-gray-200 hover:scale-105 duration-300">
      <h2>
        <a className="font-bold">Nome: </a>
        Mercado Oliveira
      </h2>
      <p>
        <a className="font-bold">Email:</a>
        teste@teste.com
      </p>
      <p>
        <a className="font-bold">
          Telefone: 
        </a>
        (xx) xxxx - xxxx
      </p>
      <button className="text-white font-medium bg-red-500 py-1 px-4 self-start rounded-sm"> 
        Deletar
      </button>
    </article>
  )
}