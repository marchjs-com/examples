// HorizontalScrollLab: the full-featured HorizontalScroll example; it uses every prop at least once.
//
// Props shown here: panel (width), label, progress, pinned, class and children (the panels). The controls above the strip
// change them live so you can try each one.
// Use it as a reference when you need one option: find the prop below and copy the line.
// HorizontalScrollLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { HorizontalScroll } from "march/landing"
import { Segmented, Toggle, Card, Button } from "march/ui"

// Three panel widths for the Segmented control (the value is a CSS length).
const WIDTHS = [{ value: "14rem", label: "dar" }, { value: "22rem", label: "orta" }, { value: "34rem", label: "geniş" }]

// One panel: a Card, dark on every other panel (m:theme="night"), with a number and a name.
const Panel = (p: { n: number }) => <Card m:theme={p.n % 2 ? "night" : undefined}>
  <div sx={{ flex: "col", gap: 1 }} style={{ "min-height": "8rem" }}>
    <strong sx={{ text: "2xl" }}>{String(p.n).padStart(2, "0")}</strong>
    <span sx={{ color: "muted" }}>Panel {p.n}</span>
  </div>
</Card>

export function HorizontalScrollLab() {
  // State driven by the controls: panel width, pinned, progress line and the number of panels.
  let $panel = "22rem"
  let $pinned = true
  let $progress = true
  let $count = 5
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls: a width switcher, two Toggles and a button that adds a panel. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Panel genişliği" options={WIDTHS} bind:value={$panel} />
        <Toggle label="Sabitle" bind:value={$pinned} />
        <Toggle label="İlerleme çizgisi" bind:value={$progress} />
        <Button size="sm" variant="secondary" on:click={() => $count = $count + 1}>Panel ekle</Button>
      </div>
    </Card>
    {() => {
      // The state is read here, in a function block: when one value changes, the block runs again and the strip is drawn again.
      const panel = $panel, pinned = $pinned, progress = $progress, n = $count
      // - class: a hook on the section for tests and CSS. label: names the region; here it also shows the panel count.
      // - panel: the width of every child. pinned: true pins the section and moves it sideways with the page scroll; false is
      //   always a native sideways scroller. progress: the progress line under the panels.
      // - Children: the panels.
      return <HorizontalScroll class="lab-hs" label={`${n} panelli şerit`} panel={panel} pinned={pinned} progress={progress}>
        {Array.from({ length: n }, (_, i) => <Panel n={i + 1} />)}
      </HorizontalScroll>
    }}
  </div>
}
