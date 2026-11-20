import { If } from "march"
import { Swatch, Card, Button, Badge, toast } from "march/ui"
import { shoppingBag } from "march/icons"

// ürün sayfasında renk seçimi: renkler bir radyo grubu, tükenen renk seçilemez, sepete seçilen renk gider
interface Variant { color: string; name: string; stock: number }
const variants: Variant[] = [
  { color: "#1f2a44", name: "Gece mavisi", stock: 12 },
  { color: "#c2410c", name: "Kiremit", stock: 3 },
  { color: "#4d7c0f", name: "Zeytin", stock: 0 },
  { color: "linear-gradient(135deg, #f2801f, #a3338c)", name: "Gün batımı (sınırlı)", stock: 1 },
]

export function ProductVariant() {
  let $pick: Variant = variants[0] as Variant
  const add = () => toast(`Sepete eklendi: Keten gömlek · ${$pick.name}`)
  return <Card title="Keten gömlek" subtitle="₺1.249">
    <div sx={{ flex: "col", gap: 3 }}>
      <span sx={{ text: "sm" }}>Renk: <b>{$pick.name}</b></span>
      <div role="radiogroup" aria-label="Renk" sx={{ flex: ["row", "wrap"], gap: 2 }}>
        {variants.map((v) => <Swatch color={v.color} label={v.stock ? v.name : `${v.name} (tükendi)`} role="radio" shape="circle" size="lg"
          mark selected={$pick === v} disabled={!v.stock} onClick={() => $pick = v} />)}
      </div>
      <If when={$pick.stock < 5}><Badge tone="warn">Son {$pick.stock} ürün</Badge></If>
      <Button variant="primary" icon={shoppingBag} on:click={add}>Sepete ekle</Button>
    </div>
  </Card>
}
