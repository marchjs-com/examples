// MenuTree: the creative-minimal Tree example.
//
// What it shows: a cafe menu. Branches are categories, leaves are products with their price as `meta`; choosing a
// product writes its price below. It is the smallest useful Tree: nodes, expanded, selected and onSelect.
// When to use this pattern: a short two-level choice where categories only group the items.
// Keyboard: arrows move between rows, Right / Left open and close a category, Enter or Space picks.
import { Tree, Card } from "march/ui"

const menu = [
  { id: "hot", label: "Sıcak içecekler", children: [
    { id: "tea", label: "Çay", meta: "20 ₺" },
    { id: "latte", label: "Latte", meta: "75 ₺" },
  ] },
  { id: "cold", label: "Soğuk içecekler", children: [
    { id: "lemon", label: "Limonata", meta: "60 ₺" },
    { id: "cold-brew", label: "Soğuk demleme", meta: "85 ₺" },
  ] },
  { id: "cake", label: "Tatlılar", children: [{ id: "cheese", label: "San Sebastian", meta: "120 ₺" }] },
]
// All products in one flat list, so the picked id can be turned back into its node.
const all = menu.flatMap((c) => c.children ?? [])

// $pick holds the id of the picked product; item() looks up its node each time $pick changes.
export function MenuTree() {
  let $pick = "latte"
  const item = () => all.find((x) => x.id === $pick)
  return <Card title="Menü">
    {/* expanded={["hot"]} opens the first category at start. m:color="brand-orange" (a common prop) colours the
            tree with one token. In onSelect we ignore branches (nodes with children) so only products can be picked;
            a branch click still opens / closes it. selected={() => $pick} keeps the highlight in step with $pick. */}
    <Tree label="Menü" nodes={menu} expanded={["hot"]} m:color="brand-orange" selected={() => $pick} onSelect={(n: { id: string; children?: unknown }) => { if (!n.children) $pick = n.id }} />
    <p sx={{ text: "bold", color: "brand-orange" }}>{() => item() ? `${String(item()!.label)} · ${String(item()!.meta)}` : "Bir ürün seçin"}</p>
  </Card>
}
