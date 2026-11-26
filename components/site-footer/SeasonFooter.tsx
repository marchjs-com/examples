// SeasonFooter: the creative-minimal SiteFooter example.
//
// What it shows: the smallest footer (brand, a short line and a big wordmark) driven by a season picker. Choosing a
// season changes the brand mark, the line and the big word together.
// When to use this pattern: when a footer must follow state; and as a reminder that SiteFooter needs only a brand, every
// other part (columns, social links, newsletter, legal links) is optional.
import { SiteFooter } from "march/landing"
import { Segmented } from "march/ui"

// One entry per season: an emoji as the brand mark, a short line, and the big decorative word.
const SEASONS = {
  kış: { mark: "❄️", about: "Sıcak çikolata ve uzun sohbetler.", word: "KIŞ" },
  bahar: { mark: "🌸", about: "Parkta piknik, akşam yürüyüşü.", word: "BAHAR" },
  yaz: { mark: "☀️", about: "Sahil, dondurma, gece konserleri.", word: "YAZ" },
  güz: { mark: "🍂", about: "Yağmur, kitap ve filtre kahve.", word: "GÜZ" },
} as const

export function SeasonFooter() {
  // `let $season` is a March signal that the Segmented writes (bind:value).
  let $season: keyof typeof SEASONS = "bahar"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The picker: the options are the season names (the keys of SEASONS). It is a radiogroup, so arrow keys move and
        select; aria-label names the group. */}
    <Segmented aria-label="Mevsim" options={Object.keys(SEASONS)} bind:value={$season} />
    {() => {
      // The signal is read inside this function, so the footer is drawn again for the chosen season.
      // - brand: { name, mark }: the mark can be an icon or, as here, an emoji.
      // - about: the short line under the brand.
      // - wordmark: a big decorative word filling the last line; it is aria-hidden, so screen readers skip it.
      // - toTop={false}: no back-to-top button (it is on by default).
      const s = SEASONS[$season]
      return <SiteFooter brand={{ name: "Mevsim", mark: s.mark }} about={s.about} wordmark={s.word} toTop={false} />
    }}
  </div>
}
