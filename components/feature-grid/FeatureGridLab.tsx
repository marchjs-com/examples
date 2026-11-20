import { FeatureGrid } from "march/landing"
import { Card, Segmented, Toggle } from "march/ui"
import { mapPin, users, message, ticket, video, heart } from "march/icons"

// FeatureGrid'in bütün özellikleri bir arada: öğeler (icon, title, body, href, tone, span, media), görünüm (variant),
// sütun (cols), imleç ışığı (spotlight), giriş hareketi (reveal) ve sınıf (class)
const VARIANTS = ["cards", "plain", "list", "bento"] as const

const Mini = (p: { n: string; label: string }) => <div sx={{ flex: "col", gap: 1, p: 3 }}>
  <strong sx={{ text: "xl", color: "brand-orange" }}>{p.n}</strong><span sx={{ color: "muted" }}>{p.label}</span>
</div>

export function FeatureGridLab() {
  let $variant: (typeof VARIANTS)[number] = "cards"
  let $cols = 3
  let $spotlight = true
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görünüm" options={VARIANTS.map((v) => ({ value: v, label: v }))} bind:value={$variant} />
        <Segmented aria-label="Sütun" options={[2, 3, 4].map((n) => ({ value: n, label: String(n) }))} bind:value={$cols} />
        <Toggle label="İmleç ışığı" bind:value={$spotlight} />
      </div>
    </Card>
    {() => {
      // bu satırda okunan durumlar değişince ızgara yeniden çizilir
      const variant = $variant, cols = $cols, spotlight = $spotlight
      return <FeatureGrid variant={variant} cols={cols as 3} spotlight={spotlight} reveal="none" class="lab-fg" items={[
      { icon: mapPin, title: "Yakınındaki etkinlikler", body: "Haritada ve takvimde.", span: "big", tone: "primary", media: <Mini n="1.200+" label="etkinlik her hafta" /> as Node },
      { icon: users, title: "Tanışma yemekleri", body: "Ortak ilgi alanı olanlarla.", tone: "violet" },
      { icon: message, title: "Sohbet", body: "Buluşmadan önce ve sonra.", tone: "info" },
      { icon: ticket, title: "Bilet sat", body: "Kontenjanı sen belirle.", span: "wide", tone: "success", href: "#bilet" },
      { icon: video, title: "Görüntülü görüşme", body: "Etkinlik öncesi tanış.", span: "tall", tone: "pink" },
      { icon: heart, title: "Akış", body: "Anıları paylaş.", tone: "teal" },
    ]} />
    }}
  </div>
}
