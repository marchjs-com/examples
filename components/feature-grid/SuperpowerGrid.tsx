import { FeatureGrid } from "march/landing"
import { Button } from "march/ui"
import { zap, eye, globe, clock, heart, star } from "march/icons"

// süper güç seç: her basışta ızgaraya yeni bir güç eklenir; altısı dolunca baştan
const POWERS = [
  { icon: zap, title: "Şimşek hızı", body: "Kahve soğumadan iş biter." },
  { icon: eye, title: "Röntgen bakışı", body: "Hatayı kod okumadan görürsün." },
  { icon: globe, title: "Işınlanma", body: "Toplantıya trafiksiz gidersin." },
  { icon: clock, title: "Zamanı durdur", body: "Cuma akşamı biraz daha uzar." },
  { icon: heart, title: "Herkes sever", body: "Kod incelemesi tek seferde geçer." },
  { icon: star, title: "Şans yıldızı", body: "Derleme her zaman yeşil." },
]

export function SuperpowerGrid() {
  let $count = 2
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button on:click={() => $count = $count >= POWERS.length ? 1 : $count + 1}>
      {$count >= POWERS.length ? "Baştan başla" : `Bir güç daha (${$count}/${POWERS.length})`}
    </Button>
    {() => { const n = $count; return <FeatureGrid variant="plain" cols={3} reveal="scale" items={POWERS.slice(0, n)} /> }}
  </div>
}
