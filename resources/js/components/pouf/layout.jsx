import { cva } from 'class-variance-authority';

/* The --gap indirection is kept from the original: children may not read it,
 * but emitting the same custom property keeps the computed-style contract
 * byte-identical, and it remains the single knob a wrapper can retune. */
const gapVariant = {
  1: '[--gap:var(--s1)] gap-[var(--gap,var(--s4))]',
  2: '[--gap:var(--s2)] gap-[var(--gap,var(--s4))]',
  3: '[--gap:var(--s3)] gap-[var(--gap,var(--s4))]',
  4: '[--gap:var(--s4)] gap-[var(--gap,var(--s4))]',
  5: '[--gap:var(--s5)] gap-[var(--gap,var(--s4))]',
  6: '[--gap:var(--s6)] gap-[var(--gap,var(--s4))]'
}

/* min-width: 0 on BOTH layout primitives, everywhere.
 *
 * A flex item defaults to `min-width: auto` — "never shrink below my content" —
 * and that default cascades: `<Text truncate>` can only ellipsis if EVERY
 * ancestor between it and the sized container is allowed to shrink. One Stack
 * without this and a long title (some run 200 characters of Persian)
 * drags the whole row wider than the dialog, producing a horizontal scrollbar
 * and pushing content off-screen.
 *
 * Set on the primitives rather than at call sites, because "remember min-width:0
 * on every wrapper" is exactly the kind of rule that gets forgotten once and
 * then looks like a mysterious layout bug. */

const stack = cva('pouf-stack flex flex-col min-w-0', {
  variants: { gap: gapVariant },
  defaultVariants: { gap: 4 },
})

export function Stack({
  children,
  gap
}) {
  return <div className={stack({ gap })}>{children}</div>
}

const row = cva('pouf-row flex flex-row min-w-0', {
  variants: {
    gap: gapVariant,
    align: { center: 'items-center', top: 'items-start' },
    justify: { start: '', center: 'justify-center', between: 'justify-between', end: 'justify-end' },
    wrap: { true: 'flex-wrap', false: 'flex-nowrap' },
  },
  defaultVariants: { gap: 4, align: 'center', justify: 'start', wrap: true },
})

export function Row({
  children,
  gap,
  align,
  justify,
  wrap
}) {
  return <div className={row({ gap, align, justify, wrap })}>{children}</div>
}

export function Spacer() {
  return <div className="pouf-spacer flex-auto min-w-0" />
}

/* Column counts are variants, not a --cols override, so a screen never needs an
 * inline style to lay out. Every variant collapses to one column under 900px. */
const grid = cva('pouf-grid grid', {
  variants: {
    cols: {
      2: 'grid-cols-2 max-[900px]:grid-cols-1',
      3: 'grid-cols-3 max-[900px]:grid-cols-1',
      4: 'grid-cols-4 max-[900px]:grid-cols-1',
      sidebar:
        '[grid-template-columns:minmax(0,2fr)_minmax(0,1fr)] max-[900px]:[grid-template-columns:minmax(0,1fr)]',
    },
    gap: gapVariant,
  },
  defaultVariants: { cols: 2, gap: 4 },
})

export function Grid({
  children,
  cols,
  gap
}) {
  return <div className={grid({ cols, gap })}>{children}</div>
}

export function Shell({
  children
}) {
  return (
    <div
      className={[
        'pouf-shell grid [grid-template-columns:260px_minmax(0,1fr)] gap-(--s6) p-(--s8) max-w-[1440px] mx-auto [align-items:start]',
        /* Below 900px: single column, tighter padding, and clearance for the
         * fixed bottom bar plus the home-indicator inset on iOS. */
        'max-[900px]:[grid-template-columns:minmax(0,1fr)] max-[900px]:p-(--s4)',
        'max-[900px]:pb-[calc(96px+env(safe-area-inset-bottom,0px))]',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export function Sidebar({
  children,
  mobile = 'show'
}) {
  return (
    <aside
      className={[
        'pouf-sidebar sticky top-(--s8) flex flex-col gap-(--s2)',
        mobile === 'hide' ? 'max-[900px]:hidden' : 'max-[900px]:static',
      ].join(' ')}
    >
      {children}
    </aside>
  )
}
