import { Testimonials } from "march/landing"
import { Card, Segmented, Toggle } from "march/ui"

// Testimonials'ın bütün özellikleri bir arada: yorumlar (quote, name, role, avatar, rating), düzen (variant), sütun (cols),
// yıldızlar (rating) ve rengi (ratingColor), avatar, tırnaklar (quotes), "daha fazla" düğmesi (more), kayan hız (speed),
// giriş (reveal), kendi metinler (labels) ve sınıf (class)
const VARIANTS = ["grid", "wall", "slider", "marquee"] as const
const ITEMS = [
  { quote: "İlk etkinliğimde beş arkadaş edindim.", name: "Deniz Arı", role: "İzmir", rating: 5, avatar: "/media/hadi-waves.jpg" },
  { quote: "Koşu grubumuz her hafta büyüyor.", name: "Mert Kaya", role: "İstanbul", rating: 4 },
  { quote: "Biletleri tek yerden sattım.", name: "Leyla Demir", role: "Ankara", rating: 5 },
  { quote: "Tek uygulama, her şey içinde.", name: "Can Yıldız", rating: 3 },
  { quote: "Hafta sonu planı derdi bitti.", name: "Ece Tan", role: "Bursa", rating: 5 },
  { quote: "Görüntülü tanıştık, kimse yabancı değildi.", name: "Arda Su", role: "Antalya", rating: 5 },
  { quote: "Filtrelerle tam aradığımı buldum.", name: "Selin Ak", role: "İstanbul", rating: 4 },
]

export function TestimonialsLab() {
  let $variant: (typeof VARIANTS)[number] = "grid"
  let $cols: 1 | 2 | 3 = 2
  let $rating = true
  let $avatar = true
  let $quotes = true
  let $more = true
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Düzen" options={VARIANTS.map((v) => ({ value: v, label: v }))} bind:value={$variant} />
        <Segmented aria-label="Sütun" options={[1, 2, 3].map((n) => ({ value: n, label: `${n} sütun` }))} bind:value={$cols} />
        <Toggle label="Yıldızlar" bind:value={$rating} />
        <Toggle label="Avatarlar" bind:value={$avatar} />
        <Toggle label="Tırnaklar" bind:value={$quotes} />
        <Toggle label="Daha fazla düğmesi" bind:value={$more} />
      </div>
    </Card>
    {() => {
      // bu satırda okunan durumlar değişince yorumlar yeniden çizilir
      const variant = $variant, cols = $cols, rating = $rating, avatar = $avatar, quotes = $quotes, more = $more
      return <Testimonials class="lab-tm" variant={variant} cols={cols} items={ITEMS}
      rating={rating} ratingColor="brand-gold" avatar={avatar} quotes={quotes} more={more}
      speed={[30, 18]} reveal={false}
      labels={{ more: "Hepsini göster", less: "Daralt", slider: "Yorumlar", rating: (n: number) => `5 üzerinden ${n}` }} />
    }}
  </div>
}
