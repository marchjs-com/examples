// ColorPickerLab: the full-featured ColorPicker example; it uses every prop at least once.
//
// Props shown here: value (bind:value) and onChange, alpha (transparency), format, palettes (your own), recent, eyedropper
// and eyedropperIcon, contrast, preview (old / new), formats (the format switcher), input (the value field), labels (your
// own texts), class, readonly / disabled, name and aria-label.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ColorPickerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ColorPicker, Toggle } from "march/ui"
import { droplet } from "march/icons"

// Every built-in text of the picker, replaced: pass only the keys you want to change (the rest keep their defaults).
const LABELS = { picker: "Renk laboratuvarı", hue: "Ton", opacity: "Saydamlık", value: "Renk değeri", format: "Biçim", contrast: "Okunurluk", onWhite: "beyazda", onBlack: "siyahta", recent: "Az önce" }

export function ColorPickerLab() {
  // $color is the live value, $changes counts onChange calls; the two toggles switch readonly and disabled on and off.
  let $color = "#a3338c"
  let $changes = 0
  let $locked = false
  let $off = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Toggle label="Kilitle (salt okunur)" bind:value={$locked} />
      <Toggle label="Devre dışı" bind:value={$off} />
      <span sx={{ text: "sm" }}>Değer: <code>{$color}</code> · değişiklik: {$changes}</span>
    </div>
    {/* The prop list, one by one:
        - bind:value / onChange: the colour (written in `format`) and a callback on every change.
        - alpha: show the transparency slider (the value then carries an alpha part).
        - format="hsl": the value is written as hsl(...); `formats` shows the HEX / RGB / HSL switcher so the user can
          change it.
        - palettes: your own list of { label, colors }; colours are CSS colours or theme tokens ("primary"...), which are
          read from the active theme when picked. recent={3} keeps the last three picks.
        - eyedropper (+ eyedropperIcon): the screen colour picker, shown only where the browser has EyeDropper.
        - contrast: the contrast grade on white and black; preview: the old / new comparison; input: the value field.
        - labels: your own texts (see LABELS above); class: added to the root so CSS or a test can find it.
        - readonly / disabled: the picker shows the colour but does not change it / is out of the tab order.
        - name: the form field name; aria-label: the accessible name of the picker. */}
    <ColorPicker
      bind:value={$color}
      onChange={() => $changes++}
      alpha
      format="hsl"
      palettes={[{ label: "Gün batımı", colors: ["#ff7e5f", "#feb47b", "#6a3093"] }, { label: "Tema", colors: ["primary", "success", "danger"] }]}
      recent={3}
      eyedropper
      eyedropperIcon={droplet}
      contrast
      preview
      formats
      input
      labels={LABELS}
      class="lab-cp"
      readonly={$locked}
      disabled={$off}
      name="accent"
      aria-label="Vurgu rengi"
    />
  </div>
}
