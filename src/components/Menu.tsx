const WA = 'https://wa.me/5511999999999?text=Ol%C3%A1%20Marcus!%20Quero%20pedir%20uma%20pizza%20%3A)'

const PIZZAS = [
  {
    id: 'marg',
    name: 'Margherita Gourmet',
    desc: 'Tomate artesanal · mussarela de búfala · manjericão fresco',
    price: 69,
  },
  {
    id: 'pres',
    name: 'Presunto Cru',
    desc: 'Tomate artesanal · mussarela de búfala · presunto cru · azeite',
    price: 79,
  },
  {
    id: 'cal',
    name: 'Calabresa Defumada',
    desc: 'Tomate artesanal · mussarela · calabresa defumada · orégano',
    price: 69,
  },
  {
    id: 'fra',
    name: 'Frango com Catupiry®',
    desc: 'Tomate artesanal · mussarela · frango desfiado · catupiry',
    price: 69,
  },
]

function WaIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function Menu() {
  return (
    <section id="menu" className="bg-paper paper-tex py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-12">

        {/* Header wordmark */}
        <div className="text-center mb-14">
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
              longa fermentação · 29 cm · sex &amp; sáb
            </span>
            <span className="h-px w-14 bg-ink/20" />
          </div>
        </div>

        {/* Signature pizza */}
        <div className="bg-terracotta-dark soot-tex text-cream p-6 flex items-start gap-5 mb-4">
          <div className="font-display text-wheat text-4xl italic leading-none pt-1 select-none">✦</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="font-display text-xl leading-tight">Pizza da Casa</div>
                <div className="font-sans text-[12px] text-cream/68 mt-1 leading-relaxed">
                  ricota · mussarela · queijo de minas · bacon · salsinha
                </div>
                <div className="font-hand text-wheat text-lg mt-1.5 -rotate-1 inline-block">
                  a do Marcus.
                </div>
              </div>
              <div className="font-display text-2xl text-wheat flex-shrink-0">R$ 79</div>
            </div>
          </div>
        </div>

        {/* Other pizzas grid */}
        <div className="grid md:grid-cols-2 gap-3 mb-14">
          {PIZZAS.map((p) => (
            <div
              key={p.id}
              className="border-l-2 border-ink/15 pl-4 py-3.5 bg-cream/40 hover:bg-cream/70 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="font-display text-[17px] text-ink leading-tight">{p.name}</div>
                <div className="font-display text-[18px] text-terracotta-dark flex-shrink-0">
                  R$ {p.price}
                </div>
              </div>
              <div className="font-sans text-[12px] text-ink/57 mt-1 leading-relaxed">{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="font-hand text-terracotta-dark text-2xl lg:text-3xl -rotate-1 inline-block mb-7">
            Sexta &amp; sábado. Avisa até 16h →<br />
            <span className="text-ink">desço na sua porta às 19h.</span>
          </p>
          <div>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-terracotta-dark text-cream font-sans text-xs tracking-[0.14em] uppercase font-bold px-8 py-4 hover:bg-ember transition-colors"
            >
              <WaIcon />
              Fazer pedido pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
