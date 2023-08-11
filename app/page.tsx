import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

import { SanityProduct } from "@/config/inventory"
import { siteConfig } from "@/config/site"
// import { seedSanityData } from "@/lib/seed"
import { cn } from "@/lib/utils"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"

// Declaração de interface para as props recebidas pelo componente.
interface Props {
  searchParams: {
    date?: string
    price?: string
    color?: string
    category?: string
    size?: string
    search?: string
  }
}

// Componente principal que será exportado como padrão.
export default async function Page({ searchParams }: Props) {
  // Extração das variáveis searchParams (com valores padrão) para uso mais fácil.
  const { date = "desc", price, color, category, size, search } = searchParams

  // Construção de strings para ordenação da consulta no Sanity.
  const priceOrder = price ? `| order(price ${price})` : ""
  const dateOrder = date ? `| order(_createdAt ${date})` : ""
  const order = `${priceOrder}${dateOrder}`

  // Construção das cláusulas de filtro para a consulta no Sanity.
  const producFilter = `_type == "product"`
  const colorFilter = color ? `&& "${color}" in colors` : ""
  const categoryFilter = category ? `&& "${category}" in categories` : ""
  const sizeFilter = size ? `&& "${size}" in sizes` : ""

  // Construção da cláusula de filtro para busca por nome dos produtos.
  const searchFilter = search ? `&& name match "${search}"` : ""

  // Concatenação de todas as cláusulas para formar o filtro completo.
  const filter = `*[${producFilter}${colorFilter}${categoryFilter}${sizeFilter}${searchFilter}]`

  // Consulta ao Sanity para obter os produtos de acordo com os filtros e ordenação especificados.

  // await seedSanityData() -> Para popular o Sanity com dados de teste.

  const products = await client.fetch<SanityProduct[]>(
    groq`${filter} ${order} {
      _id,
      _createdAt,
      name,
      sku,
      images,
      currency,
      price,
      description,
      "slug": slug.current
    }`
  )

  // Renderização do componente na página.
  return (
    <div>
      <div>
      <Image   // Placeholder para a cards animados dinâmicos
          priority={true}
          src="/products/bellezza.jpg"
          alt="one"
          width={1000}
          height={1000}
          className="w-full border-b-2 border-gray-200 object-cover dark:border-gray-800 "
          placeholder="blur"
          blurDataURL="data:..."
        />
      </div>

      <div>
        {/* Componente principal */}
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-10 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {/* Exibição do número de resultados encontrados */}
              {products.length} result{products.length > 1 && "s"}
            </h1>
            {/* Componente para ordenar os produtos */}
            <ProductSort />
          </div>

          {/* Seção principal de exibição dos produtos */}
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            {/* Grid para exibir os produtos */}
            <div
              className={cn(
                "grid grid-cols-1 gap-x-8 gap-y-10",
                products.length > 0
                  ? "lg:grid-cols-4"
                  : "lg:grid-cols-[1fr_3fr]"
              )}
            >
              <div className="hidden lg:block">
                {/* Componente de filtros de produtos (exibido apenas em tamanhos grandes) */}
                <ProductFilters />
              </div>
              {/* Componente de exibição dos produtos */}
              <ProductGrid products={products} />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
