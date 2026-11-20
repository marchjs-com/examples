import { ScrollProgress } from "march/landing"
import { Segmented, Toggle, Card } from "march/ui"

// ScrollProgress'in bütün özellikleri bir arada: ölçülen öğe (target), yer (fixed / inline), boya (gradient / accent),
// kalınlık, renk, erişilebilir ad ve sınıf
const PAINTS = [{ value: "gradient", label: "gradyan" }, { value: "accent", label: "vurgu" }]
const COLORS = [{ value: "none", label: "boyaya göre" }, { value: "brand-orange", label: "turuncu" }, { value: "success", label: "yeşil" }]

export function ScrollProgressLab() {
  let $paint = "gradient"
  let $color = "none"
  let $fixed = false
  let $thick = false
  let $own = false
  let box: Element | null = null
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Boya" options={PAINTS} bind:value={$paint} />
        <Segmented aria-label="Renk" options={COLORS} bind:value={$color} />
        <Toggle label="Sayfanın üstüne sabitle" bind:value={$fixed} />
        <Toggle label="Kalın" bind:value={$thick} />
        <Toggle label="Yalnız bu kutuyu ölç" bind:value={$own} />
      </div>
    </Card>
    <Card>
      <div ref={(el: Element) => { box = el }} sx={{ flex: "col", gap: 2 }}>
        {() => {
          // sinyaller burada okunur: değişince çubuk yeniden çizilir
          const fixed = $fixed, paint = $paint, thick = $thick, color = $color, own = $own
          return <ScrollProgress class="lab-progress" position={fixed ? "fixed" : "inline"} paint={paint as "gradient"}
            size={thick ? 10 : 4} color={color === "none" ? undefined : color as "success"}
            target={own ? () => box : undefined} label={own ? "Kutunun okunan kısmı" : "Sayfanın okunan kısmı"} />
        }}
        <p>Çubuk, sayfa (ya da bu kutu) kaydıkça dolar.</p>
        <p sx={{ color: "muted" }}>Yardımcı teknolojiler yüzdeyi değer olarak okur.</p>
      </div>
    </Card>
  </div>
}
