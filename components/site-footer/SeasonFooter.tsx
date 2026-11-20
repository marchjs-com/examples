import { SiteFooter } from "march/landing"
import { Segmented } from "march/ui"

// mevsimlik alt bilgi: mevsim seçilince marka, kısa satır ve büyük yazı birlikte değişir
const SEASONS = {
  kış: { mark: "❄️", about: "Sıcak çikolata ve uzun sohbetler.", word: "KIŞ" },
  bahar: { mark: "🌸", about: "Parkta piknik, akşam yürüyüşü.", word: "BAHAR" },
  yaz: { mark: "☀️", about: "Sahil, dondurma, gece konserleri.", word: "YAZ" },
  güz: { mark: "🍂", about: "Yağmur, kitap ve filtre kahve.", word: "GÜZ" },
} as const

export function SeasonFooter() {
  let $season: keyof typeof SEASONS = "bahar"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Segmented aria-label="Mevsim" options={Object.keys(SEASONS)} bind:value={$season} />
    {() => {
      const s = SEASONS[$season]
      return <SiteFooter brand={{ name: "Mevsim", mark: s.mark }} about={s.about} wordmark={s.word} toTop={false} />
    }}
  </div>
}
