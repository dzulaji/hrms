import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { Icon } from './Icon'
import { Text } from './text'
import { Empty } from './feedback'

/** Same `*bold*` handling as Toast — see the note there on why the markers survive. */
function emphasise(text) {
  return text
    .split(/\*([^*]+)\*/g)
    .map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>))
}

export function AlertBell({
  alerts,
  unread,
  connected,
  onOpen
}) {
  const [open, setOpen] = useState(false)
  const root = useRef(null)

  // Close on outside click and on Escape. A panel pinned open over the dashboard is
  // worse than one that is slightly too eager to close.
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggle = () => {
    const next = !open
    setOpen(next)
    if (next) onOpen() // opening IS reading — that's what clears the badge
  }

  return (
    <div className="pouf-bell" ref={root}>
      <button
        type="button"
        className="pouf-bell__button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
      >
        <Icon name="alerts" size="sm" />
        <span className="pouf-bell__label">Alerts</span>
        {/* The count is aria-hidden because the button's own label already states it —
            otherwise a screen reader reads the number twice. */}
        {unread > 0 && (
          <span className="pouf-bell__badge" aria-hidden="true">
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="pouf-bell__panel">
          {/* An empty panel is ambiguous: "nothing happened" and "we lost the stream and
              can't tell you" look identical. Say which one it is. */}
          {!connected && (
            <div className="pouf-bell__offline" role="status">
              <Text size="sm">Alert stream disconnected — reconnecting. You may be missing alerts.</Text>
            </div>
          )}

          {alerts.length === 0 ? (
            <Empty icon="alerts" title="No alerts yet">
              Updates and alerts appear here as things happen.
            </Empty>
          ) : (
            <ul className="pouf-bell__list">
              {alerts.map((a) => (
                <li key={a.id} className={clsx('pouf-bell__item', a.severity === 'critical' && 'tone-down')}>
                  <Icon name={a.severity === 'critical' ? 'warn' : 'ok'} size="sm" />
                  <div className="pouf-bell__itembody">
                    <Text size="sm">{emphasise(a.text)}</Text>
                    <Text size="sm" muted num>
                      {new Date(a.at).toLocaleTimeString()}
                    </Text>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
