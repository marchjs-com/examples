import { Tree, Card } from "march/ui"

// bir kafenin menüsü: dallar kategoriler, yapraklar ürünler; seçince altta fiyat görünür
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
const all = menu.flatMap((c) => c.children ?? [])

export function MenuTree() {
  let $pick = "latte"
  const item = () => all.find((x) => x.id === $pick)
  return <Card title="Menü">
    <Tree label="Menü" nodes={menu} expanded={["hot"]} m:color="brand-orange" selected={() => $pick} onSelect={(n: { id: string; children?: unknown }) => { if (!n.children) $pick = n.id }} />
    <p sx={{ text: "bold", color: "brand-orange" }}>{() => item() ? `${String(item()!.label)} · ${String(item()!.meta)}` : "Bir ürün seçin"}</p>
  </Card>
}
