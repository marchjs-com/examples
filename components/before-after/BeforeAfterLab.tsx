// BeforeAfterLab: the full-featured BeforeAfter example; it uses every prop at least once.
//
// Props shown here: before and after (the two layers), beforeLabel / afterLabel (corner chips), value with onChange,
// orientation, follow, hint, ratio, label, grip (arrows, the line only, or your own node), step, valueText and class.
// The controls above the comparison change the live ones.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// BeforeAfterLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { BeforeAfter } from "march/landing"
import { Segmented, Toggle, Button, Card } from "march/ui"
import { Icon, sparkles } from "march/icons"

// One layer: a full-size coloured panel with a big text. The layers can be anything (images, video, markup).
const Panel = (p: { text: string; tone: string }) =>
  <div sx={{ flex: ["col", "center"], p: 4 }} style={{ height: "100%", background: p.tone }}><strong sx={{ text: "xl" }}>{p.text}</strong></div>

export function BeforeAfterLab() {
  // The divider position (0-100), the orientation, the "follow the pointer" switch and the grip style. Plain `let $x`
  // variables are reactive state.
  let $pos = 30
  let $orientation: "horizontal" | "vertical" = "horizontal"
  let $follow = false
  let $grip: "oklar" | "çizgi" | "simge" = "oklar"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Yön" options={[{ value: "horizontal", label: "yatay" }, { value: "vertical", label: "dikey" }]} bind:value={$orientation} />
        <Segmented aria-label="Tutamak" options={["oklar", "çizgi", "simge"]} bind:value={$grip} />
        <Toggle label="İmleci izle" bind:value={$follow} />
        <Button variant="secondary" on:click={() => $pos = 50}>Ortala</Button>
      </div>
    </Card>
    {/* The function child builds a fresh BeforeAfter whenever orientation, follow or grip change: the Lab reads them
        into local constants first, so those controls take effect.
        - class="lab-ba": added to the root (.m-ba) so CSS or a test can find it.
        - orientation: "horizontal" (default) or "vertical". follow: the divider tracks the mouse without a press.
        - hint={false}: no first-view sway of the divider (the sway is on by default and is skipped with reduced
          motion). ratio="16 / 9": the CSS aspect ratio of the area, since the layers have no height of their own.
        - grip: true is the round grip with arrows, false draws the line only, and a node is your own content.
        - value (a function, so it stays live) + onChange: the controlled position; dragging, a click and the keys all
          report through onChange. step={5}: the keyboard step in percent.
        - label: the accessible name of the slider handle; valueText: what screen readers read for a position.
        - beforeLabel / afterLabel: corner chips that fade when the divider covers them.
        - before / after: the two layers. Keyboard: the handle is a slider, so arrow keys, Page keys and Home / End
          move it. */}
    {() => { const orientation = $orientation, follow = $follow, grip: string = $grip; return <BeforeAfter class="lab-ba" orientation={orientation} follow={follow} hint={false} ratio="16 / 9"
      grip={grip === "çizgi" ? false : grip === "simge" ? <Icon of={sparkles} /> as Node : true}
      value={() => $pos} onChange={(v: number) => $pos = v} step={5}
      label="Gece ve gündüz" valueText={(v: number) => `%${v} gece`}
      beforeLabel="Gece" afterLabel="Gündüz"
      before={<Panel text="🌙 Gece" tone="#1f2440" />} after={<Panel text="☀️ Gündüz" tone="#ffe08a" />} /> }}
    <p sx={{ color: "muted" }} class="lab-pos">Konum: {$pos}</p>
  </div>
}
