// RevealLab: the full-featured Reveal example; it uses every prop at least once.
//
// Props shown here: effect (a ready-made one, your own start and end frames, or "none"), easing, stagger, delay,
// duration, distance, scrub (tie the effect to scrolling), self, select, as, class, extra attributes (aria-label) and the
// content (children).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// RevealLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Reveal } from "march/landing"
import { Segmented, Toggle, Card, Button } from "march/ui"

type RevealEffect = "fade" | "up" | "down" | "start" | "end" | "scale" | "blur" | "flip"
// The choices of the effect control: "own" is the custom effect below, "none" turns the entrance off.
const EFFECTS = [
  { value: "up", label: "yukarı" }, { value: "start", label: "baştan" }, { value: "flip", label: "çevirme" },
  { value: "own", label: "dönerek" }, { value: "none", label: "yok" },
]
// Your own effect: a start frame (`from`) and an end frame (`to`) as CSS properties; the motion engine animates between
// them.
const SPIN = { from: { opacity: 0, transform: "rotate(-12deg) scale(.7)" }, to: { opacity: 1, transform: "rotate(0deg) scale(1)" } }

// One card; the class lab-card is what the `select` prop below picks out.
const Tile = (p: { n: number }) => <Card class="lab-card">
  <div sx={{ flex: "col", gap: 1 }}><strong>Kart {p.n}</strong><span sx={{ color: "muted" }}>sırayla girer</span></div>
</Card>

export function RevealLab() {
  // Signals driven by the controls below.
  let $effect = "up"
  let $scrub = false
  let $self = false
  let $count = 3
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The control panel: Segmented picks the effect (aria-label names the group), the toggles switch scrub and self,
        and the button adds a card. bind:value keeps each signal and its control in sync both ways. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Efekt" options={EFFECTS} bind:value={$effect} />
        <Toggle label="Kaydırmaya bağlı" bind:value={$scrub} />
        <Toggle label="Bütün blok birden" bind:value={$self} />
        <Button size="sm" variant="secondary" on:click={() => $count = $count + 1}>Kart ekle</Button>
      </div>
    </Card>
    {/* A function child is a live region: the Reveal is drawn again when a signal it reads changes, which plays the
        entrance again. The props:
        - as="section", class, aria-label: the tag, an extra class and an accessible name; other attributes pass through.
        - effect: a ready-made word, your own { from, to } frames, or "none" (the content is simply there, nothing
          waits to appear).
        - easing="spring": the easing of the entrance (the default is "expo"). stagger={90}: delay between children.
          delay={60}: wait before the first one. duration={640}: length in milliseconds. distance={40}: how far up,
          down, start and end effects travel, in pixels.
        - scrub: the effect follows the scroll position instead of playing once. self: animate the element itself, not
          its children. select=".lab-card": animate these descendants instead of the direct children (useful when the
          cards sit inside a wrapper element, as here).
        The motion engine plays it, so reduced motion and the global speed apply; with reduced motion the content is
        simply there. The content is in the document from the start, so screen readers can read it. */}
    {() => {
      // The signals are read here, so a change redraws the block and replays the entrance.
      const effect = $effect, scrub = $scrub, self = $self, n = $count
      return <Reveal as="section" class="lab-reveal" aria-label="Açılan kartlar"
        effect={effect === "own" ? SPIN : effect as RevealEffect | "none"} easing="spring" stagger={90} delay={60}
        duration={640} distance={40} scrub={scrub} self={self} select=".lab-card">
        <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
          {Array.from({ length: n }, (_, i) => <Tile n={i + 1} />)}
        </div>
      </Reveal>
    }}
  </div>
}
