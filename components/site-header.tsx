"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Edit, ShoppingBag, ShoppingCart } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  // Uso de hooks para obter informações da URL e parâmetros de pesquisa (search params).
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { cartCount } = useShoppingCart()
  const defaultSearchQuery = searchParams.get("search") ?? "" // Obtenção do valor do parâmetro 'search' da URL.

  // Se o caminho da URL começar com "/studio", o cabeçalho não será exibido (retornará null).
  if (pathname.startsWith("/studio")) return null

  // Função chamada ao enviar o formulário de pesquisa.
  function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const searchQuery = formData.get("search") // Obtenção do valor digitado pelo usuário no campo de pesquisa.

    // Atualização da URL para redirecionar para a página de pesquisa com o valor da pesquisa como parâmetro.
    router.replace(`/?search=${searchQuery}`)
  }

  // Renderização do componente de cabeçalho (header) do site.
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
        {/* Componente de navegação principal */}
        <MainNav />

        {/* Formulário de pesquisa (exibido apenas em tamanhos grandes de tela) */}
        <form
          onSubmit={onSubmit}
          className="hidden items-center lg:inline-flex"
        >
          <Input
            id="search"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Search products..."
            className="h-9 lg:w-[300px]"
            defaultValue={defaultSearchQuery}
          />
        </form>

        {/* Seção de ícones e botões no cabeçalho */}
        <div className="flex items-center space-x-1">
          {/* Botão com ícone de carrinho de compras e contagem de itens no carrinho */}
          <Link href="/cart">
            <Button size="sm" variant="ghost">
              <ShoppingBag className="h-5 w-5" />
              <span className="ml-2 text-sm font-bold">{cartCount}</span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>

          {/* Componente de alternância de tema */}
          <ThemeToggle />

          {/* Botão com ícone de edição (exibido apenas em ambiente de desenvolvimento) */}
          {process.env.NODE_ENV === "development" && (
            <Link href="/studio">
              <Button size="sm" variant="ghost">
                <Edit className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
