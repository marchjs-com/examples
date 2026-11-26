// FaqLab: the full-featured Faq example; it uses every prop at least once.
//
// Props shown here: items (q, a, keywords), layout, title, lead, contact, search, multiple, labels, count, reveal and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// FaqLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Faq } from "march/landing"
import { Button, Card, Segmented, Toggle } from "march/ui"

// Each item is { q, a, keywords? }: the question, the answer, and extra words that only the search looks at (the first
// item is found by "fiyat" even though that word is not in its text).
const ITEMS = [
  { q: "Ücretsiz mi?", a: "Evet; Premium isteğe bağlı.", keywords: "fiyat para" },
  { q: "Telefonda çalışır mı?", a: "Telefonda da tarayıcıda da.", keywords: "mobil uygulama" },
  { q: "Etkinliğimi nasıl kurarım?", a: "Ne, nerede, ne zaman: birkaç adım." },
  { q: "İptal olursa ne olur?", a: "Katılanlara hemen bildirim gider.", keywords: "iade bilet" },
  { q: "Güvende miyim?", a: "Doğrulama, şikâyet ve engelleme her ekranda." },
]

// The switches that drive the props, and a counter for the contact button.
export function FaqLab() {
  let $layout: "center" | "split" = "split"
  let $search = true
  let $multiple = false
  let $count = true
  let $asked = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Controls: they change the Faq's props live (layout, search box, several open at once, the count line). */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Düzen" options={[{ value: "center", label: "ortada" }, { value: "split", label: "iki sütun" }]} bind:value={$layout} />
        <Toggle label="Arama" bind:value={$search} />
        <Toggle label="Birden çok açık" bind:value={$multiple} />
        <Toggle label="Eşleşme satırı" bind:value={$count} />
      </div>
    </Card>
    {() => {
      // layout, search, multiple and count are read when the Faq is built, so this function re-runs and builds it again when
      // one of them changes. title and lead are functions themselves, so they update without a rebuild.
      const layout = $layout, search = $search, multiple = $multiple, count = $count
      // The Faq (an Accordion of questions):
      //   layout: "center" (the default) or "split", which puts the heading and the contact line at the start (sticky)
      //     and the questions at the end. title / lead / contact are used by the split layout.
      //   search: adds a search box that narrows the list (fuzzy, accent- and case-insensitive; keywords are searched too) and
      //     announces how many questions match. count: the "N of M" line under the box.
      //   multiple: several answers may be open at once (the Accordion default is one at a time).
      //   labels: your own texts for the search box, the count line ((shown, total) => text) and the no-match message.
      //   reveal: the entrance of the heading column in split layout; "none" turns it off (a reveal effect is skipped with
      //     reduced motion anyway).
      //   class: added to the root; items: the questions.
      // Accessibility: the questions are Accordion buttons (aria-expanded, arrow keys); the count is a polite live region.
      return <Faq class="lab-faq" layout={layout} search={search} multiple={multiple} count={count} reveal="none"
        title={() => `Sık sorulanlar (${ITEMS.length})`} lead={() => `${$asked} kişi bize yazdı`}
        contact={<Button variant="secondary" on:click={() => $asked++}>Bize yaz</Button>}
        labels={{ search: "Soru ara", empty: "Hiçbir soru tutmadı.", count: (shown: number, total: number) => `${total} sorudan ${shown} tanesi` }}
        items={ITEMS} />
    }}
  </div>
}
