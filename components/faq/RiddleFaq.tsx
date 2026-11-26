// RiddleFaq: the creative-minimal Faq example.
//
// What it shows: a riddle box. Press a question and the answer opens; the button switches between easy and hard riddles (the hard
// set lets several answers stay open).
// When to use this pattern: the smallest Faq: just `items`. Without `layout` or `search` it is a plain Accordion of questions
// with the Faq look.
import { Faq } from "march/landing"
import { Button } from "march/ui"

// Each item is { q, a }: a question and its answer (the answer can be any text, an emoji too).
const EASY = [
  { q: "Ağzı var, dili yok; durmadan akar. Nedir?", a: "Nehir 🌊" },
  { q: "Benim bir ağacım var, on iki dalı var. Nedir?", a: "Yıl ve aylar 📅" },
]
const HARD = [
  { q: "Ne kadar çok alırsan o kadar büyür. Nedir?", a: "Çukur 🕳️" },
  { q: "Adımı söylersen beni bozarsın. Ben neyim?", a: "Sessizlik 🤫" },
  { q: "Gece gelir, sabah gider; saymakla bitmez. Nedir?", a: "Yıldızlar ✨" },
]

// $hard picks the set.
export function RiddleFaq() {
  let $hard = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button variant="secondary" on:click={() => $hard = !$hard}>{$hard ? "Kolaylara dön" : "Zor bilmeceler 🧠"}</Button>
    {/* `multiple` is read when the Faq is built, so a function child builds it again when $hard changes: the hard set
            allows several answers open at once, the easy one only one. */}
    {() => { const hard = $hard; return <Faq items={hard ? HARD : EASY} multiple={hard} /> }}
  </div>
}
