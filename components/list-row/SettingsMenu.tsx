import { ListRow, Badge, Chevron, Kbd, IconButton, toast } from "march/ui"
import { user, bell, lock, trash } from "march/icons"

// bir ayarlar menüsü: bağlantı satırları (href), rozetli bildirim, kısayollu satır, yanında silme eylemi olan satır,
// ve devre dışı bir bölüm
export function SettingsMenu() {
  let $unread = 4
  return <nav aria-label="Ayarlar" sx={{ flex: "col" }}>
    <ListRow lead={user} title="Profil" sub="Ad, fotoğraf, biyografi" href="#profil" trail={<Chevron />} />
    <ListRow lead={bell} title="Bildirimler" trail={<Badge count={() => $unread} />} onClick={() => { $unread = 0; toast("Hepsi okundu") }} />
    <ListRow lead={lock} title="Gizlilik" sub="Kimler görebilir" trail={<Kbd keys="mod+p" />} onClick={() => toast("Gizlilik açıldı")} />
    <ListRow lead="🗂️" title="Eski oturumlar" sub="3 cihaz" actions={<IconButton icon={trash} label="Oturumları kapat" size="sm" variant="danger" on:click={() => toast("Oturumlar kapatıldı")} />} />
    <ListRow lead="💳" title="Ödeme yöntemleri" sub="Yakında" disabled onClick={() => toast("açılmamalı")} />
  </nav>
}
