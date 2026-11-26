// ContextMenuLab: the full-featured ContextMenu example; it uses every prop at least once.
//
// Props shown here: items (built from the target and the point), label, when, menuClass, class and children.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ContextMenuLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Button } from "march/ui"
import { ContextMenu } from "march/components/context-menu"

export function ContextMenuLab() {
  // The last chosen entry as text, so you can see what the menu did.
  let $last = "—"
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* The prop list, one by one:
        - class: added to the host around the children (the host adds no box of its own); menuClass: added to the
          floating menu panel, so you can style the menu itself.
        - label: the accessible name of the menu.
        - when: return false to keep the browser's own menu; here nothing inside `.lab-off` opens ours.
        - items: a function of the clicked element (target) and the pointer position (point). Entries: { label, shortcut
          (only a hint shown on the row), danger (destructive style), onSelect }; a "-" is a separator.
        - children: the area that answers the right-click. With the keyboard, Shift+F10 or the Menu key opens the menu
          at the focused element, so it never needs a pointer. */}
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
