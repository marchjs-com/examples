// GradientEditorLab: the full-featured GradientEditor example; it uses every prop at least once.
//
// Props shown here: value (bind:value) and onChange, types, presets (CSS or a list of colours), output, preview, dial, angles,
// hint, position, labels (including functions), class, readonly, disabled, name and aria-label.
// Use it as a reference when you need one option: find the prop below and copy the line.
// GradientEditorLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { GradientEditor, Toggle } from "march/ui"

// Presets: { label, value }. The first value is a full CSS gradient; the second is a list of colour tokens, which the
// editor spreads evenly over a gradient.
const PRESETS = [
  { label: "Deniz", value: "linear-gradient(90deg, #4cc3e0 0%, #13233a 100%)" },
  { label: "Marka", value: ["brand-orange", "brand-purple"] },
]
// labels replaces the built-in texts (any subset works). Some are plain strings (editor, type names, the copy button) and
// some are functions that build a text from a value: preview(css), degrees(n), stop(n, colour), preset(name).
const LABELS = {
  editor: "Gradyan tezgâhı", type: "Tür", linear: "Düz", radial: "Halka", conic: "Pasta", angle: "Açı", quickAngles: "Hızlı açılar",
  stops: "Duraklar", hint: "Çubuğa tıkla: yeni durak", position: "Yeri", presets: "Hazırlar", copy: "CSS'i kopyala", copied: "Kopyalandı",
  preview: (css: string) => `Önizleme: ${css}`, degrees: (n: number) => `${n} derece`,
  stop: (n: number, color: string) => `${n}. durak, ${color}`, preset: (name: string) => `Hazır: ${name}`,
}

export function GradientEditorLab() {
  // State: the CSS gradient, how many times onChange fired, and the lock switch that drives `readonly`.
  let $css = "linear-gradient(45deg, #f2801f 0%, #a3338c 100%)"
  let $changes = 0
  let $locked = false
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* A switch that locks the editor (readonly) and a counter that shows onChange firing. */}
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Toggle label="Kilitle" bind:value={$locked} />
      <span sx={{ text: "sm" }}>değişiklik: {$changes}</span>
    </div>
    {/* - bind:value: the CSS gradient, two-way. onChange: called after each change (here it only counts).
        - types: which types are offered (here linear and conic, so the radial type is missing).
        - presets: our own list. output: the CSS line with a copy button. preview: the big preview on top.
        - dial: the angle dial. angles: the quick angle buttons (a list of degrees, or false for none).
        - hint: the hint under the stop bar. position: the position field of the selected stop.
        - labels: our texts. class: a hook on the root for tests and CSS.
        - readonly: looks but does not change (driven by the lock switch). disabled: blocks everything.
        - name: the form field name. aria-label: the accessible name of the whole editor. */}
    <GradientEditor
      bind:value={$css}
      onChange={() => $changes++}
      types={["linear", "conic"]}
      presets={PRESETS}
      output
      preview
      dial
      angles={[0, 45, 90, 180]}
      hint
      position
      labels={LABELS}
      class="lab-ge"
      readonly={$locked}
      disabled={false}
      name="background"
      aria-label="Arka plan gradyanı"
    />
    {/* Shows the current value outside the editor, so you can see bind:value stay in sync. */}
    <code sx={{ text: "xs" }}>{$css}</code>
  </div>
}
