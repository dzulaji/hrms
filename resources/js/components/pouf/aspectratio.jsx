import * as RAspect from '@radix-ui/react-aspect-ratio'

export function AspectRatio({
  ratio = 16 / 9,
  children
}) {
  return (
    <div className="pouf-aspect w-full rounded-control overflow-hidden bg-bg cushion-field">
      <RAspect.Root ratio={ratio}>{children}</RAspect.Root>
    </div>
  )
}
