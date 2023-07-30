import { NextResponse } from "next/server"
// @ts-ignore é utilizado para ignorar erros de tipagem relacionados à importação
import { validateCartItems } from "use-shopping-cart/utilities"

import { inventory } from "@/config/inventory"
import { stripe } from "@/lib/stripe"

// Define a função POST com um parâmetro chamado "request" do tipo Request
export async function POST(request: Request) {
  // Obtém os detalhes do carrinho a partir do corpo da requisição em formato JSON
  const cartDetails = await request.json()

  // Valida os itens do carrinho com base no objeto inventory usando a função validateCartItems
  const lineItems = validateCartItems(inventory, cartDetails)

  // Obtém o valor do cabeçalho "origin" da requisição (representa a origem da requisição). "Same Origin Policy"
  const origin = request.headers.get("origin")

  // Cria uma sessão de checkout no Stripe com os parâmetros fornecidos
  const session = await stripe.checkout.sessions.create({
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    shipping_options: [
      {
        shipping_rate: "shr_1NZEMwIgdQIl0XiQ3al52sJz",
      },
    ],
    billing_address_collection: "auto",
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  })

  // Retorna a sessão de checkout criada como resposta no formato JSON usando o NextResponse.json()
  return NextResponse.json(session)
}
