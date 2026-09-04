import clsx from 'clsx'
import { toneClass } from './tone';
import { renderIcon } from './Icon';

const Anchor = (props) => <a {...props} />

/** True when `href` is the active route. Exact for '/', prefix elsewhere so
 *  nested paths keep their tab lit. */
export function isActivePath(href, currentPath) {
  return href === '/'
    ? currentPath === '/'
    : currentPath === href || currentPath.startsWith(`${href}/`)
}

export function NavLink({
  href,
  currentPath,
  children,
  icon,
  tone = 'purple',
  link: Link = Anchor
}) {
  const active = isActivePath(href, currentPath)
  return (
    <Link
      href={href}
      className={clsx('pouf-navlink', active && 'pouf-navlink--active', active && toneClass(tone))}
      aria-current={active ? 'page' : undefined}
    >
      {renderIcon(icon, 'md')}
      {children}
    </Link>
  )
}
