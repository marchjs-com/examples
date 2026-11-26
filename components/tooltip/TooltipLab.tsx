// TooltipLab: the full-featured Tooltip example; it uses every prop at least once.
//
// Props shown here: text (fixed or live), placement, delay, disabled, motion, color, class and the target (the child).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// TooltipLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Tooltip, Button } from "march/ui"

export function TooltipLab() {
  // `$` variables are signals. $n counts the presses; $off switches the tooltip off.
  let $n = 0
  let $off = false
  return <div sx={{ flex: "row", gap: 2 }}>
    {/* The props of the first Tooltip:
        - text as a function is live: it is read again when $n changes, so the bubble always shows the current count.
        - placement: the preferred side (here the bottom edge, aligned to the end); the popover engine flips it when
          there is no room.
        - delay={0}: shows the hint at once on hover (the default is 300 ms; keyboard focus always shows it at once).
        - motion="none": no entrance motion (the default is "scale"; "fade" is the other choice).
        - color: a theme colour token for the bubble.
        - disabled: true means it never shows; it follows $off here.
        - class: an extra class for the bubble.
        The target is the child, here a Button; while the hint is shown the Button is linked to it with
        aria-describedby, and Esc hides it. */}
    <Tooltip class="lab-tip" text={() => `${$n} kez basıldı`} placement="bottom-end" delay={0} motion="none" color="success" disabled={$off}>
      <Button class="lab-target" on:click={() => $n++}>Bas</Button>
    </Tooltip>
    {/* This button flips $off, so you can see that a disabled Tooltip stays hidden. */}
    <Button on:click={() => $off = !$off}>{$off ? "İpucunu aç" : "İpucunu kapat"}</Button>
  </div>
}
