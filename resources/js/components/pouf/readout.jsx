import { Card } from './surface'
import { Blob } from './media'
import { Text } from './text'

/** A headline figure on its own cushion.
 *
 * This existed twice, verbatim — `StatTile` in one screen and `Stat` in
 * another — and the copies had already drifted apart: one took the full Tone,
 * the other narrowed it to four. Divergent copies of one idea is the thing a
 * design system exists to stop, so it lives here now. It takes the full Tone;
 * the narrowed signature was the drift, not the intent.
 *
 * The tile leads with its own icon and tone because the block it replaced put
 * four unadorned numbers on one card, where "0", "0 / 0" and "+$0.00" all
 * carried identical weight and nothing said which one you actually came for.
 */
export function Stat({
  label,
  value,
  icon,
  tone
}) {
  return (
    <Card variant="tight">
      <div className="pouf-stat flex items-center gap-(--s3)">
        <Blob tone={tone} size="sm" icon={icon} />
        <div className="pouf-stat__text flex flex-col gap-[2px] min-w-0">
          <span className="pouf-stat__label text-[12px] font-extrabold tracking-[1.4px] uppercase text-muted whitespace-nowrap">
            {label}
          </span>
          {/* dir="auto" for the same reason Text sets it: a value can be a
              non-Latin string (a person's name in a "top contributor" tile). */}
          <span
            className='pouf-stat__value text-[26px] font-black leading-[1.05] tracking-[-0.5px] text-ink [font-variant-numeric:tabular-nums] [font-feature-settings:"tnum"]'
            dir="auto"
          >
            {value}
          </span>
        </div>
      </div>
    </Card>
  )
}

/** A labelled readout: small muted label, value beneath.
 *
 * A readout is atomic: "−$24.75" must never break after the minus, and a
 * two-line label reads as two metrics — hence nowrap; the ROW wraps whole
 * metrics instead. Inside a Row ([.pouf-row>&]) metrics divide the spare
 * width evenly (a KPI strip) but never below one-line content. */
export function Metric({
  label,
  value,
  num = true,
  mono
}) {
  return (
    <div className="pouf-metric flex flex-col gap-(--s1) min-w-0 whitespace-nowrap [.pouf-row>&]:flex-[1_1_0] [.pouf-row>&]:min-w-max">
      <Text size="sm" muted>
        {label}
      </Text>
      <Text num={num} mono={mono}>
        {value ?? '—'}
      </Text>
    </div>
  )
}
