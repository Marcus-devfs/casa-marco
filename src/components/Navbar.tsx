'use client'

import { useState, useEffect } from 'react'
import { Monogram } from './Monogram'

const WA = 'https://wa.me/5511999999999?text=Ol%C3%A1%20Marcus!%20Quero%20pedir%20uma%20pizza%20%3A)'

const LINKS = [
  ['Cardápio', '#menu'],
  ['História', '#historia'],
  ['Como pedir', '#pedido'],
] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const onBg = !scrolled

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-paper/95 backdrop-blur-sm border-b border-ink/[0.07] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <Monogram size={34} color={onBg ? 'cream' : 'ink'} />
          <div className="leading-none">
            <div
              className={`font-sans text-[9px] tracking-[0.42em] uppercase font-semibold transition-colors ${
                onBg ? 'text-wheat' : 'text-terracotta-dark'
              }`}
            >
              Casa
            </div>
            <div
              className={`font-hand font-bold text-[22px] leading-[0.85] -rotate-2 inline-block transition-colors ${
                onBg ? 'text-cream' : 'text-ink'
              }`}
            >
              Marco
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`font-sans text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors ${
                onBg
                  ? 'text-cream/70 hover:text-wheat'
                  : 'text-ink/60 hover:text-terracotta-dark'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden md:inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.12em] uppercase font-bold px-5 py-3 transition-colors ${
            onBg
              ? 'bg-wheat text-soot hover:bg-wheat-soft'
              : 'bg-terracotta-dark text-cream hover:bg-ember'
          }`}
        >
          Pedir pelo WhatsApp →
        </a>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 transition-colors ${onBg ? 'text-cream' : 'text-ink'}`}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {open ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-paper border-t border-ink/[0.07] px-6 py-5 flex flex-col gap-1">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-sans text-sm tracking-[0.16em] uppercase font-semibold text-ink/70 py-3 border-b border-ink/[0.06] hover:text-terracotta-dark transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-center font-sans text-xs tracking-[0.12em] uppercase font-bold bg-terracotta-dark text-cream px-5 py-4 hover:bg-ember transition-colors"
          >
            Pedir pelo WhatsApp →
          </a>
        </div>
      )}
    </header>
  )
}
