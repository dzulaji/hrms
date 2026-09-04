import { cva, cx } from 'class-variance-authority'
import { forwardRef } from 'react';
import { toneClass } from './tone';

/* 'pouf-btn' rides along as an unstyled MARKER class: it carries no rules of
 * its own anymore, but container selectors (e.g. the dialog head's
 * `> .pouf-btn` spacing override) still address buttons through it.
 *
 * Same-property utilities don't cascade like the old selectors did, so
 * solid/quiet each own their background and shadow outright. A disabled
 * cushion must read as pressed-flat, not merely faded: the affordance is the
 * depth, so removing the depth is the real signal — solid goes pressed,
 * quiet (already flat) goes bare. */
const button = cva(
  [
    'pouf-btn relative items-center justify-center gap-(--s2) font-pouf font-black leading-none',
    /* Colour lives on the variants, not here: `solid` sits on a pastel accent
     * and must follow --on-accent (which stays dark in dark mode), while
     * `quiet` is transparent on the page and follows --ink. In light mode both
     * resolve to the same value, so this is a no-op for the goldens. */
    'border-none cursor-pointer [touch-action:manipulation]',
    '[transition:box-shadow_120ms_ease,transform_120ms_ease]',
    'enabled:active:[transform:translateY(2px)] enabled:active:cushion-control-active',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        /* Centre labels in the complete cushion silhouette. The old 6px
         * top/bottom bias placed type visibly high once the floor lip and
         * drop-shadow were read as part of the control. */
        sm: 'text-[13px] px-4 py-[9px] min-h-[38px] rounded-[14px]',
        md: 'text-[15px] px-[26px] py-[14px] min-h-12 rounded-control',
        lg: 'text-[17px] px-8 py-[18px] min-h-14 rounded-control',
      },
      variant: {
        solid:
          'text-[var(--on-accent)] bg-[var(--tone,var(--purple))] cushion-control disabled:cushion-control-active disabled:[transform:translateY(2px)]',
        quiet:
          'text-[var(--quiet-ink,var(--ink))] bg-transparent [box-shadow:inset_0_0_0_2px_rgba(201,168,255,0.55)] enabled:hover:bg-bg enabled:hover:text-ink enabled:hover:cushion-field disabled:[box-shadow:none]',
      },
      block: {
        true: 'flex w-full',
        false: 'inline-flex',
      },
      shape: {
        label: '',
        icon: '',
      },
    },
    compoundVariants: [
      { size: 'sm', shape: 'icon', className: 'w-[38px] px-0' },
      { size: 'md', shape: 'icon', className: 'w-12 px-0' },
      { size: 'lg', shape: 'icon', className: 'w-14 px-0' },
    ],
    defaultVariants: { size: 'md', variant: 'solid', block: false, shape: 'label' },
  },
)

/** The button look as a class string, exported because Segmented, Tabs,
 *  ToggleGroup, and BottomNav's menu compose literal buttons — sharing the
 *  builder means a toggle can never drift from the button it imitates. */
export function buttonClasses(opts = {}) {
  const { tone = 'purple', size, variant, block, shape } = opts
  return cx(button({ size, variant, block, shape }), toneClass(tone))
}

function LoadingSpinner() {
  return (
    <span
      className="size-[15px] rounded-[50%] border-[3px] border-solid border-[color-mix(in_srgb,currentColor_24%,transparent)] border-t-current [animation:pouf-spin_620ms_linear_infinite]"
      aria-hidden="true"
    />
  )
}

export const Button = forwardRef(function Button(
  {
    children,
    onClick,
    tone = 'purple',
    size = 'md',
    variant = 'solid',
    block,
    disabled,
    loading,
    type = 'button',
    label,
    ...nativeProps
  },
  ref,
) {
  return (
    <button
      ref={ref}
      {...nativeProps}
      type={type}
      className={buttonClasses({ tone, size, variant, block })}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={label}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  )
})

/** A square, labelled icon action. The required `label` prevents the common
 * accessible-name omission, while the shape stays aligned with Button sizes. */
export const IconButton = forwardRef(function IconButton(
  {
    icon,
    label,
    onClick,
    tone = 'purple',
    size = 'md',
    variant = 'quiet',
    disabled,
    loading,
    type = 'button',
    ...nativeProps
  },
  ref,
) {
  return (
    <button
      ref={ref}
      {...nativeProps}
      type={type}
      className={buttonClasses({ tone, size, variant, shape: 'icon' })}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={label}
      title={nativeProps.title ?? label}
    >
      {loading ? <LoadingSpinner /> : <span aria-hidden="true">{icon}</span>}
    </button>
  )
})
