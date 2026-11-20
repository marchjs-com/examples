import { Picture, Card, Button } from "march/ui"

// bir kartpostal: ön yüzde resim, basınca arka yüzde hazır bir düğüm; ikisi de aynı Picture yuvasından geçer
const front = { src: "/media/dusk.jpg", alt: "Gün batımında tepeler", width: 1200, height: 800 }

export function Postcard() {
  let $back = false
  const back = <div sx={{ flex: "col", gap: 2, p: 6 }}><strong>Sevgili Deniz,</strong><span>Tepelerde gün batımı harikaydı. Yakında görüşürüz!</span></div>
  return <Card title="Kartpostal" m:theme={$back ? "night" : undefined}>
    <div sx={{ flex: "col", gap: 3 }}>
      {() => <Picture source={$back ? back as Node : front} fit="cover" />}
      <Button size="sm" on:click={() => $back = !$back}>{() => ($back ? "Ön yüzü göster" : "Arkasını çevir")}</Button>
    </div>
  </Card>
}
