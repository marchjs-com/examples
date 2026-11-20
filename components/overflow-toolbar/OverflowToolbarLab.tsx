import { OverflowToolbar } from "march/ui"
import { animate } from "march/motion"
import { save, undo, redo, bold, italic, link, trash, menu, copy, download, send, image } from "march/icons"

// OverflowToolbar'ın bütün özellikleri: items (id, label, icon, onSelect, pressed, disabled, shortcut, priority,
// showLabel, danger, separator), label, size, end, moreLabel, moreIcon, tooltips, motion (kendi animasyonun), class
// ve ortak m:color. Komutlu öğe (command) için Command yöneticisine bir komut kaydı gerekir; burada yok.
export function OverflowToolbarLab() {
  let $saved = 0
  let $bold = false
  let $italic = true
  // yukarıdan süzülerek geri gelen öğe
  const drop = (el: Element) => animate(el, [{ opacity: 0, transform: "translateY(-8px)" }, { opacity: 1, transform: "none" }], { duration: 260 })
  return <div sx={{ flex: "col", gap: 3 }}>
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
