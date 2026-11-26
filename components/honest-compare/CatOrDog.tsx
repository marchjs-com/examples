// CatOrDog: the creative-minimal HonestCompare example.
//
// What it shows: a cat-or-dog comparison. Pick your side and the table scores that side honestly: where it is ahead, even,
// or behind (rows where it loses are marked).
// When to use this pattern: any comparison where you are one of the columns. `us` is the id of your column; HonestCompare
// compares it with the best of the others in every scored row.
// Accessibility: it is a real table with a caption and header cells; yes / no marks carry hidden text.
import { HonestCompare } from "march/landing"
import { Segmented } from "march/ui"

// Rows: a label and a value per column id. A value is true (yes), false (no), "partial" (partly) or any text or node, which is
// shown but not scored. `as const` keeps "partial" a literal.
const ROWS = [
  { label: "Sabah yürüyüşü ister", values: { kedi: false, kopek: true } },
  { label: "Evde yalnız kalabilir", values: { kedi: true, kopek: "partial" as const } },
  { label: "Kapıda karşılar", values: { kedi: "partial" as const, kopek: true } },
  { label: "Kum kabı ister", values: { kedi: true, kopek: false } },
]

// The shape of the summary numbers that `labels.counts` receives.
type Counts = { ahead: number; even: number; behind: number }

export function CatOrDog() {
  // Which column counts as "us".
  let $side: "kedi" | "kopek" = "kedi"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Picks the side. aria-label names the group. */}
    <Segmented aria-label="Tarafın" options={[{ value: "kedi", label: "🐱 Kedi" }, { value: "kopek", label: "🐶 Köpek" }]} bind:value={$side} />
    {/* The table is built inside a `{() => ...}` block that runs again when $side changes, so it is drawn again for the new side.
        - us: the id of the column to judge. caption: the table's caption (screen readers; visible with showCaption).
        - columns: the products. rows: the data. labels.counts: our own summary sentence as a function of the numbers. */}
    {() => { const side = $side; return <HonestCompare us={side} caption="Kedi ve köpek" columns={[{ id: "kedi", name: "🐱 Kedi" }, { id: "kopek", name: "🐶 Köpek" }]} rows={ROWS}
      labels={{ counts: (c: Counts) => `${c.ahead} konuda önde, ${c.behind} konuda geride` }} /> }}
  </div>
}
