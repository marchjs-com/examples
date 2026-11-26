// ColorInputLab: the full-featured ColorInput example; it uses every prop at least once.
//
// Props shown here: bind:value and onChange, swatchLabel (the accessible name of the swatch), placeholder, required,
// invalid, onFocus / onBlur; the swatch alone (text={false}) and the text alone (swatch={false}) with id / name / class /
// aria-label / describedby; readonly, disabled and a dark surface.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ColorInputLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ColorInput, Field, Card } from "march/ui"

// A layout helper: a caption above, the examples below in a wrapping row. Only the Lab uses it.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

export function ColorInputLab() {
  let $color = "#f2801f"
  let $changes = 0
  let $focused = false
  // A derived flag: true while the text is a complete lower-case #rrggbb code; it recomputes whenever $color changes.
  const $valid = /^#[0-9a-f]{6}$/.test($color)
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The main example. bind:value keeps $color and the picker in sync both ways (typing a valid hex moves the swatch,
        picking a swatch writes the text); onChange also fires on each change (here it counts). swatchLabel names
        the swatch for screen readers (the text field takes the Field label). placeholder shows while empty.
        required and invalid are set from the value, so an incomplete code is announced as invalid (aria-invalid).
        onFocus / onBlur run when focus enters or leaves the control. */}
    <Section title="Değer (bind:value + onChange)">
      <Field label="Ana renk">
        <ColorInput bind:value={$color} onChange={() => $changes++} swatchLabel="Ana rengi seç" placeholder="#f2801f"
          required invalid={!$valid} onFocus={() => $focused = true} onBlur={() => $focused = false} />
      </Field>
      <span>Seçili: {$color}</span>
      <span>Değişiklik: {$changes}</span>
      <span>{$focused ? "Odakta" : "Odak dışında"}</span>
    </Section>
    {/* Parts: text={false} draws only the swatch (it becomes the labelled control, so swatchLabel is its name);
        swatch={false} draws only the text field, which takes id, name, class, aria-label and describedby (the hint
        text is linked by id so a screen reader reads it). */}
    <Section title="Parçalar">
      <ColorInput bind:value={$color} text={false} swatchLabel="Yalnız kutu" />
      <ColorInput bind:value={$color} swatch={false} id="lab-code" name="accentCode" class="lab-code"
        aria-label="Yalnız metin" describedby="lab-hint" />
      <span id="lab-hint" sx={{ text: "xs", color: "muted" }}>Altı haneli onaltılık renk</span>
    </Section>
    {/* readonly shows the colour but blocks changes; disabled also takes it out of the tab order. */}
    <Section title="Durum">
      <ColorInput value="#78be3a" readonly swatchLabel="Salt okunur renk" aria-label="Salt okunur kod" />
      <ColorInput value="#a3338c" disabled swatchLabel="Kapalı renk" aria-label="Kapalı kod" />
    </Section>
    {/* m:theme="night" draws this card in the dark theme whatever the page theme is. ariaLabel is the camelCase form
        of aria-label. */}
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <ColorInput bind:value={$color} swatchLabel="Gece rengini seç" ariaLabel="Gece rengi kodu" />
      </Section>
    </Card>
  </div>
}
