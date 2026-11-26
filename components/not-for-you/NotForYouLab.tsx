// NotForYouLab: the full-featured NotForYou example; it uses every prop at least once.
//
// NotForYou is the anti-landing block: it says who a product is NOT for (and optionally who it is for). With `check`
// each line is a toggle the visitor can strike out. Props shown here: items (text, detail, instead), forYou, title,
// forYouTitle, check, verdict, variant (cards or list), onCheck, meLabel, hint, markedHint, mark (true or your own
// function) and class.
// Two controls change the look live: cards or list, and the built-in marks or your own emoji marks.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// NotForYouLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { NotForYou } from "march/landing"
import { Segmented, Toggle, Card } from "march/ui"

// The "not for you" lines. `detail` explains the line; `instead` is the positive side revealed once it is struck out.
const ITEMS = [
  { text: "Gece yarısı kod yazmayı sevmiyorsun", detail: "Topluluk en çok gece canlı.", instead: "Gece kuşusun: canlı yayınlar tam saatinde." },
  { text: "Yalnız çalışmak istiyorsun", detail: "Her proje bir ekiple yapılır.", instead: "Ekip işini seviyorsun." },
  { text: "Hazır cevap arıyorsun", detail: "Burada soru sorulur, birlikte bulunur.", instead: "Kendin bulmaktan keyif alıyorsun." },
]
// Your own marks, one per state: "not" (a line that still applies), "marked" (struck out) and "for" (the for-you column).
const MARKS = { not: "🙅", marked: "🎉", for: "👍" }

export function NotForYouLab() {
  // Reactive state: the layout, whether to use own marks, and the indexes the visitor has struck out.
  let $variant: "cards" | "list" = "cards"
  let $own = false
  let $marked: number[] = []
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görünüm" options={[{ value: "cards", label: "kartlar" }, { value: "list", label: "liste" }]} bind:value={$variant} />
        <Toggle label="Kendi işaretlerim" bind:value={$own} />
      </div>
    </Card>
    {() => {
      // Signals are read here so the block is drawn again when a control changes.
      const variant = $variant, own = $own
      // - class="lab-nfy": a class on the root (.m-nfy) for CSS or tests. variant: "cards" (boxes) or "list" (lines).
      // - check: lines become toggles, and a verdict appears under the list.
      // - items / forYou: who it is not for (struck out by the visitor) and who it is for (plain lines).
      // - title / forYouTitle: the two column headings.
      // - verdict: your own sentence for (n struck out, total); here a welcome when everything is struck out.
      // - onCheck: gets the struck-out indexes; the Lab prints them below.
      // - meLabel / hint / markedHint: the card's label, and the small text before and after the tap.
      // - mark: true keeps the round cross / tick marks; a function returns your own mark for each state.
      // Accessibility: each line is a checkbox button (aria-checked), the verdict is a status region announced
      // politely. The strike-out motion follows the motion engine: reduced motion, global speed and "Stop all".
      return <NotForYou class="lab-nfy" variant={variant} check items={ITEMS}
        forYou={[{ text: "Birlikte öğrenmeyi seviyorsun", detail: "Haftalık eşli programlama." }]}
        title="Kulübe göre değilsin, eğer…" forYouTitle="Kulüp seni bekliyor, eğer…"
        verdict={(n: number, total: number) => (n === total ? "Hoş geldin, kulüp senin!" : `${n} / ${total} çizildi`)}
        onCheck={(m: number[]) => $marked = m}
        meLabel="Bu benim" hint="Değil mi? Dokun" markedHint="Değilmişsin"
        mark={own ? (state: keyof typeof MARKS) => MARKS[state] : true} />
    }}
    <p sx={{ color: "muted" }} class="lab-marked">Çizilenler: {$marked.join(", ") || "yok"}</p>
  </div>
}
