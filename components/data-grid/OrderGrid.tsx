// OrderGrid: the real-life DataGrid example.
//
// What it shows: the order panel of a shop. 5 000 orders, grouped by region, with an editable quantity cell, a computed
// total column. The grid windows rows and columns (only the visible cells are in the DOM),
// so this size scrolls smoothly; the data would stay just as fast with many more rows.
// When to use this pattern: any admin list where people sort, filter, group, edit single cells and export.
// Keyboard: arrows move the cell cursor, Enter / F2 / typing edits, Escape cancels, Ctrl+A selects all rows.
import { DataGrid } from "march/components/data-grid"
import { Card } from "march/ui"

// Fake data: generated once from simple arithmetic so the example needs no server. In a real app `rows` is your own
// array, signal or getter (for server data pass a createTable() through `table` instead).
const REGIONS = ["Marmara", "Ege", "Akdeniz", "Karadeniz"]
const PRODUCTS = ["Defter", "Kalem", "Çanta", "Lamba", "Klavye"]
type Order = { id: number; customer: string; region: string; product: string; qty: number; price: number }
const make = (): Order[] => Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1, customer: `Müşteri ${1 + ((i * 37) % 400)}`, region: REGIONS[i % REGIONS.length]!,
  product: PRODUCTS[(i * 7) % PRODUCTS.length]!, qty: 1 + ((i * 13) % 20), price: 20 + ((i * 53) % 480),
}))

export function OrderGrid() {
  let $orders = make()
  let $last = "Bir Adet hücresine çift tıklayıp düzenleyin"
  // onEdit handler: the grid hands over the row, the column key and the new value (as text). We write it into the list
  // (a new array, so the grid sees the change) and show it in the card's subtitle. Throwing here would show the error
  // message on the cell, which is how you reject a save.
  const save = (row: Order, key: string, value: unknown) => {
    $orders = $orders.map((o) => (o.id === row.id ? { ...o, [key]: Number(value) } : o))
    $last = `#${row.id} güncellendi: ${key} = ${String(value)}`
  }
  return <Card title="Siparişler" subtitle={() => $last}>
    {/* The Card's subtitle is a getter, so it follows $last. The DataGrid:
            - rowKey="id": the field that identifies a row (it is also the default).
            - selectable: checkboxes plus Space, Shift+arrows, Ctrl+click and Ctrl+A.
            - groupBy={["region"]}: starts grouped by region; group rows show aggregates and can be opened / closed with
              click, Enter or the arrow keys. Users can regroup from the column menu or the toolbar.
            - labels: Turkish texts for the search box, the row count and the totals row.
            - Columns: filter "text" / "select" add a filter control per column (options lists the choices);
              `editable` + `validate` makes Adet editable, and validate returns an error text (or null when valid), which
              the cell shows instead of saving; `aggregate: "sum"` fills the footer and the group rows;
              Tutar has no field of its own: value(row) computes it and format ["money", "TRY"] writes it as currency. */}
    <DataGrid label="Siparişler" rows={() => $orders} rowKey="id" height={420} selectable groupBy={["region"]} filename="siparisler"
      labels={{ search: "Sipariş ara", rows: (n: string) => `${n} sipariş`, total: "Genel toplam" }}
      onEdit={save}
      columns={[
        { key: "id", label: "No", width: 80, type: "number" },
        { key: "customer", label: "Müşteri", width: 160, filter: "text" },
        { key: "region", label: "Bölge", width: 130, filter: "select", options: REGIONS },
        { key: "product", label: "Ürün", width: 130, filter: "select", options: PRODUCTS },
        { key: "qty", label: "Adet", width: 100, type: "number", editable: true, aggregate: "sum",
          validate: (v: unknown) => (Number(v) > 0 ? null : "En az 1") },
        { key: "total", label: "Tutar", width: 140, value: (r: Order) => r.qty * r.price, format: ["money", "TRY"], aggregate: "sum" },
      ]} />
  </Card>
}
