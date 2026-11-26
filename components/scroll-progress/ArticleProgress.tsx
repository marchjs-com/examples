// ArticleProgress: the real-life ScrollProgress example.
//
// What it shows: a blog post with a reading-progress bar under its title that measures only this article, not the
// whole page. Reading from the title to the last line fills the bar from 0 to 100 %.
// When to use this pattern: long articles or documentation pages inside a bigger layout, where "how much of the page
// is left" would count the header, footer and sidebars too.
import { ScrollProgress } from "march/landing"
import { Card } from "march/ui"

// The article text. Plain data, so a real page could load it from a CMS instead.
const PARAGRAPHS = [
  "Kahveyi demlemeden önce suyu 92 dereceye getir; kaynar su çekirdeği yakar.",
  "Öğütme boyu demleme süresini belirler: filtre için orta, espresso için ince.",
  "Oran: 15 gram kahveye 250 mililitre su. Terazi, göz kararından iyidir.",
  "İlk 30 saniye kahveyi az suyla ıslat; gaz çıkınca tadı daha temiz olur.",
]

export function ArticleProgress() {
  // The element to measure. ref={…} below stores it here once it exists; ScrollProgress reads it through a function
  // (target={() => article}), so it asks for the element when it needs it, not at the moment the JSX is built.
  let article: Element | null = null
  return <Card>
    {/* The article is the measured box: the bar is 0 at its top and 1 at its end.
        ScrollProgress options used here:
        - target: the element to measure (the default is the whole page).
        - position="inline": the bar is drawn where it is written, between title and text; the default "fixed" pins
          it to the top of the screen.
        - paint="accent": the theme's accent colour; the default "gradient" is the brand gradient. (The `color` prop
          would win over `paint`; see ThickBar.)
        - label: the accessible name. The bar is a role="progressbar" whose value runs 0-100, so screen readers
          announce the reading progress with this name.
        The fill is a transform written by the motion engine's scroll scene, so it follows the global speed and
        reduced-motion settings; there is no animation prop to switch off. */}
    <article ref={(el: Element) => { article = el }} sx={{ flex: "col", gap: 3 }}>
      <h2 sx={{ text: "xl" }}>Evde iyi filtre kahve</h2>
      <ScrollProgress target={() => article} position="inline" paint="accent" label="Yazının okunan kısmı" />
      {PARAGRAPHS.map((t) => <p>{t}</p>)}
      <p sx={{ color: "muted", text: "sm" }}>Okuma süresi: 2 dakika</p>
    </article>
  </Card>
}
