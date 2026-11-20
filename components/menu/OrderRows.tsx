import { Menu, Card, Badge, action, toast } from "march/ui"
import { more, edit, copy, truck, trash } from "march/icons"

// sipariş listesi: her satırın ⋯ menüsü aynı eylemleri o satırla (args) çalıştırır; silme bir action(): onay ister,
// bitince bildirim verir
interface Order { id: number; customer: string; total: string; shipped: boolean }

export function OrderRows() {
  let $orders: Order[] = [
    { id: 1042, customer: "Elif Arslan", total: "₺1.240", shipped: true },
    { id: 1043, customer: "Mert Kaya", total: "₺380", shipped: false },
    { id: 1044, customer: "Zeynep Demir", total: "₺2.015", shipped: false },
  ]
  const remove = action("Siparişi sil", (o: Order) => { $orders = $orders.filter((x) => x.id !== o.id) },
    { icon: trash, danger: true, confirm: "Sipariş silinsin mi?", success: "Sipariş silindi" })
  const ship = (o: Order) => { $orders = $orders.map((x) => (x.id === o.id ? { ...x, shipped: true } : x)); toast(`#${o.id} kargoya verildi`) }
  return <Card title="Son siparişler">
    <div sx={{ flex: "col", gap: 2 }}>
      {$orders.map((o) => <div sx={{ flex: ["row", "center", "between"], gap: 2, p: 2, radius: 2, shadow: 1 }}>
        <span sx={{ text: "bold" }}>{`#${o.id}`}</span>
        <span sx={{ flex: "grow" }}>{o.customer}</span>
        <Badge tone={o.shipped ? "success" : "warn"}>{o.shipped ? "Kargoda" : "Hazırlanıyor"}</Badge>
        <span sx={{ text: "mono" }}>{o.total}</span>
        <Menu label={`#${o.id} eylemleri`} icon={more} variant="ghost" size="sm" placement="bottom-end" args={[o]} items={[
          { label: "Düzenle", icon: edit, shortcut: "E", onSelect: (x: unknown) => toast(`#${(x as Order).id} düzenleniyor`) },
          { label: "Kopyasını oluştur", icon: copy, onSelect: () => toast("Kopya taslaklara eklendi") },
          { label: "Kargoya ver", icon: truck, disabled: o.shipped, onSelect: (x: unknown) => ship(x as Order) },
          "-", remove,
        ]} />
      </div>)}
    </div>
  </Card>
}
