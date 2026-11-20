import { Rating } from "march/ui"
import { coffee } from "march/icons"

// kahve sertliği: yıldız yerine fincanlar; her seviyenin bir adı var, ekran okuyucu da o adı söyler
const levels = ["Seçilmedi", "Çok yumuşak", "Yumuşak", "Dengeli", "Sert", "Uyandırır"]

export function CoffeeStrength() {
  let $cups = 3
  return <div sx={{ flex: ["row", "center", "wrap"], gap: 3 }}>
    <Rating bind:value={$cups} icon={coffee} m:color="brand-orange" size="lg" label="Kahve sertliği"
      starLabel={(n: number) => levels[n] ?? String(n)} />
    <span sx={{ text: ["lg", "bold"] }}>{levels[$cups]}</span>
  </div>
}
