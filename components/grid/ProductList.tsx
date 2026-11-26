// ProductList: the real-life Grid example.
//
// What it shows: a product list where the visitor picks 2, 3 or 4 columns. No column is narrower than 12rem (on a narrow
// box the grid uses fewer columns by itself), and `equal` makes every row as tall as its tallest card.
// When to use this pattern: a catalogue of cards with different amounts of text. `minCol` keeps cards readable, `equal`
// keeps rows tidy.
// Note: the Grid is inside a `{() => ...}` block so it is rebuilt when the column count changes.
import { Grid, Card, Button, Segmented } from "march/ui"

// The products; the keyboard note is longer on purpose, to show that `equal` evens out the row heights.
const products = [
  { name: "Kulaklık", price: 1290, note: "Gürültü engelleme" },
  { name: "Saat", price: 3490, note: "GPS ve nabız" },
  { name: "Hoparlör", price: 990, note: "Suya dayanıklı" },
  { name: "Klavye", price: 1590, note: "Mekanik, sessiz anahtarlar; arka ışıklı" },
  { name: "Fare", price: 590, note: "Kablosuz" },
]

export function ProductList() {
  // $cols is the chosen column count, $cart the number of items added.
  let $cols = 3
  let $cart = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Picks the column count; the options are text, so the value is converted with Number(). aria-label names the group. */}
    <Segmented aria-label="Sütun" value={String($cols)} options={["2", "3", "4"]} onChange={(v: string) => $cols = Number(v)} />
    {/* The Grid sits inside a `{() => ...}` block that runs again when $cols changes, so it is rebuilt with the new column count.
        - cols: the wanted number of columns. minCol="12rem": the narrowest a column may get; below that Grid uses fewer columns.
        - equal: every row is as tall as the tallest card. gap={3}: spacing between cells. */}
    {() => <Grid cols={$cols} minCol="12rem" equal gap={3}>
      {products.map((p) => <Card title={p.name} footer={<Button size="sm" on:click={() => $cart++}>{p.price} ₺ · Sepete ekle</Button>}>{p.note}</Card>)}
    </Grid>}
    <span sx={{ text: "sm", color: "muted" }}>Sepette {$cart} ürün</span>
  </div>
}
