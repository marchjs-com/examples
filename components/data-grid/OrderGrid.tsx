import { DataGrid } from "march/components/data-grid"
import { Card } from "march/ui"

// bir mağazanın sipariş paneli: 5 000 sipariş, bölgeye göre gruplu, adet hücresi düzenlenir, seçim sayılır
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
  const save = (row: Order, key: string, value: unknown) => {
    $orders = $orders.map((o) => (o.id === row.id ? { ...o, [key]: Number(value) } : o))
    $last = `#${row.id} güncellendi: ${key} = ${String(value)}`
  }
  return <Card title="Siparişler" subtitle={() => $last}>
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
