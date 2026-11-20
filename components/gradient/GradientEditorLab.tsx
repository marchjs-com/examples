import { GradientEditor, Toggle } from "march/ui"

// GradientEditor'ın bütün özellikleri: değer ve onChange, türler, kendi hazırların (CSS ya da renk listesi), CSS çıktısı,
// önizleme, açı kadranı ve hazır açılar, ipucu, konum alanı, kendi metinlerin (işlevler dahil), sınıf, salt okunur,
// devre dışı, ad ve erişilebilir ad
const PRESETS = [
  { label: "Deniz", value: "linear-gradient(90deg, #4cc3e0 0%, #13233a 100%)" },
  { label: "Marka", value: ["brand-orange", "brand-purple"] },
]
const LABELS = {
  editor: "Gradyan tezgâhı", type: "Tür", linear: "Düz", radial: "Halka", conic: "Pasta", angle: "Açı", quickAngles: "Hızlı açılar",
  stops: "Duraklar", hint: "Çubuğa tıkla: yeni durak", position: "Yeri", presets: "Hazırlar", copy: "CSS'i kopyala", copied: "Kopyalandı",
  preview: (css: string) => `Önizleme: ${css}`, degrees: (n: number) => `${n} derece`,
  stop: (n: number, color: string) => `${n}. durak, ${color}`, preset: (name: string) => `Hazır: ${name}`,
}

export function GradientEditorLab() {
  let $css = "linear-gradient(45deg, #f2801f 0%, #a3338c 100%)"
  let $changes = 0
  let $locked = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
      <Toggle label="Kilitle" bind:value={$locked} />
      <span sx={{ text: "sm" }}>değişiklik: {$changes}</span>
    </div>
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
    <code sx={{ text: "xs" }}>{$css}</code>
  </div>
}
