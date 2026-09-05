import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Icon } from './Icon';

/* -- module-level state --------------------------------------------------- */

let count = 0
let toasts = []
let listeners = []

function emit() {
  for (const fn of listeners) fn()
}

function add(entry) {
  toasts = [...toasts, entry]
  emit()
}

function remove(id) {
  toasts = toasts.filter((t) => t.id !== id)
  emit()
}

/* -- public API ----------------------------------------------------------- */

/* Roles, not moods. `up` means direction of a value (a "saved OK" toast must not
 * claim a number went up), and error/warning sharing the triangle made "upload
 * failed" and "approaching your quota" the same visual claim. */
const ICON = {
  default: 'ok',
  success: 'ok',
  error: 'fail',
  warning: 'warn',
  info: 'info',
}

const DEFAULT_DURATION = 5_000

function createToast(variant) {
  return (title, opts) => {
    const id = `toast-${++count}`
    const entry = {
      id,
      title,
      description: opts?.description,
      variant,
      duration: opts?.duration ?? DEFAULT_DURATION,
      action: opts?.action,
    }
    add(entry)
    return id
  };
}

export const toast = Object.assign(createToast('default'), {
  success: createToast('success'),
  error: createToast('error'),
  warning: createToast('warning'),
  info: createToast('info'),
})

export function dismissToast(id) {
  remove(id)
}

/* -- Toast item component ------------------------------------------------- */

/** Comes in from the side, tiny, and fades up to full size — a gentle spring,
 * not a bounce (the bouncy version fought the layout reflow and stuttered).
 * Tuned live in docs/toast-anim-playground.html. Under prefers-reduced-motion it
 * collapses to a plain opacity fade — WCAG 2.3.3. (docs/pouf-components-research.md) */
function toastMotion(reduce) {
  if (reduce) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.12 },
    }
  }
  return {
    initial: { opacity: 0, x: 140, scale: 0.7 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 100, scale: 0.8, transition: { duration: 0.14, ease: "easeIn" } },
    transition: { type: "spring", stiffness: 280, damping: 26, mass: 1 },
  };
}

function ToastItem({
  t,
  onDismiss
}) {
  const sticky = t.duration === Infinity
  const reduce = useReducedMotion() ?? false

  useEffect(() => {
    if (sticky) return
    const timer = setTimeout(() => onDismiss(t.id), t.duration)
    return () => clearTimeout(timer)
  }, [sticky, t.duration, t.id, onDismiss])

  return (
    <motion.div
      className={`pouf-toast pouf-toast--${t.variant}`}
      role={t.variant === 'error' ? 'alert' : 'status'}
      aria-live={t.variant === 'error' ? 'assertive' : 'polite'}
      layout="position"
      {...toastMotion(reduce)}
    >
      <div className="pouf-toast__icon">
        <Icon name={ICON[t.variant]} size="sm" />
      </div>
      <div className="pouf-toast__body">
        <div className="pouf-toast__title">{t.title}</div>
        {t.description && <div className="pouf-toast__desc">{t.description}</div>}
        {t.action && (
          <button type="button" className="pouf-toast__action" onClick={t.action.onClick}>
            {t.action.label}
          </button>
        )}
      </div>
      <button type="button" className="pouf-toast__close" onClick={() => onDismiss(t.id)} aria-label="Dismiss notification">
        <Icon name="close" size="sm" />
      </button>
    </motion.div>
  )
}

/* -- Toaster component ---------------------------------------------------- */

/** Renders bare items, no positioned wrapper: the shell owns ONE .pouf-toasts
 * stack and mounts this beside ToastViewport inside it. When each system
 * carried its own fixed stack they sat at identical coordinates, and a critical
 * alert could render underneath a routine "saved" toast. */
export function Toaster() {
  const [items, setItems] = useState(toasts)

  useEffect(() => {
    // Remove OUR listener on unmount. The old cleanup dropped whichever
    // subscriber happened to be last in the array — with two Toasters ever
    // mounted (e.g. StrictMode double-mount), one went permanently deaf.
    const listener = () => setItems([...toasts])
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  const dismiss = useCallback((id) => remove(id), [])

  return (
    // popLayout so a dismissed toast is pulled out of flow immediately and the
    // survivors spring up to close the gap, rather than the stack jumping.
    <AnimatePresence mode="popLayout">
      {items.map((t) => (
        <ToastItem key={t.id} t={t} onDismiss={dismiss} />
      ))}
    </AnimatePresence>
  )
}
