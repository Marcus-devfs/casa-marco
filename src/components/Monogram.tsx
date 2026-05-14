type MonogramProps = { size?: number; color?: 'cream' | 'ink' }

export function Monogram({ size = 44, color = 'cream' }: MonogramProps) {
  const isCream = color === 'cream'
  const ink = isCream ? '#f5ede0' : '#2d2520'
  const acc = isCream ? '#d4a574' : '#8b3a1f'

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ display: 'block' }}>
      <circle cx="60" cy="60" r="56" fill="none" stroke={ink} strokeWidth="1.6" />
      <circle cx="60" cy="60" r="52" fill="none" stroke={ink} strokeWidth="0.5" opacity="0.55" />
      <text
        x="60"
        y="78"
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-hand, Caveat, cursive)', fontSize: '60px', fontWeight: '700' }}
        fill={ink}
        transform="rotate(-3 60 70)"
      >
        M
      </text>
      <text
        x="60"
        y="100"
        textAnchor="middle"
        style={{ fontFamily: 'var(--font-sans, Manrope, sans-serif)', fontSize: '7px', letterSpacing: '2.4px' }}
        fill={acc}
        fontWeight="600"
      >
        CASA · MARCO
      </text>
    </svg>
  )
}
