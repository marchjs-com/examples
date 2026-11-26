// MenuLab: the full-featured Menu and Dropdown example; it uses every prop at least once.
//
// Menu props shown here: items (plain entries with icon, shortcut, disabled, hidden, danger, href, sub, current, checked
// and radio; "-" for a separator; and action() objects), args, label, icon (an icon-only trigger), trigger (your own
// trigger content), variant, size, class, panelClass, placement, disabled and the common prop m:color.
// Dropdown: the same trigger, but the panel holds any content you give it, and that content can be a function of `close`.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// MenuLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Keyboard: the trigger has aria-haspopup, aria-expanded and aria-controls; the arrow keys open it and move between
// entries, Enter activates, Esc closes and returns focus to the trigger, and Tab leaves it. Entries are role="menuitem"
// (menuitemcheckbox / menuitemradio with aria-checked for checked entries).
import { Menu, Dropdown, Chip, Avatar, action, Button } from "march/ui"
import { edit, copy, trash, more, settings, helpCircle, filter, star } from "march/icons"

export function MenuLab() {
  // Signals: the last choice, the sort order, whether hidden files are shown, whether the "locked" menu is locked, and
  // the set of chosen tags.
  let $last = "henüz yok"
  let $sort = "Ad"
  let $hidden = false
  let $locked = false
  let $tags = new Set(["Tasarım"])
  // The data the first menu works on: its `args` pass this to every action and onSelect.
  const file = { name: "rapor.pdf" }
  // action(label, run, options): a reusable entry. It runs with the menu's args (here the file). `danger` styles it as
  // destructive.
  const remove = action("Sil", (f: { name: string }) => { $last = `${f.name} silindi` }, { icon: trash, danger: true })
  // A small helper that builds an onSelect which records what was chosen.
  const pick = (what: string) => () => { $last = what }
  // Adds or removes a tag from the set (a new Set each time, so the signal notices).
  const tag = (t: string) => { const n = new Set($tags); if (n.has(t)) n.delete(t); else n.add(t); $tags = n }
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* Menu 1, the plain entries:
          - label: the trigger's text and accessible name. class: added to the trigger; panelClass: added to the panel.
          - args: passed to actions and onSelect (here the file).
          - Entries: icon, shortcut (shown with Kbd styling; "mod" is written as the platform's modifier), disabled (shown
            but not selectable), hidden (not drawn at all), "-" (a separator) and the `remove` action. */}
      <Menu label="Dosya" class="lab-file" panelClass="lab-file-panel" args={[file]} items={[
        { label: "Yeniden adlandır", icon: edit, shortcut: "F2", onSelect: pick("Yeniden adlandır") },
        { label: "Kopyala", icon: copy, shortcut: "mod+c", onSelect: pick("Kopyala") },
        { label: "Arşivle", disabled: true },
        { label: "Gizli öğe", hidden: true },
        "-", remove,
      ]} />
      {/* Menu 2, choices: radio: true makes the sort entries a radio group, and `checked` (a function) says which one is
          on. A plain entry with `checked` (no radio) is a checkbox item. onSelect changes the state; the menu closes
          after a choice. variant="primary": a filled trigger. m:color: the colour token of the trigger. */}
      <Menu label="Sırala" variant="primary" m:color="brand-purple" items={[
        ...["Ad", "Tarih", "Boyut"].map((k) => ({ label: k, radio: true, checked: () => $sort === k, onSelect: () => { $sort = k } })),
        "-", { label: "Gizli dosyaları göster", checked: () => $hidden, onSelect: () => { $hidden = !$hidden } },
      ]} />
      {/* Menu 3, where the user is: `current: true` tints the entry of the current place, `sub` adds a quieter second
          line, and `href` makes an entry a link. variant="ghost", size="sm": a quiet, small trigger. placement: which side
          of the trigger the panel opens on ("bottom-end": below, aligned to the end edge; it flips if there is no room). */}
      <Menu label="Bölümler" variant="ghost" size="sm" placement="bottom-end" items={[
        { label: "Formlar", sub: "Alanlar ve seçiciler", current: true, onSelect: pick("Formlar") },
        { label: "Tablolar", sub: "Sıralama ve süzme", onSelect: pick("Tablolar") },
        { label: "Yardım", icon: helpCircle, href: "#yardim" },
      ]} />
      {/* Menu 4: icon with size="lg" gives an icon-only trigger; label stays as its accessible name. */}
      <Menu label="Daha fazla" icon={more} size="lg" items={[{ label: "Ayarlar", icon: settings, onSelect: pick("Ayarlar") }]} />
      {/* Menu 5: trigger replaces the trigger's content with your own node (an avatar and a name). */}
      <Menu label="Hesap" trigger={<><Avatar name="Elif Arslan" size="xs" /> Elif</>} items={[{ label: "Profil", onSelect: pick("Profil") }, { label: "Çıkış", danger: true, onSelect: pick("Çıkış") }]} />
      {/* Menu 6: disabled is a function here, so the button after it can lock and unlock the trigger. */}
      <Menu label="Kilitli" disabled={$locked} items={[{ label: "Aç", onSelect: pick("Aç") }]} />
      <Button on:click={() => $locked = !$locked}>{$locked ? "Kilidi kaldır" : "Kilitle"}</Button>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      {/* Dropdown 1: the same trigger as Menu (label, icon, m:color), but the panel holds any content. Its children are a
          function that receives `close`, so a button inside can close the panel (the "Tamam" button does). */}
      <Dropdown label="Etiketler" icon={filter} m:color="brand-green">
        {(close: () => void) => <div sx={{ flex: "col", gap: 2 }}>
          <div sx={{ flex: ["row", "wrap"], gap: 1 }}>{["Tasarım", "Ürün", "Pazarlama"].map((t) => <Chip selected={$tags.has(t)} onClick={() => tag(t)}>{t}</Chip>)}</div>
          <Button on:click={() => close()}>Tamam</Button>
        </div>}
      </Dropdown>
      {/* Dropdown 2: plain children, with variant and placement ("top-start": the panel opens above the trigger). */}
      <Dropdown label="Yıldızlılar" variant="secondary" placement="top-start"><Chip icon={star}>3 yıldızlı belge</Chip></Dropdown>
    </div>
    {/* The line that shows the state the menus changed. */}
    <p sx={{ text: "sm", color: "muted" }}>{`Seçilen: ${$last} · Sıra: ${$sort} · Gizliler: ${$hidden ? "açık" : "kapalı"} · Etiketler: ${[...$tags].join(", ") || "yok"}`}</p>
  </div>
}
