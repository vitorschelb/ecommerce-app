import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

// Cria e exporta o cliente Sanity
export const client = createClient({
  apiVersion, // Versão da API do Sanity
  dataset, // Nome do conjunto de dados do Sanity (dataset)
  projectId, // ID do projeto do Sanity
  useCdn, // Indica se deve usar a rede de distribuição de conteúdo (Content Delivery Network - CDN) do Sanity
  // Token de autenticação utilizado para acesso seguro ao Sanity
  token:
    "skVILFRuQnN1AtmTWcwZIrvxbS1T0Ra6nVLYXWmZzyj2TDRYXLo05unDTUFVW1uOQfudfo8hMDGPab8WPbtMRSdypCLlQqMVoXVHGXupAxHMahe9oyWAprbEVa5of0O0WBFKOlcBUMr7NgJhfZMMKtwkiqNiCPnHYyzhibOvd2NuLDA0q8zo",
})
