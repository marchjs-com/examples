import { ScrollStory } from "march/landing"

// dört mevsim: sayfa kaydıkça yandaki büyük emoji değişir, bölüm o mevsimin rengini alır
const Big = (p: { face: string }) => <div sx={{ flex: ["row", "center"], p: 6 }} style={{ fontSize: "96px" }} role="img" aria-label={p.face}>{p.face}</div>

export function SeasonStory() {
  let $now = "İlkbahar"
  const NAMES = ["İlkbahar", "Yaz", "Sonbahar", "Kış"]
  return <div sx={{ flex: "col", gap: 3 }}>
    <strong>{`Şu an: ${$now}`}</strong>
    <ScrollStory onStep={(i: number) => $now = NAMES[i]!} steps={[
      { title: "İlkbahar", body: "Erikler çiçek açtı, ceketler dolaba.", media: <Big face="🌸" />, color: "brand-pink" },
      { title: "Yaz", body: "Deniz, karpuz, uzun akşamlar.", media: <Big face="🏖️" />, color: "brand-orange" },
      { title: "Sonbahar", body: "Yapraklar sarı, çay demlik demlik.", media: <Big face="🍂" />, color: "brand-gold" },
      { title: "Kış", body: "Kar yağdı; sahlep sırası.", media: <Big face="☃️" />, color: "brand-blue" },
    ]} />
  </div>
}
