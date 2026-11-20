import { Button } from "march/ui"
import { ContextMenu } from "march/components/context-menu"

// ContextMenu'nün bütün özellikleri: items (hedefe ve noktaya göre), label, when, menuClass, class ve children
export function ContextMenuLab() {
  let $last = "—"
  return <div sx={{ flex: "col", gap: 2 }}>
    <ContextMenu class="lab-area" menuClass="lab-menu" label="Lab menüsü"
      when={(t: Element) => !t.closest(".lab-off")}
      items={(target: Element, point: { x: number; y: number }) => [
        { label: "Hedefi yaz", shortcut: "Enter", onSelect: () => { $last = `hedef: ${target.textContent} @${Math.round(point.x)},${Math.round(point.y)}` } },
        "-",
        { label: "Kaldır", danger: true, onSelect: () => { $last = "kaldırıldı" } },
      ]}>
      <div sx={{ flex: "row", gap: 2 }}>
        <Button class="lab-on">Açılır</Button>
        <Button class="lab-off">Tarayıcı menüsü</Button>
      </div>
    </ContextMenu>
    <span class="lab-last">{$last}</span>
  </div>
}
