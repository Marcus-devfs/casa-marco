'use client'

import { useEffect, useState } from 'react'

const WA = 'https://wa.me/5511999999999?text=Ol%C3%A1%20Marcus!%20Quero%20pedir%20uma%20pizza%20%3A)'

interface CardapioItem {
  id: string
  nome: string
  descricaoGourmet: string
  precoVenda: number
  saldoDisponivel: number
}

const fmt = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const hojeISO = () => new Date().toISOString().slice(0, 10)

function WaIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function QuantityStepper({
  value,
  max,
  onChange,
}: {
  value: number
  max: number
  onChange: (value: number) => void
}) {
  if (max <= 0) {
    return (
      <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-ember/80 border border-ember/30 px-2.5 py-1">
        Esgotado
      </span>
    )
  }

  return (
    <div className="flex items-center gap-3 border border-ink/15 bg-cream">
      <button
        type="button"
        aria-label="Diminuir quantidade"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-8 h-8 flex items-center justify-center font-sans text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors disabled:opacity-30"
        disabled={value === 0}
      >
        −
      </button>
      <span className="font-display text-base text-ink w-4 text-center select-none">{value}</span>
      <button
        type="button"
        aria-label="Aumentar quantidade"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-8 h-8 flex items-center justify-center font-sans text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors disabled:opacity-30"
        disabled={value >= max}
      >
        +
      </button>
    </div>
  )
}

