import { HonestCompare } from "march/landing"
import { Toggle, Card } from "march/ui"

// HonestCompare'in bütün özellikleri bir arada: sütunlar, satırlar (not ile), kendi sütunun kimliği (us), tablo başlığı
// ve görünürlüğü, özet, süzgeç düğmesi, etiketler, bütün metinler (labels), kendi hücre çizimin (renderCell) ve sınıf
const COLUMNS = [{ id: "biz", name: "Bisiklet" }, { id: "araba", name: "Araba" }, { id: "otobus", name: "Otobüs" }]
const ROWS = [
  { label: "Trafikte beklemez", values: { biz: true, araba: false, otobus: "partial" as const } },
  { label: "Yağmurda kuru tutar", values: { biz: false, araba: true, otobus: true }, note: "Yağmurluk şart. Şemsiyeli bisiklet denemesi sürüyor." },
  { label: "Spor yaptırır", values: { biz: true, araba: false, otobus: false } },
  { label: "Yük taşır", values: { biz: "partial" as const, araba: true, otobus: "partial" as const }, note: "Sepetle 10 kg'a kadar." },
  { label: "Aylık gider", values: { biz: "0 ₺", araba: "6.000 ₺", otobus: "1.200 ₺" } },
]

export function HonestCompareLab() {
  let $summary = true
  let $filter = true
  let $tags = true
  let $caption = true
  let $words = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Toggle label="Özet" bind:value={$summary} />
        <Toggle label="Süzgeç düğmesi" bind:value={$filter} />
        <Toggle label="Etiketler" bind:value={$tags} />
        <Toggle label="Başlık görünsün" bind:value={$caption} />
        <Toggle label="Yazıyla hücreler" bind:value={$words} />
      </div>
    </Card>
    {() => { const caption = $caption, summary = $summary, filter = $filter, tags = $tags, words = $words; return <HonestCompare class="lab-hc" us="biz" columns={COLUMNS} rows={ROWS}
      caption="İşe nasıl gidelim?" showCaption={caption} summary={summary} filter={filter} tags={tags}
      labels={{ yes: "Evet", no: "Hayır", partly: "Biraz", ahead: "Önde", behind: "Geride", region: "Ulaşım tablosu",
        counts: (c: { ahead: number; even: number; behind: number }) => `${c.ahead} önde · ${c.even} eşit · ${c.behind} geride`, onlyBehind: "Yalnız geride olduklarımız", showAll: "Hepsini göster" }}
      renderCell={words ? (value: unknown, info: { us: boolean }) => (typeof value === "boolean" ? <b class={info.us ? "lab-mine" : undefined}>{value ? "Var" : "Yok"}</b> : undefined) : undefined} /> }}
  </div>
}
