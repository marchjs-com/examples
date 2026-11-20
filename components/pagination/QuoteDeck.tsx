import { Pagination, Card } from "march/ui"
import { arrowLeft, arrowRight } from "march/icons"

// günün sözleri bir deste gibi: yalın sayfalama, oklar ve "2 / 5" sayacı; her sayfa bir söz
const QUOTES = [
  ["Yol, yürüyene görünür.", "Atasözü"],
  ["Basit olan, karmaşık olanı yener.", "Bir yazılımcı"],
  ["Her büyük iş küçük bir adımla başlar.", "Lao Tzu"],
  ["Bugün dikilen ağaç yarın gölge verir.", "Atasözü"],
  ["Merak, öğrenmenin motorudur.", "Bir öğretmen"],
]

export function QuoteDeck() {
  let $page = 1
  const $quote = QUOTES[$page - 1] ?? ["", ""]
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 3 }}>
      <span sx={{ text: "xl" }}>{"“" + $quote[0] + "”"}</span>
      <span sx={{ text: "sm", color: "brand-gold" }}>{"— " + $quote[1]}</span>
      <Pagination variant="simple" bind:page={$page} pages={QUOTES.length} status={(p: number, n: number) => `${p} / ${n}`}
        prev={arrowLeft} next={arrowRight} labels={{ previous: "Önceki söz", next: "Sonraki söz" }} m:color="brand-gold" />
    </div>
  </Card>
}
