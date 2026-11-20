import { Faq } from "march/landing"
import { Button } from "march/ui"

// bilmece kutusu: soruya bas, cevap açılır; düğme kolay ve zor bilmeceler arasında geçer
const EASY = [
  { q: "Ağzı var, dili yok; durmadan akar. Nedir?", a: "Nehir 🌊" },
  { q: "Benim bir ağacım var, on iki dalı var. Nedir?", a: "Yıl ve aylar 📅" },
]
const HARD = [
  { q: "Ne kadar çok alırsan o kadar büyür. Nedir?", a: "Çukur 🕳️" },
  { q: "Adımı söylersen beni bozarsın. Ben neyim?", a: "Sessizlik 🤫" },
  { q: "Gece gelir, sabah gider; saymakla bitmez. Nedir?", a: "Yıldızlar ✨" },
]

export function RiddleFaq() {
  let $hard = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button variant="secondary" on:click={() => $hard = !$hard}>{$hard ? "Kolaylara dön" : "Zor bilmeceler 🧠"}</Button>
    {() => { const hard = $hard; return <Faq items={hard ? HARD : EASY} multiple={hard} /> }}
  </div>
}
