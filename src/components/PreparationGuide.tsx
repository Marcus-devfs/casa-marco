const STEPS = [
  {
    n: '01',
    title: 'Tire do freezer antes',
    desc: 'Retire a pizza do freezer uns 15–20 minutos antes de assar (ou deixe na geladeira na noite anterior). Ela descongela um pouco e assa muito mais uniforme.',
  },
  {
    n: '02',
    title: 'Pré-aqueça o forno',
    desc: 'Ligue o forno na temperatura mais alta (uns 250°C) e deixe esquentando de verdade por 10 minutos antes de colocar a pizza — forno frio é o maior inimigo da crosta boa.',
  },
  {
    n: '03',
    title: 'Umedeça as bordas',
    desc: 'Passe ou borrife um pouco de água nas bordas da massa antes de assar. É o segredo pra crosta não ressecar e ficar com aquele ar de forno a lenha.',
  },
  {
    n: '04',
    title: 'Direto na grade',
    desc: 'Retire da embalagem a vácuo e coloque a pizza direto na grade do forno, sem forma. Assim o calor circula por baixo também e a base fica crocante.',
  },
  {
    n: '05',
    title: 'De olho no relógio',
    desc: 'Em 5 a 8 minutos ela está pronta: borda dourada, queijo borbulhando. Cada forno é um forno — na primeira vez, fique por perto.',
  },
]

export function PreparationGuide() {
  return (
    <section id="modo-de-preparo" className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase font-semibold text-terracotta-dark mb-4">
            pré-assada · congelada · a vácuo
          </p>
          <h2 className="font-display text-charcoal text-4xl lg:text-5xl leading-tight">
            Do freezer pro forno
          </h2>
          <div className="font-hand font-bold text-terracotta-dark text-[2.5rem] lg:text-5xl leading-[0.85] -rotate-2 inline-block mt-1">
            em poucos minutos.
          </div>
          <p className="font-sans text-[14px] text-ink/60 max-w-lg mx-auto mt-5 leading-relaxed">
            Sua pizza chega pré-assada, selada a vácuo e congelada — pronta pra virar jantar
            quando você quiser, sem hora marcada. É só seguir o passo a passo:
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {STEPS.map(({ n, title, desc }) => (
            <div key={n} className="flex flex-col gap-3">
              <div className="font-display text-terracotta-dark/25 text-5xl leading-none">{n}</div>
              <div className="w-10 h-px bg-terracotta-dark/25" />
              <div className="font-display text-charcoal text-lg leading-tight">{title}</div>
              <div className="font-sans text-ink/62 text-[12.5px] leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>

        <p className="text-center font-sans text-[11px] text-ink/35 tracking-[0.14em] uppercase mt-14">
          Tempos e temperatura podem variar um pouco de forno pra forno
        </p>
      </div>
    </section>
  )
}
