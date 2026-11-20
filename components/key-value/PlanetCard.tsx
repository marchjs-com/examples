import { KeyValue, Card, Segmented } from "march/ui"

// bir gezegen kartı: seçilen gezegenin bilgileri; nesne verince anahtarlar etiket olur
const PLANETS: Record<string, Record<string, string>> = {
  Mars: { "Güneşe uzaklık": "228 milyon km", "Bir gün": "24 sa 37 dk", "Uydu": "2", "Renk": "Kızıl" },
  Jüpiter: { "Güneşe uzaklık": "778 milyon km", "Bir gün": "9 sa 56 dk", "Uydu": "95", "Renk": "Çizgili" },
  Satürn: { "Güneşe uzaklık": "1,4 milyar km", "Bir gün": "10 sa 33 dk", "Uydu": "146", "Renk": "Altın" },
}

export function PlanetCard() {
  let $p = "Mars"
  return <Card title={() => `🪐 ${$p}`}>
    <Segmented options={Object.keys(PLANETS)} bind:value={$p} />
    <KeyValue items={() => PLANETS[$p]} columns={2} />
  </Card>
}
