import { Seal } from './Seal'

const WA = 'https://wa.me/5511999999999?text=Ol%C3%A1%20Marcus!%20Quero%20pedir%20uma%20pizza%20%3A)'

const STATS = [
  { n: '48h', t: 'fermentação' },
  { n: '400°', t: 'no forno' },
  { n: '5-8 min', t: 'pra assar em casa' },
  { n: '29 cm', t: 'pra dividir' },
]

export function Hero() {
  return (
    <section id="hero" className="min-h-screen bg-terracotta-dark soot-tex flex flex-col">
      {/* Main grid */}
      <div className="flex-1 mx-auto max-w-7xl w-full px-6 lg:px-12 grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-0 pt-24 pb-8 lg:pb-0">

        {/* Left · text */}
        <div className="flex flex-col gap-7 py-10 lg:py-0">
          <p className="font-sans text-[11px] tracking-[0.46em] uppercase font-semibold text-wheat pl-[0.46em]">
            ✦ Pizza Napoletana · São Paulo ✦
          </p>

          <h1 className="flex flex-col gap-0.5">
            <span className="font-display text-cream text-5xl lg:text-6xl xl:text-7xl leading-[0.95]">
              Pizza, como
            </span>
            <span className="font-hand font-bold text-wheat text-[3.75rem] lg:text-7xl xl:text-[5.25rem] leading-[0.82] -rotate-2 inline-block self-start">
              em casa
            </span>
            <span className="font-display text-cream text-5xl lg:text-6xl xl:text-7xl leading-[0.95]">
              de família italiana.
            </span>
          </h1>

          <p className="font-sans text-[15px] leading-relaxed text-cream/72 max-w-[400px]">
            Massa de 48 horas, ingredientes selecionados, forno PizzaHome P300 a 400°C.
            Pré-assada, selada a vácuo e congelada — pronta pra virar jantar quando você
            quiser, sob encomenda.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-wheat text-soot font-sans text-xs tracking-[0.14em] uppercase font-bold px-7 py-4 hover:bg-wheat-soft transition-colors"
            >
              Pedir pizza →
            </a>
            <a
              href="#menu"
              className="border border-cream/35 text-cream font-sans text-xs tracking-[0.14em] uppercase font-bold px-7 py-4 hover:bg-cream/10 transition-colors"
            >
              Ver cardápio
            </a>
          </div>
        </div>

        {/* Right · image + seal (hidden on mobile) */}
        <div className="hidden lg:flex relative items-stretch self-stretch min-h-[520px]">
          <div className="flex-1 relative overflow-hidden">
            {/* Abstract pizza sketch */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg viewBox="0 0 400 400" className="w-full h-full max-w-[340px] max-h-[340px] opacity-[0.06]">
                <circle cx="200" cy="200" r="176" stroke="#d4a574" strokeWidth="2" fill="none" />
                <circle cx="200" cy="200" r="142" stroke="#d4a574" strokeWidth="1.2" fill="none" />
                <circle cx="200" cy="200" r="108" stroke="#d4a574" strokeWidth="1.6" fill="none" />
                <line x1="200" y1="24" x2="200" y2="376" stroke="#d4a574" strokeWidth="0.6" />
                <line x1="24" y1="200" x2="376" y2="200" stroke="#d4a574" strokeWidth="0.6" />
                <line x1="76" y1="76" x2="324" y2="324" stroke="#d4a574" strokeWidth="0.6" />
                <line x1="324" y1="76" x2="76" y2="324" stroke="#d4a574" strokeWidth="0.6" />
              </svg>
            </div>

            {/* Photo label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-cream/18 font-sans text-[10px] tracking-[0.26em] uppercase">
                foto · pizza no forno
              </div>
            </div>

            {/* Floating seal */}
            <div className="absolute bottom-10 left-10 bg-cream rounded-full p-3 shadow-2xl shadow-soot/50">
              <Seal size={82} color="ink" />
            </div>

            {/* Availability badge */}
            <div className="absolute top-8 right-8 bg-wheat text-soot font-sans text-[9px] tracking-[0.22em] uppercase font-bold px-4 py-2">
              CONGELADA A VÁCUO
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-charcoal py-5 px-6 lg:px-12">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-8 lg:gap-14">
            {STATS.map(({ n, t }) => (
              <div key={n}>
                <div className="font-display text-wheat text-2xl lg:text-3xl leading-none">{n}</div>
                <div className="font-sans text-[9px] text-cream/50 tracking-[0.18em] uppercase mt-1">
                  {t}
                </div>
              </div>
            ))}
          </div>
          <div className="hidden lg:block font-hand text-wheat text-2xl -rotate-2">
            &ldquo;Sempre tem pizza no freezer.&rdquo;
          </div>
        </div>
      </div>
    </section>
  )
}
