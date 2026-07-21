import { Seal } from './Seal'

export function Footer() {
  return (
    <footer className="bg-charcoal py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Top row */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 pb-10 border-b border-cream/[0.08]">

          {/* Logo */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start gap-3">
            <Seal size={96} color="cream" />
            <p className="font-sans text-cream/40 text-[10px] tracking-[0.22em] uppercase">
              Feito à mão · MMXXVI
            </p>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center lg:text-left">
            <div>
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase font-semibold text-wheat mb-3">
                Encomendas
              </p>
              <div className="font-sans text-[13px] text-cream/65 leading-relaxed">
                Pizza congelada
                <br />
                Você escolhe a data
                <br />
                de retirada/entrega
              </div>
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase font-semibold text-wheat mb-3">
                Contato
              </p>
              <div className="font-sans text-[13px] text-cream/65 leading-relaxed">
                WhatsApp
                <br />
                <a
                  href="https://wa.me/5511999999999"
                  className="text-wheat hover:text-wheat-soft transition-colors"
                >
                  (11) 99999·9999
                </a>
              </div>
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase font-semibold text-wheat mb-3">
                Instagram
              </p>
              <div className="font-sans text-[13px] text-cream/65 leading-relaxed">
                <a
                  href="https://instagram.com/casa.marco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wheat hover:text-wheat-soft transition-colors"
                >
                  @casa.marco
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-hand text-wheat text-2xl -rotate-1">
            &ldquo;Sempre tem pizza no freezer.&rdquo;
          </div>
          <p className="font-sans text-[11px] text-cream/30 tracking-[0.18em] uppercase">
            Casa Marco · Pizza Napoletana · São Paulo
          </p>
        </div>
      </div>
    </footer>
  )
}
