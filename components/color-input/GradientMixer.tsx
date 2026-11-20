import { ColorInput, Swatch } from "march/ui"

// iki renk seç: ortadaki daire ikisinden bir gradyan çizer, altında kopyalanacak CSS satırı
export function GradientMixer() {
  let $from = "#f2801f"
  let $to = "#a3338c"
  const $css = `linear-gradient(135deg, ${$from}, ${$to})`
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center", "wrap"], gap: 3 }}>
      <ColorInput bind:value={$from} swatchLabel="Başlangıç rengi" aria-label="Başlangıç kodu" />
      <Swatch color={$css} shape="circle" size="lg" label="Gradyan" />
      <ColorInput bind:value={$to} swatchLabel="Bitiş rengi" aria-label="Bitiş kodu" />
    </div>
    <code sx={{ text: ["sm", "mono"], color: "muted" }}>background: {$css};</code>
  </div>
}
