"use client"

import { useRouter, useSearchParams } from "next/navigation"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

// Definição dos filtros disponíveis
const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "bags", label: "Bags" },
      { value: "belts", label: "Belts" },
      { value: "gloves", label: "Gloves" },
      { value: "scarves", label: "Scarves" },
      { value: "wallets", label: "Wallets" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "xs", label: "X-Small" },
      { value: "s", label: "Small" },
      { value: "m", label: "Medium" },
      { value: "l", label: "Large" },
      { value: "xl", label: "X-Large" },
      { value: "one-size", label: "One Size" },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "black", label: "Black" },
      { value: "blue", label: "Blue" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
    ],
  },
]

// Componente ProductFilters
export function ProductFilters() {
  // Uso do hook useSearchParams para obter os parâmetros da busca na URL
  const SearchParams = useSearchParams()
  // Uso do hook useRouter para manipular a rota e navegação
  const router = useRouter()
  // Conversão dos parâmetros da busca em um array de pares de chave-valor
  const searchValues = Array.from(SearchParams.entries())

  // Renderização do componente na página
  return (
    <form className="sticky top-20">
      <h3 className="sr-only">Categories</h3>

      {/* Mapeamento dos filtros e criação de um Accordion para cada um */}
      {filters.map((section, i) => (
        <Accordion key={i} type="single" collapsible>
          <AccordionItem value={`item-${i}`}>
            <AccordionTrigger>
              {/* Título do Accordion com o nome do filtro e valor selecionado (se houver) */}
              <span>
                {section.name}
                {""}
                <span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
                {SearchParams.get(section.id)
                  ? `(${SearchParams.get(section.id)})`
                  : ""}
              </span>
            </AccordionTrigger>
            {/* Conteúdo do Accordion com as opções do filtro */}
            <AccordionContent>
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    {/* Checkbox para selecionar a opção */}
                    <Checkbox
                      id={`fiter-${section.id}-${optionIdx}`}
                      checked={searchValues.some(
                        ([key, value]) =>
                          key === section.id && value === option.value
                      )}
                      onClick={(event) => {
                        const params = new URLSearchParams(SearchParams)
                        const checked =
                          event.currentTarget.dataset.state === "checked"
                        checked
                          ? params.delete(section.id)
                          : params.set(section.id, option.value)
                        // Atualiza a rota com os novos parâmetros de busca
                        router.replace(`/?${params.toString()}`)
                      }}
                    />
                    {/* Label da opção do filtro */}
                    <label
                      htmlFor="id={`fiter-${section.id}-${optionIdx}`}"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </form>
  )
}
