import clsx from 'clsx'
import { Blob } from './media'
import { Icon } from './Icon'
import { Stack } from './layout'
import { Text } from './text'

export function Empty({
  icon = 'idle',
  title,
  children
}) {
  return (
    <div className="pouf-empty">
      <Blob tone="purple" size="md" icon={icon} />
      <Text>{title}</Text>
      {children && (
        <Text size="sm" muted>
          {children}
        </Text>
      )}
    </div>
  )
}

export function Skeleton({
  variant = 'row',
  count = 1
}) {
  return (
    <Stack gap={3}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={clsx('pouf-skeleton', `pouf-skeleton--${variant}`)} aria-hidden="true" />
      ))}
    </Stack>
  )
}

/** Failure is a first-class state here: an app that talks to a network must say
 * when a request died, rather than render an empty list that reads as
 * "you have nothing".
 *
 * A puffy clay cushion with a raised warning blob — the same physical language
 * as a toast, not the flat orange slab it used to be. */
export function ErrorNote({
  children
}) {
  return (
    <div className="pouf-error-note" role="alert">
      <span className="pouf-error-note__icon">
        <Icon name="warn" size="sm" />
      </span>
      <span className="pouf-error-note__text">{children}</span>
    </div>
  )
}
