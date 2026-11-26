// SettingsMenu: the creative-minimal ListRow example.
//
// What it shows: a settings menu built only from ListRow: link rows (href) with a chevron, a row with an unread badge,
// a row with a keyboard shortcut at its end, a row with its own delete action beside it, and a disabled section.
// When to use this pattern: menus, sidebars and settings lists. One component makes every row; what a row does depends
// on the props: `href` makes it a link, `onClick` a button, neither a plain row.
//
// Accessibility: the nav has an aria-label; link rows are real <a> and click rows real <button>. Controls in `actions`
// are placed beside the row, never inside it, so a button is never nested in a button. A disabled row does nothing
// when clicked.
import { ListRow, Badge, Chevron, Kbd, IconButton, toast } from "march/ui"
import { user, bell, lock, trash } from "march/icons"

export function SettingsMenu() {
  // The number of unread notifications, a signal read by the badge.
  let $unread = 4
  return <nav aria-label="Ayarlar" sx={{ flex: "col" }}>
    {/* lead: an icon; title and sub: the two text lines; href makes it a link; trail: what sits at the end (here a
        chevron). */}
    <ListRow lead={user} title="Profil" sub="Ad, fotoğraf, biyografi" href="#profil" trail={<Chevron />} />
    {/* A Badge in `trail` shows the count (a function, so it follows $unread); onClick makes this row a button that
        clears the count and shows a toast. */}
    <ListRow lead={bell} title="Bildirimler" trail={<Badge count={() => $unread} />} onClick={() => { $unread = 0; toast("Hepsi okundu") }} />
    {/* A Kbd in `trail` advertises the shortcut. */}
    <ListRow lead={lock} title="Gizlilik" sub="Kimler görebilir" trail={<Kbd keys="mod+p" />} onClick={() => toast("Gizlilik açıldı")} />
    {/* lead can be an emoji. `actions` places a control beside the row (an icon button with a label, since it has no
        visible text); the row itself has no onClick, so it is a plain row. */}
    <ListRow lead="🗂️" title="Eski oturumlar" sub="3 cihaz" actions={<IconButton icon={trash} label="Oturumları kapat" size="sm" variant="danger" on:click={() => toast("Oturumlar kapatıldı")} />} />
    {/* disabled: the row looks off and its click does nothing (the toast text is a reminder that it must not open). */}
    <ListRow lead="💳" title="Ödeme yöntemleri" sub="Yakında" disabled onClick={() => toast("açılmamalı")} />
  </nav>
}
