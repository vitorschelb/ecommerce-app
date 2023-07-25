import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token:
    "skVILFRuQnN1AtmTWcwZIrvxbS1T0Ra6nVLYXWmZzyj2TDRYXLo05unDTUFVW1uOQfudfo8hMDGPab8WPbtMRSdypCLlQqMVoXVHGXupAxHMahe9oyWAprbEVa5of0O0WBFKOlcBUMr7NgJhfZMMKtwkiqNiCPnHYyzhibOvd2NuLDA0q8zo",
})
