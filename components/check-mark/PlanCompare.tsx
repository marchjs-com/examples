import { DataGrid } from "march/components/data-grid"
import { CheckMark, Card } from "march/ui"

// fiyat planı karşılaştırması: her özellik için evet / hayır / kısmen; satırın metni zaten söylediği için okunan
// metin hücrede saklı (sr-only) kalır
const PLANS = ["Ücretsiz", "Pro", "Kurumsal"]
const FEATURES: [string, (boolean | "partial")[]][] = [
  ["Sınırsız proje", [false, true, true]],
  ["Özel alan adı", [false, "partial", true]],
  ["Öncelikli destek", [false, false, true]],
  ["Ekip üyesi", ["partial", true, true]],
]

const rows = FEATURES.map(([name, marks], id) => ({ id, name, marks }))

export function PlanCompare() {
  return <Card title="Planlar">
    <DataGrid label="Plan karşılaştırması" rows={rows} toolbar={false}
      columns={[
        { key: "name", label: "Özellik", width: 180 },
        ...PLANS.map((p, i) => ({ key: p, label: p, width: 110, render: (r: (typeof rows)[number]) => <CheckMark value={r.marks[i]!} variant={r.marks[i] === true ? "solid" : "plain"} size="sm" /> })),
      ]} />
  </Card>
}
