import { HonestCompare } from "march/landing"
import { Segmented } from "march/ui"

// kedi mi köpek mi: tarafını seç, tablo kendi tarafını dürüstçe puanlar (nerede geride olduğunu da söyler)
const ROWS = [
  { label: "Sabah yürüyüşü ister", values: { kedi: false, kopek: true } },
  { label: "Evde yalnız kalabilir", values: { kedi: true, kopek: "partial" as const } },
  { label: "Kapıda karşılar", values: { kedi: "partial" as const, kopek: true } },
  { label: "Kum kabı ister", values: { kedi: true, kopek: false } },
]

type Counts = { ahead: number; even: number; behind: number }

export function CatOrDog() {
  let $side: "kedi" | "kopek" = "kedi"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Segmented aria-label="Tarafın" options={[{ value: "kedi", label: "🐱 Kedi" }, { value: "kopek", label: "🐶 Köpek" }]} bind:value={$side} />
    {() => { const side = $side; return <HonestCompare us={side} caption="Kedi ve köpek" columns={[{ id: "kedi", name: "🐱 Kedi" }, { id: "kopek", name: "🐶 Köpek" }]} rows={ROWS}
      labels={{ counts: (c: Counts) => `${c.ahead} konuda önde, ${c.behind} konuda geride` }} /> }}
  </div>
}
