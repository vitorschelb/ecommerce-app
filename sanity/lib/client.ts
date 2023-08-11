import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

// Cria e exporta o cliente Sanity
export const client = createClient({
  apiVersion, // Versão da API do Sanity
  dataset, // Nome do conjunto de dados do Sanity (dataset)
  projectId, // ID do projeto do Sanity
  useCdn, // Indica se deve usar a rede de distribuição de conteúdo (Content Delivery Network - CDN) do Sanity
  // Token de autenticação utilizado para acesso seguro ao Sanity
})
