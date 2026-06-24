/**
 * Egg-hatch visuals for the pet generation flow (Cmd-K → Pets → Generate).
 *
 * `PetEggHatch` is the incubation beat shown while `pet.hatch` runs: a wobbling,
 * glowing egg that reads as "something is about to hatch" instead of a bare
 * spinner. `PetHatchSparkles` is the one-shot flash + sparkle burst layered over
 * the revealed sprite. All motion is CSS (see `styles.css`) and is disabled
 * under `prefers-reduced-motion`.
 */

import { type CSSProperties } from 'react'

import { Sparkles } from '@/lib/icons'

interface PetEggHatchProps {
  title: string
  subtitle?: string
}

// A few off-center freckles so the egg doesn't read as a flat oval.
const EGG_SPOTS = [
  { width: '0.6rem', height: '0.45rem', top: '44%', left: '28%' },
  { width: '0.5rem', height: '0.4rem', top: '60%', left: '58%' },
  { width: '0.4rem', height: '0.32rem', top: '72%', left: '40%' }
]

export function PetEggHatch({ title, subtitle }: PetEggHatchProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-2 py-8">
      <div className="flex flex-col items-center">
        <div className="relative flex h-28 w-24 items-end justify-center">
          <span className="pet-egg__glow" />
          <div className="pet-egg">
            <span className="pet-egg__shine" />
            {EGG_SPOTS.map((spot, i) => (
              <span className="pet-egg__spot" key={i} style={spot} />
            ))}
          </div>
        </div>
        <span className="pet-egg-shadow mt-1" />
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-xs font-medium text-foreground">{title}</p>
        {subtitle && <p className="max-w-[15rem] text-[0.6875rem] leading-snug text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  )
}

// Sparkle end positions, in rem, radiating from the sprite center.
const SPARKLES = [
  { sx: '-3.2rem', sy: '-2.4rem', size: 'size-4', delay: '40ms' },
  { sx: '3rem', sy: '-2.8rem', size: 'size-3', delay: '120ms' },
  { sx: '3.6rem', sy: '1.6rem', size: 'size-4', delay: '0ms' },
  { sx: '-3.4rem', sy: '1.8rem', size: 'size-3', delay: '160ms' },
  { sx: '0rem', sy: '-3.4rem', size: 'size-3', delay: '90ms' }
]

/** One-shot flash + sparkle burst, layered over a freshly revealed sprite. */
export function PetHatchSparkles() {
  return (
    <>
      <span className="pet-hatch-flash" />
      {SPARKLES.map((s, i) => (
        <Sparkles
          className={`pet-sparkle ${s.size}`}
          key={i}
          style={{ '--sx': s.sx, '--sy': s.sy, animationDelay: s.delay } as CSSProperties}
        />
      ))}
    </>
  )
}
