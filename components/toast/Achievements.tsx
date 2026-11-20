import { Button, toast } from "march/ui"
import { star } from "march/icons"

// başarımlar: her basışta mor yıldızlı, kapat düğmesiz, belirerek gelen bir bildirim
const badges = ["İlk adım", "Hızlı koşucu", "Gece kuşu", "Takım oyuncusu"]

export function Achievements() {
  let $i = 0
  return <Button variant="primary" on:click={() => { toast(`Başarım: ${badges[$i % badges.length]}`, { icon: star, color: "brand-purple", closable: false, motion: "fade" }); $i++ }}>
    Başarım kazan ({$i})
  </Button>
}
