// QuoteDeck: the creative-minimal Pagination example.
//
// Quotes of the day like a deck of cards: one quote per page, and the simple pagination gives arrows and a "2 / 5"
// counter. Use this pattern for a slideshow-like view where you only need Previous / Next and a position text, not a row of
// page numbers.
import { Pagination, Card } from "march/ui"
import { arrowLeft, arrowRight } from "march/icons"

const QUOTES = [
  ["Yol, yürüyene görünür.", "Atasözü"],
  ["Basit olan, karmaşık olanı yener.", "Bir yazılımcı"],
  ["Her büyük iş küçük bir adımla başlar.", "Lao Tzu"],
  ["Bugün dikilen ağaç yarın gölge verir.", "Atasözü"],
  ["Merak, öğrenmenin motorudur.", "Bir öğretmen"],
]

export function QuoteDeck() {
  // The current page (1-based); the quote shown is derived from it, so it follows the pagination.
  let $page = 1
  const $quote = QUOTES[$page - 1] ?? ["", ""]
  // m:theme="night" on the Card makes the card and everything inside use the dark theme tokens.
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 3 }}>
      <span sx={{ text: "xl" }}>{"“" + $quote[0] + "”"}</span>
      <span sx={{ text: "sm", color: "brand-gold" }}>{"— " + $quote[1]}</span>
      {/* variant="simple" draws only Previous / Next. pages={QUOTES.length}: the page count, so the pagination knows
          where it ends (Next is disabled on the last page). status: a function that writes the text between the buttons
          ("2 / 5"). prev / next: icons instead of the default text; because they are icons, labels.previous /
          labels.next give the buttons their accessible names. m:color: the common colour token prop. */}
      <Pagination variant="simple" bind:page={$page} pages={QUOTES.length} status={(p: number, n: number) => `${p} / ${n}`}
        prev={arrowLeft} next={arrowRight} labels={{ previous: "Önceki söz", next: "Sonraki söz" }} m:color="brand-gold" />
    </div>
  </Card>
}
