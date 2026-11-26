// GiftBox: the creative-minimal Chevron example.
//
// What it shows: a surprise box. The button only carries aria-expanded; the Chevron inside it follows that state by
// itself (no `open` prop) and turns with a spring, in pink.
// When to use this pattern: any toggle button that should show an arrow: write the state once on the button and let the
// Chevron read it. motion="spring" gives a small overshoot; the default "smooth" is calmer and motion={false} jumps.
// Reduced motion turns the turn off whatever you pass. The arrow is decoration (aria-hidden); the button is what a
// screen reader announces.
import { Button, Chevron } from "march/ui"
import { gift } from "march/icons"

export function GiftBox() {
  let $open = false
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* icon={gift} puts a gift icon in the button. m:color tints the arrow only (a common prop: the colour token of
        the component). size="md" is one step larger than the default. */}
    <Button variant="ghost" icon={gift} aria-expanded={$open ? "true" : "false"} on:click={() => $open = !$open}>
      {$open ? "Kutuyu kapat" : "Sürprizi aç"} <Chevron direction="down" motion="spring" size="md" m:color="brand-pink" />
    </Button>
    {$open ? <p sx={{ text: "lg" }}>🎉 Ok tek satır bağlama kodu istemedi: düğmenin durumunu kendisi okudu.</p> : null}
  </div>
}
