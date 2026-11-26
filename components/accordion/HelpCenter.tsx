// HelpCenter: the real-life Accordion example.
//
// What it shows: a help-centre FAQ. A SearchBox filters the questions as you type, the Accordion shows the matching
// ones, and a small counter reports how many questions match and how often one was opened (the kind of number you
// would send to analytics to learn which answers people need).
// When to use this pattern: any long list of question / answer pairs (support pages, settings explanations, pricing
// FAQs). Composing two small components (SearchBox + Accordion) keeps each one simple; there is no "searchable
// accordion" component because the composition is only a few lines.
import { Accordion, SearchBox } from "march/ui"
import { truck, receipt, shieldCheck, creditCard } from "march/icons"

// The data. Each item has a stable `id`: onToggle reports it (instead of the index), and filtering does not change
// which question is which, so the open state stays attached to the right question.
const faq = [
  { id: "kargo", title: "Kargom ne zaman gelir?", icon: truck, content: "Siparişler aynı gün paketlenir, 2–3 iş gününde teslim edilir." },
  { id: "iade", title: "Nasıl iade ederim?", icon: receipt, content: "Hesabım › Siparişler › İade et: etiket e-postanıza gelir." },
  { id: "garanti", title: "Garanti süresi ne kadar?", icon: shieldCheck, content: "Bütün cihazlar iki yıl garantilidir." },
  { id: "odeme", title: "Hangi ödeme yollarını kabul ediyorsunuz?", icon: creditCard, content: "Kredi kartı, banka kartı ve havale." },
]

export function HelpCenter() {
  // `$` variables are signals: everything that reads them updates when they change.
  // $q is the search text, $opened counts how many times a question was opened.
  let $q = ""
  let $opened = 0
  // The filtered list. It reads $q, so it is recomputed wherever it is called inside a live expression.
  // toLocaleLowerCase("tr") lower-cases with Turkish rules (dotted and dotless i), so the search matches the Turkish
  // texts; use the locale of your own content.
  const shown = () => faq.filter((f) => f.title.toLocaleLowerCase("tr").includes($q.toLocaleLowerCase("tr")))
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* SearchBox: `label` is its accessible name (read by screen readers), `value` + `onInput` keep $q in sync. */}
    <SearchBox label="Soru ara" value={$q} onInput={(v: string) => $q = v} />
    {/* A function child is a live region of the view: when shown() changes, the Accordion is drawn again with the
        new items. variant="contained" draws one framed list, which reads better for many short questions than
        separate cards. onToggle(key, open) fires for every open and close; we only count the opens. */}
    {() => <Accordion variant="contained" items={shown()} onToggle={(_k: string | number, open: boolean) => { if (open) $opened++ }} />}
    {/* Live summary line. Animation and keyboard come from Accordion itself (↑ ↓ Home End between headers, the
        motion engine for the height, which honours reduced motion), so this example needs no code for them. */}
    <span sx={{ text: "xs", color: "muted" }}>{shown().length} soru · {$opened} kez açıldı</span>
  </div>
}