export function Menu() {
  const [cardapio, setCardapio] = useState<CardapioItem[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erroCarregamento, setErroCarregamento] = useState(false)

  const [quantidades, setQuantidades] = useState<Record<string, number>>({})
  const [cliente, setCliente] = useState('')
  const [telefone, setTelefone] = useState('')
  const [dataRetirada, setDataRetirada] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState<string | null>(null)
  const [pedidoEnviado, setPedidoEnviado] = useState(false)

  useEffect(() => {
    fetch('/api/cardapio')
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao carregar cardápio')
        return res.json()
      })
      .then((data: CardapioItem[]) => setCardapio(data))
      .catch(() => setErroCarregamento(true))
      .finally(() => setCarregando(false))
  }, [])

  const pizzaCasa = cardapio.find((p) => p.nome === 'Pizza da Casa')
  const outrasPizzas = cardapio.filter((p) => p.id !== pizzaCasa?.id)

  const itensSelecionados = Object.entries(quantidades).filter(([, qtd]) => qtd > 0)
  const totalItens = itensSelecionados.reduce((acc, [, qtd]) => acc + qtd, 0)
  const totalPedido = itensSelecionados.reduce((acc, [id, qtd]) => {
    const pizza = cardapio.find((p) => p.id === id)
    return acc + (pizza?.precoVenda ?? 0) * qtd
  }, 0)

  async function enviarPedido(e: React.FormEvent) {
    e.preventDefault()
    setErroEnvio(null)

    if (itensSelecionados.length === 0) {
      setErroEnvio('Escolha ao menos uma pizza no cardápio acima.')
      return
    }
    if (!cliente.trim() || !telefone.trim()) {
      setErroEnvio('Preencha seu nome e telefone.')
      return
    }
    if (!dataRetirada) {
      setErroEnvio('Escolha a data em que quer retirar/receber o pedido.')
      return
    }

    setEnviando(true)
    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente,
          telefone,
          observacoes,
          dataRetirada,
          itens: itensSelecionados.map(([produto, quantidade]) => ({ produto, quantidade })),
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Não foi possível enviar o pedido')

      setPedidoEnviado(true)
      setQuantidades({})
      setCliente('')
      setTelefone('')
      setDataRetirada('')
      setObservacoes('')
    } catch (err) {
      setErroEnvio(err instanceof Error ? err.message : 'Não foi possível enviar o pedido')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section id="menu" className="bg-paper paper-tex py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">

        {/* Header wordmark */}
        <div className="text-center mb-10">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase font-semibold text-terracotta-dark mb-4">
            — il menu —
          </p>
          <div>
            <div className="font-sans text-[11px] tracking-[0.5em] uppercase font-semibold text-terracotta-dark pl-[0.5em]">
              Casa
            </div>
            <div className="font-hand font-bold text-[3.25rem] leading-[0.85] text-ink -rotate-2 inline-block">
              Marco
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-px w-14 bg-ink/20" />
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase font-medium text-ink/45">
              longa fermentação · 29 cm
            </span>
            <span className="h-px w-14 bg-ink/20" />
          </div>
        </div>

        {/* Badges de produto */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {['❄️ Pré-assada & congelada', '🔒 Selada a vácuo', '📦 Sob encomenda'].map((label) => (
            <span
              key={label}
              className="font-sans text-[10px] tracking-[0.14em] uppercase font-semibold text-terracotta-dark bg-terracotta-dark/8 px-3 py-1.5"
            >
              {label}
            </span>
          ))}
        </div>

        {carregando && (
          <p className="text-center font-sans text-sm text-ink/40 mb-14">Carregando cardápio...</p>
        )}

        {erroCarregamento && (
          <p className="text-center font-sans text-sm text-ember mb-14">
            Não foi possível carregar o cardápio agora. Chama no WhatsApp que a gente resolve :)
          </p>
        )}

        {!carregando && !erroCarregamento && (
          <>
            {/* Signature pizza */}
            {pizzaCasa && (
              <div className="bg-terracotta-dark soot-tex text-cream p-6 flex items-start gap-5 mb-4">
                <div className="font-display text-wheat text-4xl italic leading-none pt-1 select-none">
                  ✦
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="font-display text-xl leading-tight">{pizzaCasa.nome}</div>
                      <div className="font-sans text-[12px] text-cream/68 mt-1 leading-relaxed">
                        {pizzaCasa.descricaoGourmet}
                      </div>
                      <div className="font-hand text-wheat text-lg mt-1.5 -rotate-1 inline-block">
                        a do Marcus.
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="font-display text-2xl text-wheat">{fmt(pizzaCasa.precoVenda)}</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <QuantityStepper
                      value={quantidades[pizzaCasa.id] ?? 0}
                      max={pizzaCasa.saldoDisponivel}
                      onChange={(v) => setQuantidades((prev) => ({ ...prev, [pizzaCasa.id]: v }))}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Other pizzas grid */}
            <div className="grid md:grid-cols-2 gap-3 mb-14">
              {outrasPizzas.map((p) => (
                <div
                  key={p.id}
                  className="border-l-2 border-ink/15 pl-4 py-3.5 bg-cream/40 hover:bg-cream/70 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="font-display text-[17px] text-ink leading-tight">{p.nome}</div>
                    <div className="font-display text-[18px] text-terracotta-dark flex-shrink-0">
                      {fmt(p.precoVenda)}
                    </div>
                  </div>
                  <div className="font-sans text-[12px] text-ink/57 mt-1 leading-relaxed">
                    {p.descricaoGourmet}
                  </div>
                  <div className="mt-3">
                    <QuantityStepper
                      value={quantidades[p.id] ?? 0}
                      max={p.saldoDisponivel}
                      onChange={(v) => setQuantidades((prev) => ({ ...prev, [p.id]: v }))}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Carrinho / pedido pelo site */}
            <div className="bg-cream/60 border border-ink/10 p-6 lg:p-8 mb-14">
              {pedidoEnviado ? (
                <div className="text-center py-6">
                  <p className="font-display text-2xl text-ink mb-2">Pedido recebido! 🍕</p>
                  <p className="font-sans text-sm text-ink/60">
                    Te chamo no telefone informado pra confirmar a retirada/entrega.
                  </p>
                  <button
                    type="button"
                    onClick={() => setPedidoEnviado(false)}
                    className="mt-5 font-sans text-[11px] tracking-[0.14em] uppercase font-bold text-terracotta-dark hover:text-ember transition-colors"
                  >
                    Fazer outro pedido
                  </button>
                </div>
              ) : (
                <form onSubmit={enviarPedido} className="flex flex-col gap-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">🛒</span>
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold text-ink/45">
                      Seu carrinho
                    </p>
                  </div>

                  {itensSelecionados.length === 0 ? (
                    <p className="text-center font-sans text-xs text-ink/40 py-2">
                      Escolha as pizzas no cardápio acima pra montar seu pedido.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-1.5 border-b border-ink/10 pb-4">
                      {itensSelecionados.map(([id, qtd]) => {
                        const pizza = cardapio.find((p) => p.id === id)
                        if (!pizza) return null
                        return (
                          <div key={id} className="flex items-center justify-between gap-4">
                            <span className="font-sans text-sm text-ink/75">
                              {qtd}× {pizza.nome}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="font-sans text-sm text-ink/60">
                                {fmt(pizza.precoVenda * qtd)}
                              </span>
                              <button
                                type="button"
                                aria-label={`Remover ${pizza.nome} do carrinho`}
                                onClick={() => setQuantidades((prev) => ({ ...prev, [id]: 0 }))}
                                className="text-ember/60 hover:text-ember transition-colors text-xs"
                              >
                                remover
                              </button>
                            </div>
                          </div>
                        )
                      })}
                      <div className="flex items-center justify-between gap-4 pt-1.5">
                        <span className="font-sans text-xs uppercase tracking-wide font-semibold text-ink">
                          Total · {totalItens} pizza{totalItens !== 1 ? 's' : ''}
                        </span>
                        <span className="font-display text-xl text-terracotta-dark">{fmt(totalPedido)}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      value={cliente}
                      onChange={(e) => setCliente(e.target.value)}
                      placeholder="Seu nome"
                      className="border border-ink/20 bg-cream text-ink font-sans text-sm px-3 py-2.5 w-full placeholder:text-ink/35 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30"
                    />
                    <input
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      placeholder="WhatsApp (11987654321)"
                      className="border border-ink/20 bg-cream text-ink font-sans text-sm px-3 py-2.5 w-full placeholder:text-ink/35 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-sans text-[10px] tracking-[0.18em] uppercase font-semibold text-ink/45">
                      Quando você quer retirar/receber?
                    </label>
                    <input
                      type="date"
                      min={hojeISO()}
                      value={dataRetirada}
                      onChange={(e) => setDataRetirada(e.target.value)}
                      className="border border-ink/20 bg-cream text-ink font-sans text-sm px-3 py-2.5 w-full focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30"
                    />
                    <p className="font-sans text-[10px] text-ink/35 mt-0.5">
                      Trabalhamos por encomenda — combinamos os detalhes por WhatsApp após o pedido.
                    </p>
                  </div>

                  <textarea
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Bloco, apartamento, preferências..."
                    rows={2}
                    className="border border-ink/20 bg-cream text-ink font-sans text-sm px-3 py-2.5 w-full placeholder:text-ink/35 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30 resize-none"
                  />

                  {erroEnvio && <p className="font-sans text-xs text-ember text-center">{erroEnvio}</p>}

                  <button
                    type="submit"
                    disabled={enviando}
                    className="self-center inline-flex items-center gap-3 bg-terracotta-dark text-cream font-sans text-xs tracking-[0.14em] uppercase font-bold px-8 py-4 hover:bg-ember transition-colors disabled:opacity-50"
                  >
                    {enviando ? 'Enviando...' : 'Confirmar pedido'}
                  </button>
                </form>
              )}
            </div>
          </>
        )}

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="font-hand text-terracotta-dark text-2xl lg:text-3xl -rotate-1 inline-block mb-7">
            Prefere combinar no seu ritmo?
            <br />
            <span className="text-ink">Também dá pra fechar tudo pelo WhatsApp.</span>
          </p>
          <div>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-terracotta-dark text-cream font-sans text-xs tracking-[0.14em] uppercase font-bold px-8 py-4 hover:bg-ember transition-colors"
            >
              <WaIcon />
              Pedir pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
