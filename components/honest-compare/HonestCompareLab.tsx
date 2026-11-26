// HonestCompareLab: the full-featured HonestCompare example; it uses every prop at least once.
//
// Props shown here: columns, rows (with notes), us, caption and showCaption, summary, filter, tags, labels (every text),
// renderCell and class. The switches above the table turn parts on and off so you can try them.
// Use it as a reference when you need one option: find the prop below and copy the line.
// HonestCompareLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { HonestCompare } from "march/landing"
import { Toggle, Card } from "march/ui"

// The products compared; the id "biz" is our own column (it is given to `us` below).
const COLUMNS = [{ id: "biz", name: "Bisiklet" }, { id: "araba", name: "Araba" }, { id: "otobus", name: "Otobüs" }]
// Rows: true / false / "partial" are scored, other text (the last row) is shown but not scored. `note` is a longer
// explanation kept visible on rows where we are behind.
const ROWS = [
  { label: "Trafikte beklemez", values: { biz: true, araba: false, otobus: "partial" as const } },
  { label: "Yağmurda kuru tutar", values: { biz: false, araba: true, otobus: true }, note: "Yağmurluk şart. Şemsiyeli bisiklet denemesi sürüyor." },
  { label: "Spor yaptırır", values: { biz: true, araba: false, otobus: false } },
  { label: "Yük taşır", values: { biz: "partial" as const, araba: true, otobus: "partial" as const }, note: "Sepetle 10 kg'a kadar." },
  { label: "Aylık gider", values: { biz: "0 ₺", araba: "6.000 ₺", otobus: "1.200 ₺" } },
]

export function HonestCompareLab() {
  // One boolean per switch.
  let $summary = true
  let $filter = true
  let $tags = true
  let $caption = true
  let $words = false
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The switches: each one drives one prop below. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Toggle label="Özet" bind:value={$summary} />
        <Toggle label="Süzgeç düğmesi" bind:value={$filter} />
        <Toggle label="Etiketler" bind:value={$tags} />
        <Toggle label="Başlık görünsün" bind:value={$caption} />
        <Toggle label="Yazıyla hücreler" bind:value={$words} />
      </div>
    </Card>
    {/* The table sits in a `{() => ...}` block that runs again when a switch changes, so it is drawn again with the new props.
        - us="biz": the id of our column. columns / rows: the data. class: a hook for tests and CSS.
        - caption: the table's name; showCaption: show it or keep it for screen readers only.
        - summary: the counts line. filter: the "only where we are behind" toggle. tags: the ahead / behind tags beside the labels.
        - labels: replaces every text (yes / no / partly, tags, the table's region name, the counts function, the toggle texts).
        - renderCell(value, info): draw a cell yourself; return undefined to keep the default mark. `info.us` says whether the
          cell is in our column. */}
    {() => { const caption = $caption, summary = $summary, filter = $filter, tags = $tags, words = $words; return <HonestCompare class="lab-hc" us="biz" columns={COLUMNS} rows={ROWS}
      caption="İşe nasıl gidelim?" showCaption={caption} summary={summary} filter={filter} tags={tags}
      labels={{ yes: "Evet", no: "Hayır", partly: "Biraz", ahead: "Önde", behind: "Geride", region: "Ulaşım tablosu",
        counts: (c: { ahead: number; even: number; behind: number }) => `${c.ahead} önde · ${c.even} eşit · ${c.behind} geride`, onlyBehind: "Yalnız geride olduklarımız", showAll: "Hepsini göster" }}
      renderCell={words ? (value: unknown, info: { us: boolean }) => (typeof value === "boolean" ? <b class={info.us ? "lab-mine" : undefined}>{value ? "Var" : "Yok"}</b> : undefined) : undefined} /> }}
  </div>
}
