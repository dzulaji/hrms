import * as RHover from '@radix-ui/react-hover-card'
import { motion, useReducedMotion } from 'framer-motion'

export function HoverCard({
  children,
  content,
  side = 'bottom',
  align = 'center'
}) {
  const reduceMotion = useReducedMotion()
  return (
    <RHover.Root openDelay={300} closeDelay={200}>
      <RHover.Trigger render={<span className="pouf-hover__anchor" />}>{children}</RHover.Trigger>
      <RHover.Portal>
        <RHover.Content className="pouf-hover" sideOffset={8} side={side} align={align} render={<motion.div initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 4 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.15, ease: 'easeOut' }} />}>{content}</RHover.Content>
      </RHover.Portal>
    </RHover.Root>
  )
}
