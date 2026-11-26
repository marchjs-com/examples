// OrderRows: the real-life Menu example.
//
// What it shows: a list of recent orders where each row has its own "..." menu. All the menus run the same actions, but
// on their own row: Edit, Duplicate, Ship (disabled once shipped) and Delete (with a confirmation and a success message).
// When to use this pattern: row actions in lists and tables. `args` hands the row to every action, so you write the actions
// once and the menu of each row points them at its own data. `action()` bundles a label, an icon and behaviour (a confirm
// question, a success toast) into one reusable entry.
//
// Keyboard: the trigger has aria-haspopup, aria-expanded and aria-controls; the arrow keys move between entries, Enter
// activates, Esc closes and returns focus to the trigger. Animation: none of its own.
import { Menu, Card, Badge, action, toast } from "march/ui"
import { more, edit, copy, truck, trash } from "march/icons"

// What we keep of an order.
interface Order { id: number; customer: string; total: string; shipped: boolean }

export function OrderRows() {
  // The orders, a signal. Changing it (always with a new array) redraws the rows.
  let $orders: Order[] = [
    { id: 1042, customer: "Elif Arslan", total: "₺1.240", shipped: true },
    { id: 1043, customer: "Mert Kaya", total: "₺380", shipped: false },
    { id: 1044, customer: "Zeynep Demir", total: "₺2.015", shipped: false },
  ]
  // A reusable action. It is called with the menu's `args` (the row's order). The options: an icon, `danger` (styles the
  // entry as destructive), `confirm` (asks the question before running) and `success` (the message shown after it worked).
  const remove = action("Siparişi sil", (o: Order) => { $orders = $orders.filter((x) => x.id !== o.id) },
    { icon: trash, danger: true, confirm: "Sipariş silinsin mi?", success: "Sipariş silindi" })
  // Marks an order as shipped (a new array again) and says so in a toast.
  const ship = (o: Order) => { $orders = $orders.map((x) => (x.id === o.id ? { ...x, shipped: true } : x)); toast(`#${o.id} kargoya verildi`) }
  return <Card title="Son siparişler">
    <div sx={{ flex: "col", gap: 2 }}>
      {$orders.map((o) => <div sx={{ flex: ["row", "center", "between"], gap: 2, p: 2, radius: 2, shadow: 1 }}>
        <span sx={{ text: "bold" }}>{`#${o.id}`}</span>
        <span sx={{ flex: "grow" }}>{o.customer}</span>
        <Badge tone={o.shipped ? "success" : "warn"}>{o.shipped ? "Kargoda" : "Hazırlanıyor"}</Badge>
        <span sx={{ text: "mono" }}>{o.total}</span>
        {/* The row menu:
            - label: the trigger's accessible name, which includes the order number so each menu is distinct for screen
              readers. icon={more}: an icon-only trigger. variant="ghost" size="sm": a quiet, small button.
            - placement="bottom-end": the panel opens below the trigger, aligned to its end edge.
            - args={[o]}: this row's order, passed to every action and onSelect (which is why the handlers receive `x`).
            - items: plain entries ({ label, icon, shortcut, disabled, onSelect }), a separator ("-") and the shared
              `remove` action. disabled: o.shipped locks "Ship" once the order has shipped. */}
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
