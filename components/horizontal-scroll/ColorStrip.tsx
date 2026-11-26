// ColorStrip: the creative-minimal HorizontalScroll example.
//
// What it shows: a strip of colour panels. Each press of the button adds a panel, and the strip grows sideways. It is not
// pinned: it is a plain native sideways scroller with snap points.
// When to use this pattern: a row of cards inside a normal page flow. `pinned={false}` never pins the section, so the page
// does not scroll sideways for you; the visitor swipes or scrolls the strip itself.
// Accessibility: content stays in reading order, and Tab reaches every panel (the strip scrolls to it).
import { HorizontalScroll } from "march/landing"
import { Button } from "march/ui"
import { plus } from "march/icons"

// The colours the panels use in turn.
const COLORS = ["#ff7a59", "#ffb347", "#7c5cff", "#2bb8ff", "#3ecf8e", "#ff5fa2"]

// One panel: a coloured box with its number (two digits) and its colour code. Panels are plain children of the strip.
const Swatch = (p: { color: string; n: number }) =>
  <div style={{ background: p.color, color: "#fff", "min-height": "9rem", "border-radius": "1rem", padding: "1rem" }}>
    <strong sx={{ text: "xl" }}>{String(p.n).padStart(2, "0")}</strong>
    <p>{p.color}</p>
  </div>

export function ColorStrip() {
  // How many panels exist.
  let $count = 3
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Adds a panel; the label shows the current count. */}
    <Button icon={plus} on:click={() => $count = $count + 1}>Renk ekle ({$count})</Button>
    {/* The strip is built inside a `{() => ...}` block that runs again when $count changes, so it is drawn again with the new panels.
        - pinned={false}: never pin; always the native sideways scroller with snap points.
        - panel="10rem": the width of every child. label: names the region for screen readers. */}
    {() => {
      const n = $count
      return <HorizontalScroll pinned={false} panel="10rem" label="Renk şeridi">
        {Array.from({ length: n }, (_, i) => <Swatch color={COLORS[i % COLORS.length]!} n={i + 1} />)}
      </HorizontalScroll>
    }}
  </div>
}
