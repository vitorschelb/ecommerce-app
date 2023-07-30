import Link from "next/link"
import { stripe } from "@/lib/stripe"
import { CheckoutSession } from "@/components/checkout-session"

interface Props {
  searchParams: {
    session_id?: string
  }
}

// Define a função da página que recebe o parâmetro searchParams através de Props
export default async function Page({ searchParams }: Props) {
  // Extrai o valor do parâmetro session_id de searchParams ou define uma string vazia caso seja nulo ou indefinido
  const sessionId = searchParams?.session_id ?? ""

  // Obtém os detalhes da sessão de checkout utilizando o método retrieve da instância stripe.checkout.sessions
  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)

  // Extrai os detalhes do cliente da sessão de checkout ou define undefined caso checkoutSession seja nulo ou indefinido
  const customerDetails = checkoutSession?.customer_details

  // Renderiza a página com as informações da sessão de checkout
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* Renderiza o componente CheckoutSession com os detalhes do cliente */}
        <CheckoutSession customerDetails={customerDetails} />

        {/* Cria uma seção com links para retornar à página inicial ou entrar em contato com o suporte */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
          <a href="#" className="text-sm font-semibold">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  )
}
