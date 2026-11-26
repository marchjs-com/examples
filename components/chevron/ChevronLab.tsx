// ChevronLab: the full-featured Chevron example; it uses every prop at least once.
//
// Props shown here: open (from outside), direction (four directions), size (four sizes), motion (smooth, spring, false
// = jump), icon (your own icon or a text), leaf (keeps the box, draws nothing), class, m:color, other attributes
// (data-*), and what happens when `open` is left out: the arrow follows the nearest aria-expanded.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ChevronLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Chevron, Button, Card } from "march/ui"
import { arrowRight } from "march/icons"

const directions = ["end", "start", "down", "up"] as const
const sizes = ["xs", "sm", "md", "lg"] as const

// A layout helper: a caption above, the arrows below. Only the Lab uses it.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

export function ChevronLab() {
  // $open drives every arrow below that is given `open`; $leaf turns one arrow into a leaf.
  let $open = false
  let $leaf = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: "row", gap: 2 }}>
      <Button variant="secondary" on:click={() => $open = !$open}>{$open ? "Hepsini kapat" : "Hepsini aç"}</Button>
      <Button variant="ghost" on:click={() => $leaf = !$leaf}>{$leaf ? "Oku geri getir" : "Yaprak yap"}</Button>
    </div>
    {/* direction: where the arrow points while closed. end (the default) and start turn down when open, down turns
        up, up turns down. Right-to-left pages mirror "end" and "start" automatically. */}
    <Row title="Yön (direction): kapalıyken baktığı yer">
      {directions.map((d) => <Chevron open={$open} direction={d} size="md" class={`lab-dir-${d}`} />)}
    </Row>
    {/* size: xs, sm (the default), md, lg. */}
    <Row title="Boyut (size)">{sizes.map((s) => <Chevron open={$open} size={s} />)}</Row>
    {/* motion: how the arrow turns. "smooth" is the default, "spring" overshoots a little, false makes it jump.
        With motion on, reduced motion already turns the turn off, so use false only where a turn is never wanted. */}
    <Row title="Dönüş (motion)">
      <Chevron open={$open} size="lg" motion="smooth" />
      <Chevron open={$open} size="lg" motion="spring" />
      <Chevron open={$open} size="lg" motion={false} class="lab-still" />
    </Row>
    {/* icon: your own mark (an icon, a text or a node), drawn pointing to the inline end like the default arrow.
        m:color is a common prop that sets the colour token of the arrow. class lets a test or your CSS find it. */}
    <Row title="Kendi ikonun (icon) ve renk (m:color)">
      <Chevron open={$open} size="lg" icon={arrowRight} m:color="primary" class="lab-own" />
      <Chevron open={$open} size="lg" icon="›" m:color="brand-orange" class="lab-text" />
    </Row>
    {/* leaf: a tree row without children keeps the arrow's space (so labels line up) but draws no arrow.
        data-* attributes and id go to the arrow element. */}
    <Row title="Yaprak (leaf) ve öznitelik (data-*)">
      <span sx={{ flex: ["row", "center"], gap: 1 }}><Chevron open={$open} leaf={$leaf} data-node="kok" class="lab-leaf" /> Kök klasör</span>
    </Row>
    {/* No `open` here: the arrow follows the nearest ancestor that has aria-expanded (this button). That is the
        accessible way: the button carries the state for screen readers, the arrow is only decoration (aria-hidden).
        m:theme="night" draws this card in the dark theme whatever the page theme is. */}
    <Card m:theme="night">
      <Row title="open yok: düğmenin aria-expanded'ını izler">
        <Button variant="ghost" aria-expanded={$open ? "true" : "false"} on:click={() => $open = !$open}>
          Ayrıntılar <Chevron direction="down" class="lab-auto" />
        </Button>
      </Row>
    </Card>
  </div>
}
