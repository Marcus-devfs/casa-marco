const WA = 'https://wa.me/5511999999999?text=Ol%C3%A1%20Marcus!%20Quero%20pedir%20uma%20pizza%20%3A)'

const STEPS = [
  {
    n: '01',
    title: 'Monte seu pedido',
    desc: 'Pelo site (com carrinho e tudo) ou no WhatsApp, do jeito que preferir. Escolha os sabores e as quantidades.',
  },
  {
    n: '02',
    title: 'Diga quando quer retirar',
    desc: 'Trabalhamos por encomenda — você escolhe a data de retirada/entrega que funciona pra você, sem pressa.',
  },
  {
    n: '03',
    title: 'Chega pronta pra assar',
    desc: 'Pizza pré-assada, selada a vácuo e congelada. Guarda no freezer e assa em minutos, quando bater a fome.',
  },
]

function WaIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function HowToOrder() {
  return (
    <section id="pedido" className="bg-terracotta-dark soot-tex py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase font-semibold text-wheat mb-4">
            como funciona
          </p>
          <h2 className="font-display text-cream text-4xl lg:text-5xl leading-tight">
            Simples como
          </h2>
          <div className="font-hand font-bold text-wheat text-[2.75rem] lg:text-5xl leading-[0.85] -rotate-2 inline-block mt-1">
            conversar com vizinho.
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-14">
          {STEPS.map(({ n, title, desc }) => (
            <div key={n} className="flex flex-col gap-3">
              <div className="font-display text-wheat/35 text-5xl leading-none">{n}</div>
              <div className="w-10 h-px bg-wheat/30" />
              <div className="font-display text-cream text-xl leading-tight">{title}</div>
              <div className="font-sans text-cream/65 text-sm leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white font-sans text-sm tracking-[0.1em] uppercase font-bold px-10 py-5 hover:bg-[#1ebe5d] transition-colors shadow-2xl shadow-soot/50"
          >
            <WaIcon />
            Pedir agora pelo WhatsApp
          </a>
          <p className="font-sans text-cream/42 text-[11px] tracking-[0.2em] uppercase mt-5">
            Ou monte seu pedido pelo site, com carrinho e data de retirada
          </p>
        </div>
      </div>
    </section>
  )
}
