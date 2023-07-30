import Stripe from "stripe"

// Cria uma instância do objeto "stripe" com base na chave secreta do Stripe armazenada em uma variável de ambiente
// e define a versão da API do Stripe como "2022-11-15"
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
})
