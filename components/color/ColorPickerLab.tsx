import { ColorPicker, Toggle } from "march/ui"
import { droplet } from "march/icons"

// ColorPicker'ın bütün özellikleri: değer (bind:value) ve onChange, saydamlık, biçim, kendi paletin, son seçilenler,
// göz damlası ve kendi ikonu, kontrast, eski / yeni önizleme, biçim seçici, değer alanı, kendi metinlerin, sınıf,
// salt okunur / devre dışı, ad (name) ve erişilebilir ad
const LABELS = { picker: "Renk laboratuvarı", hue: "Ton", opacity: "Saydamlık", value: "Renk değeri", format: "Biçim", contrast: "Okunurluk", onWhite: "beyazda", onBlack: "siyahta", recent: "Az önce" }

export function ColorPickerLab() {
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
