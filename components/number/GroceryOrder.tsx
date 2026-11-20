import { NumberInput, Field, Button, Card, toast } from "march/ui"
import { shoppingBag } from "march/icons"

// manav siparişi: ürünler kiloyla; 0,5 kg adımla, en çok 10 kg (fazlası alandan çıkınca 10'a iner), toplam canlı
const items = [
  { name: "Domates", price: 34.9 },
  { name: "Salatalık", price: 29.5 },
  { name: "Çilek", price: 89 },
]
type Maybe<T> = T | null | undefined

export function GroceryOrder() {
  let $kg = [1.5, 1, 0]
  const setKg = (i: number) => (v: Maybe<number>) => { $kg = $kg.map((x, j) => (j === i ? v ?? 0 : x)) }
  const $total = items.reduce((sum, it, i) => sum + it.price * ($kg[i] ?? 0), 0)
  const order = () => toast(`Sipariş alındı: ₺${$total.toFixed(2)}`, { kind: "success" })
  return <Card title="Manav" subtitle="Bugün bahçeden">
    <div sx={{ flex: "col", gap: 2 }}>
      {items.map((it, i) => <Field label={`${it.name} · ₺${it.price.toFixed(2)} / kg`}>
        <NumberInput value={$kg[i]} onChange={setKg(i)} suffix="kg" decimals={1} step={0.5} min={0} max={10} locale="tr-TR" />
      </Field>)}
      <div sx={{ flex: ["row", "between", "center"] }}>
        <span sx={{ text: ["lg", "bold"] }}>Toplam ₺{$total.toFixed(2)}</span>
        <Button variant="primary" icon={shoppingBag} disabled={$total === 0} on:click={order}>Sipariş ver</Button>
      </div>
    </div>
  </Card>
}
