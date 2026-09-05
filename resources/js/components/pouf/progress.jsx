import * as RProgress from '@radix-ui/react-progress'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { toneClass } from './tone';

export function Progress({
  value,
  max = 100,
  tone = 'purple',
  label
}) {
  const reduceMotion = useReducedMotion()
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <RProgress.Root className="pouf-progress" value={value} max={max} aria-label={label}>
      <RProgress.Indicator render={<motion.div className={clsx('pouf-progress__fill', toneClass(tone))} initial={false} animate={{ scaleX: pct / 100 }} transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 200, damping: 24 }
                    } />}></RProgress.Indicator>
    </RProgress.Root>
  )
}
