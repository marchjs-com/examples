import { Grid, Card, Button, Segmented } from "march/ui"

// ürün listesi: sütun sayısı seçilir, en dar sütun 12rem (dar kutuda kendiliğinden azalır), satırlar eşit boyda
const products = [
  { name: "Kulaklık", price: 1290, note: "Gürültü engelleme" },
  { name: "Saat", price: 3490, note: "GPS ve nabız" },
  { name: "Hoparlör", price: 990, note: "Suya dayanıklı" },
  { name: "Klavye", price: 1590, note: "Mekanik, sessiz anahtarlar; arka ışıklı" },
  { name: "Fare", price: 590, note: "Kablosuz" },
]

export function ProductList() {
  let $cols = 3
  let $cart = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Segmented aria-label="Sütun" value={String($cols)} options={["2", "3", "4"]} onChange={(v: string) => $cols = Number(v)} />
    {() => <Grid cols={$cols} minCol="12rem" equal gap={3}>
      {products.map((p) => <Card title={p.name} footer={<Button size="sm" on:click={() => $cart++}>{p.price} ₺ · Sepete ekle</Button>}>{p.note}</Card>)}
    </Grid>}
    <span sx={{ text: "sm", color: "muted" }}>Sepette {$cart} ürün</span>
  </div>
}
