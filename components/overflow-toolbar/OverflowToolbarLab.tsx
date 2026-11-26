// OverflowToolbarLab: the full-featured OverflowToolbar example; it uses every prop at least once.
//
// OverflowToolbar is a toolbar that never wraps or squeezes: items that do not fit move into a "More" menu, lowest
// priority first, and come back (with a short slide-in) when there is room. Props shown here: items (id, label, icon,
// onSelect, pressed, disabled, shortcut, priority, showLabel, danger, separator), label, size, end, moreLabel, moreIcon,
// tooltips, motion (your own animation), class and the common prop m:color. An item can also be a command id (`command`):
// the Command manager then supplies its label, icon and shortcut; that needs a registered command, so it is not used here.
// Motion: the slide-in of a returning item runs on the motion engine (reduced motion, global speed, "Stop all");
// the `motion` prop picks "pop", "fade", "none" or a function with your own animation (second toolbar).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// OverflowToolbarLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { OverflowToolbar } from "march/ui"
import { animate } from "march/motion"
import { save, undo, redo, bold, italic, link, trash, menu, copy, download, send, image } from "march/icons"

export function OverflowToolbarLab() {
  // Reactive state: how often "save" was used, and the two toggle buttons.
  let $saved = 0
  let $bold = false
  let $italic = true
  // Your own animation for an item that comes back from the menu: it slides down from above. `animate` is the motion
  // engine's function, so reduced motion, global speed and "Stop all" still apply to it.
  const drop = (el: Element) => animate(el, [{ opacity: 0, transform: "translateY(-8px)" }, { opacity: 1, transform: "none" }], { duration: 260 })
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The first toolbar: the item options.
        - class / label / size / m:color: a class for CSS or tests, the accessible name (required), the button size, and
          the common colour token prop.
        - end: content after the items that never overflows (here a status text).
        - priority: the lowest number moves to "More" first, so "Sil" (0) goes before "Kaydet" (10).
        - showLabel: show the text next to the icon (otherwise the item is icon-only and the label is its name and tooltip).
        - shortcut="mod+z": shown in the tooltip and announced with aria-keyshortcuts.
        - pressed as a function: makes a toggle button (aria-pressed). disabled: the button cannot be used. danger: the
          danger tone.
        - { separator: true }: a divider; next to a hidden item it disappears. */}
    <OverflowToolbar class="lab-otb" label="Yazı araçları" size="md" m:color="brand-purple"
      end={<span sx={{ text: "sm", color: "muted" }}>{$saved ? `${$saved} kez kaydedildi` : "Taslak"}</span>} items={[
        { id: "save", label: "Kaydet", icon: save, showLabel: true, priority: 10, onSelect: () => $saved++ },
        { id: "undo", label: "Geri al", icon: undo, shortcut: "mod+z", priority: 9 },
        { id: "redo", label: "Yinele", icon: redo, showLabel: true, disabled: true, priority: 8 },
        { id: "s1", separator: true },
        { id: "bold", label: "Kalın", icon: bold, showLabel: true, priority: 7, pressed: () => $bold, onSelect: () => $bold = !$bold },
        { id: "italic", label: "İtalik", icon: italic, priority: 6, pressed: () => $italic, onSelect: () => $italic = !$italic },
        { id: "link", label: "Bağlantı", icon: link, priority: 3 },
        { id: "s2", separator: true },
        { id: "delete", label: "Sil", icon: trash, danger: true, showLabel: true, priority: 0 },
      ]} />
    {/* The second toolbar sits in a narrow grid cell (cols: 3 makes a three-column grid, the toolbar takes one), so its
        items do not fit and the "More" menu shows.
        - moreLabel / moreIcon: the name and the icon of the "More" button (the defaults are "More actions" and three dots).
        - tooltips={false}: no tooltips on icon-only buttons (they keep their accessible names).
        - motion={drop}: the function above replaces the default slide-in. */}
    <div sx={{ cols: 3 }}>
      <OverflowToolbar class="lab-narrow" label="Dar çubuk" moreLabel="Diğer araçlar" moreIcon={menu} tooltips={false} motion={drop} items={[
        { id: "copy", label: "Kopyala", icon: copy, showLabel: true, priority: 5 },
        { id: "download", label: "İndir", icon: download, showLabel: true, priority: 4 },
        { id: "send", label: "Gönder", icon: send, showLabel: true, priority: 3 },
        { id: "image", label: "Görsel ekle", icon: image, showLabel: true, priority: 2 },
        { id: "remove", label: "Kaldır", icon: trash, danger: true, showLabel: true, priority: 1 },
      ]} />
    </div>
  </div>
}
