const PRINCIPLES = [
  { title: 'Mãos na massa', desc: 'Tudo é feito por uma pessoa só, e isso é o ponto.' },
  { title: 'Mesa de família', desc: 'A pizza pertence à mesa, não ao app.' },
  { title: 'Italiano de verdade', desc: 'Longa fermentação, sem atalho.' },
  { title: 'Vizinho, não fornecedor', desc: 'Você pediu, eu te conheço.' },
]

export function About() {
  return (
    <section id="historia" className="bg-cream-warm py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

        {/* Left · story */}
        <div className="flex flex-col gap-7">
          <div>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase font-semibold text-terracotta-dark mb-4">
              A história
            </p>
            <h2 className="font-display text-4xl lg:text-5xl text-charcoal leading-[1.0]">
              Feito à mão,{' '}
              <span className="font-hand font-bold text-[1.2em] text-terracotta-dark -rotate-2 inline-block leading-[0.85]">
                com carinho.
              </span>
            </h2>
          </div>

          <div className="space-y-4 font-sans text-[15px] leading-[1.7] text-ink/78">
            <p>
              Sou o Marcus. Cristão, familiar, apaixonado por pizza. Aprendi fazendo em casa
              — tudo na prática, sem escola de pizzaiolo. Só forno, farinha e muita tentativa
              até acertar o ponto.
            </p>
            <p>
              Hoje faço massa de longa fermentação (48 horas), uso ingredientes selecionados e
              um forno que chega a 400°C. O resultado é uma pizza leve, que não estufa — do
              jeito que pizza boa tem que ser.
            </p>
            <p>
              Não é uma pizzaria. É o vizinho que faz pizza artesanal, pré-assa no ponto certo,
              sela a vácuo e congela — pra você ter em casa sempre que bater a vontade, sem
              precisar de hora marcada.
            </p>
          </div>

          {/* Pull quote */}
          <blockquote className="border-l-4 border-terracotta-dark pl-5 mt-2">
            <p className="font-display italic text-2xl text-charcoal leading-tight">
              &ldquo;Como jantar na casa de uma família italiana.&rdquo;
            </p>
            <footer className="font-hand text-terracotta-dark text-xl mt-2">
              — o que os clientes dizem
            </footer>
          </blockquote>
        </div>

        {/* Right · image + principles */}
        <div className="flex flex-col gap-8">
          {/* Image placeholder */}
          <div className="relative aspect-[4/3] bg-terracotta-dark soot-tex overflow-hidden flex items-center justify-center">
            <p className="text-center text-cream/20 font-sans text-[10px] tracking-[0.26em] uppercase">
              foto · o Marcus e o forno
            </p>
            {/* Decorative diagonal grain */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(212,165,116,0.05) 0 6px, transparent 6px 14px)',
              }}
            />
          </div>

          {/* Principles */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {PRINCIPLES.map(({ title, desc }) => (
              <div key={title}>
                <div className="font-display text-[18px] text-charcoal leading-tight mb-1">
                  {title}
                </div>
                <div className="font-sans text-[12px] text-ink/62 leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
