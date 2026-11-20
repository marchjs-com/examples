import { TreeView } from "march/components/tree-view"
import { Card } from "march/ui"

// bir bulut sürücüsü: 2 000'den fazla dosya, çoklu seçim, sürükle bırakla taşıma; "Arşiv" klasörü açılınca sunucudan gelir
const TEAMS = ["Pazarlama", "Satış", "Ürün", "Destek", "Finans"]
const files = (dir: string, n: number) => Array.from({ length: n }, (_, i) => ({ id: `${dir}/dosya-${i + 1}.pdf`, label: `rapor-${i + 1}.pdf`, meta: `${1 + (i * 7) % 90} KB` }))
const drive = TEAMS.map((t) => ({
  id: t, label: t, children: [
    { id: `${t}/arşiv`, label: "Arşiv", lazy: true },
    ...["2024", "2025", "2026"].map((y) => ({ id: `${t}/${y}`, label: y, children: files(`${t}/${y}`, 140) })),
  ],
}))
// sunucuyu taklit eden gecikmeli yükleme
const load = (node: { id: string }) => new Promise<{ id: string; label: string }[]>((ok) => setTimeout(() => ok(files(node.id, 8)), 600))

export function DriveBrowser() {
  let $picked = 0
  let $moved = "Henüz taşıma yok"
  return <Card title="Sürücü" subtitle={() => `${$picked} seçili · ${$moved}`}>
    <TreeView label="Sürücü" nodes={drive} expanded={["Pazarlama", "Pazarlama/2026"]} height={320}
      selection="multiple" draggable load={load}
      onSelect={(ids: string[]) => $picked = ids.length}
      onMove={(ids: string[], target: string, pos: string) => $moved = `${ids.length} dosya → ${target} (${pos})`} />
  </Card>
}
