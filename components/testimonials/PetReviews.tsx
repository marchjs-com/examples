import { Testimonials } from "march/landing"
import { Button } from "march/ui"

// evcil hayvanlar yeni ödül mamasını yorumluyor: her basışta bir yorum daha gelir
const PETS = [
  { quote: "Hav! Hav hav. Yani: harika.", name: "Karabaş", role: "Golden, 4 yaş", rating: 5 },
  { quote: "Kokladım, yedim, uyudum. Beş yıldız.", name: "Pamuk", role: "Tekir, 2 yaş", rating: 5 },
  { quote: "Havuçlu olanı daha iyiydi.", name: "Zıpzıp", role: "Tavşan, 1 yaş", rating: 3 },
  { quote: "Tırmalamadım; bu bir şey demek.", name: "Duman", role: "Van kedisi, 6 yaş", rating: 4 },
]

export function PetReviews() {
  let $count = 2
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button on:click={() => $count = $count >= PETS.length ? 1 : $count + 1}>{$count >= PETS.length ? "Baştan" : "Bir yorum daha 🐾"}</Button>
    {() => { const n = $count; return <Testimonials variant="grid" cols={2} ratingColor="brand-gold" items={PETS.slice(0, n)} /> }}
  </div>
}
