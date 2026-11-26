// ChoiceVariantsLab: the full-featured example of the looks of the choice controls.
//
// What it shows: every look of CheckboxGroup (classic, soft, chip, card, toggle), RadioGroup including its segmented
// look, size, shape, colors="brand", the common prop m:color, inline, a disabled option, and one single Checkbox in
// the indeterminate and disabled states. All looks share the same value, so you can compare them side by side.
// Use it as a reference when you pick a look: find it below, copy the line.
// ChoiceVariantsLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { CheckboxGroup, RadioGroup, Checkbox, Card, Segmented } from "march/ui"

// Option objects: `value` is stored, `label` is shown; `disabled: true` locks one option (Wednesday here).
const DAYS = [{ value: "mon", label: "Pzt" }, { value: "tue", label: "Sal" }, { value: "wed", label: "Çar", disabled: true }, { value: "thu", label: "Per" }]
const VARIANTS = ["classic", "soft", "chip", "card", "toggle"] as const

// A layout helper: a small caption above one example. Only the Lab uses it.
const Case = (props: { name: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.name}</span>
  {props.children}
</div>

export function ChoiceVariantsLab() {
  // $size drives every group below, $days is shared by all checkbox looks, $one is the radio value and $partial the
  // single checkbox value.
  let $size = "md"
  let $days = ["mon"]
  let $one = "tue"
  let $partial = true
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* A Segmented control switches the size of all groups at once (sm / md / lg). */}
    <Segmented class="lab-size" bind:value={$size} aria-label="Boyut" options={["sm", "md", "lg"]} />
    {/* One CheckboxGroup per variant, all bound to $days: select in one and the others follow. inline lays the options
        in a row; aria-label gives each group its own accessible name; class lets the tests find a given look. */}
    {VARIANTS.map((v) => <Case name={v}>
      <CheckboxGroup class={`lab-${v}`} bind:value={$days} options={DAYS} variant={v} size={$size as "md"} inline aria-label={`Günler ${v}`} />
    </Case>)}
    {/* RadioGroup keeps one value. variant="segmented" draws it as joined buttons, shape="square" gives square
        corners and m:color (a common prop) sets the colour token. */}
    <Case name="radio: segmented, kare köşe, mor">
      <RadioGroup class="lab-radio" bind:value={$one} options={DAYS} variant="segmented" shape="square" m:color="brand-purple" size={$size as "md"} inline aria-label="Tek gün" />
    </Case>
    {/* colors="brand" gives each option the next brand colour; shape="circle" makes the chips round. */}
    <Case name="HADİ renkleri, yuvarlak">
      <CheckboxGroup bind:value={$days} options={DAYS} variant="chip" colors="brand" shape="circle" inline aria-label="Günler renkli" />
    </Case>
    {/* A single Checkbox: indeterminate draws the dash ("some children selected"), disabled locks it. m:theme="night"
        draws this card in the dark theme whatever the page theme is. */}
    <Card m:theme="night">
      <Case name="tek kutu: kısmi ve kapalı">
        <Checkbox class="lab-partial" bind:value={$partial} indeterminate label="Bazı alt öğeler seçili" />
        <Checkbox value={false} disabled label="Devre dışı" />
      </Case>
    </Card>
    <span class="lab-state" sx={{ text: "sm", color: "muted" }}>Günler: {$days.join(", ") || "yok"} · tek: {$one}</span>
  </div>
}
