// PlanCompare: the real-life CheckMark example.
//
// What it shows: a pricing-plan comparison table. Each feature row shows ✓, ✕ or – (partly) per plan, drawn by
// CheckMark inside the cells of a DataGrid.
// When to use this pattern: comparison tables and feature matrices, where the meaning must not rest on colour or shape
// alone: CheckMark keeps a hidden text (Yes / No / Partly) that screen readers read for every cell.
// Motion: the marks here never change while the table is on screen, so no motion is set (add motion="flip" if a
// value can change live).
import { DataGrid } from "march/components/data-grid"
import { CheckMark, Card } from "march/ui"

const PLANS = ["Ücretsiz", "Pro", "Kurumsal"]
// One tuple per feature: its name and one value per plan (true, false or "partial").
const FEATURES: [string, (boolean | "partial")[]][] = [
  ["Sınırsız proje", [false, true, true]],
  ["Özel alan adı", [false, "partial", true]],
  ["Öncelikli destek", [false, false, true]],
  ["Ekip üyesi", ["partial", true, true]],
]

// DataGrid wants plain row objects with an id; the marks array is read by index in the column renderers below.
const rows = FEATURES.map(([name, marks], id) => ({ id, name, marks }))

export function PlanCompare() {
  // toolbar={false}: no search / tools bar, the table is small and read-only.
  // Columns: the first is plain text; one column per plan is made with `render`, which returns a CheckMark for the
  // row's value. variant="solid" makes real yes answers stand out; the others stay plain. size="sm" fits the cell.
  // There is no `text` prop here: the text stays hidden for sighted users but is still read by screen readers.
  return <Card title="Planlar">
    <DataGrid label="Plan karşılaştırması" rows={rows} toolbar={false}
      columns={[
        { key: "name", label: "Özellik", width: 180 },
        ...PLANS.map((p, i) => ({ key: p, label: p, width: 110, render: (r: (typeof rows)[number]) => <CheckMark value={r.marks[i]!} variant={r.marks[i] === true ? "solid" : "plain"} size="sm" /> })),
      ]} />
  </Card>
}
