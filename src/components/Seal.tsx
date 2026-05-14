type SealProps = { size?: number; color?: 'cream' | 'ink' }

export function Seal({ size = 200, color = 'cream' }: SealProps) {
  const isCream = color === 'cream'
  const ink = isCream ? '#f5ede0' : '#2d2520'
  const acc = isCream ? '#d4a574' : '#8b3a1f'
  const topId = `st-${color}`
  const botId = `sb-${color}`

  return (
    <svg viewBox="0 0 240 240" width={size} height={size} style={{ display: 'block' }}>
      <circle cx="120" cy="120" r="116" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.7" />
      <circle cx="120" cy="120" r="110" fill="none" stroke={ink} strokeWidth="2.4" />
      <circle cx="120" cy="120" r="94" fill="none" stroke={ink} strokeWidth="0.6" opacity="0.5" />

      <defs>
        <path id={topId} d="M 30 120 A 90 90 0 0 1 210 120" fill="none" />
        <path id={botId} d="M 30 120 A 90 90 0 0 0 210 120" fill="none" />
      </defs>

      <text
        fill={ink}
        style={{ fontFamily: 'var(--font-display, "DM Serif Display", serif)', fontStyle: 'italic' }}
        fontSize="13"
        letterSpacing="4"
      >
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          ✦ C A S A ✦
        </textPath>
      </text>
      <text
        fill={ink}
        style={{ fontFamily: 'var(--font-sans, Manrope, sans-serif)' }}
        fontSize="9"
        letterSpacing="3.2"
        fontWeight="500"
      >
        <textPath href={`#${botId}`} startOffset="50%" textAnchor="middle">
          PIZZA NAPOLETANA · MMXXVI
        </textPath>
      </text>

      <g fill={acc}>
        <circle cx="14" cy="120" r="2.4" />
        <circle cx="226" cy="120" r="2.4" />
      </g>

      <text
        x="120"
        y="138"
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-hand, Caveat, cursive)', fontSize: '58px', fontWeight: '700' }}
        fill={ink}
        transform="rotate(-3 120 130)"
      >
        Marco
      </text>

      <g transform="translate(120 162)" stroke={acc} strokeWidth="1.4" fill="none">
        <path d="M -18 6 Q -18 -10 0 -10 Q 18 -10 18 6 Z" />
        <line x1="-22" y1="9" x2="22" y2="9" />
        <path
          d="M -2 4 Q -5 0 -2 -4 Q 1 -1 3 -4 Q 6 1 1 6 Q -1 6 -2 4 Z"
          fill={acc}
          stroke="none"
        />
      </g>
    </svg>
  )
}
