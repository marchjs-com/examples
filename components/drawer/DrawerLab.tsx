import { Drawer, Button, Segmented, Toggle, ListRow, Badge } from "march/ui"
import { sparkles, bell, calendar, users, zap, star } from "march/icons"

// Drawer'ın özellikleri: open, onClose, side, size, modal, dragToClose, snapPoints, snap, onSnap, handle, handleLabel,
// closeButton, motion, title, target
// startOpen: önizlemede açık başlar; testler kapalı başlatıp düğmeyle açar
const NEWS = [
  { icon: sparkles, title: "Bugün iki yeni özellik yayında.", sub: "Karanlık tema ve hızlı arama", tag: "Yeni" },
  { icon: bell, title: "Bildirimler artık gruplanıyor", sub: "Aynı kişiden gelenler tek satırda" },
  { icon: calendar, title: "Takvim paylaşımı", sub: "Ekibinle tek dokunuşla paylaş" },
  { icon: users, title: "Ortak klasörler", sub: "Herkes aynı dosyada, aynı anda" },
  { icon: zap, title: "Daha hızlı açılış", sub: "İlk ekran yüzde 40 daha çabuk" },
  { icon: star, title: "Favoriler", sub: "Sık kullandıkların en üstte" },
]
type Side = "top" | "bottom" | "start" | "end"
type Size = "sm" | "md" | "lg" | "full"

export function DrawerLab(props: { startOpen?: boolean }) {
  let $open = props.startOpen ?? true
  let $side = "bottom" as Side
  let $size = "md" as Size
  let $modal = false
  let $snaps = true
  let $snap = 0
  let $drag = true
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center", "wrap"], gap: 2 }}>
      <Button variant="primary" on:click={() => $open = true}>Çekmeceyi aç</Button>
      {/* snap denetimli: değeri değişince çekmece o durma noktasına kayar */}
      <Button variant="secondary" disabled={!$snaps} on:click={() => { $snap = $snap === 0 ? 1 : 0; $open = true }}>Boyutu değiştir</Button>
      <Badge tone="neutral" class="lab-snap">Durma noktası {$snap}</Badge>
    </div>
    <div sx={{ flex: ["row", "center", "wrap"], gap: 3 }}>
      <Segmented aria-label="Kenar" size="sm" bind:value={$side}
        options={[{ value: "bottom", label: "Alt" }, { value: "top", label: "Üst" }, { value: "start", label: "Baş" }, { value: "end", label: "Son" }]} />
      <Segmented aria-label="Boyut" size="sm" bind:value={$size} disabled={$snaps}
        options={[{ value: "sm", label: "S" }, { value: "md", label: "M" }, { value: "lg", label: "L" }, { value: "full", label: "Tam" }]} />
      <Toggle label="Durma noktaları" bind:value={$snaps} />
      <Toggle label="Modal" bind:value={$modal} />
      <Toggle label="Sürükleyip kapat" bind:value={$drag} />
    </div>
    {() => {
      // bu satırda okunan durumlar değişince çekmece yeni haliyle yeniden kurulur (kenar, modal ve durma noktaları kurulurken okunur)
      const side = $side, size = $size, modal = $modal, snaps = $snaps, drag = $drag
      return <Drawer open={$open} onClose={() => $open = false} side={side} size={size} modal={modal} dragToClose={drag}
        snapPoints={snaps ? [0.35, 0.8] : undefined} snap={() => $snap} onSnap={(i: number) => $snap = i}
        handle handleLabel="Çekmeceyi sürükle" closeButton motion={{ duration: 200 }} title="Duyurular" class="lab-drawer">
        {NEWS.map((n) => <ListRow lead={n.icon} title={n.title} sub={n.sub} trail={n.tag ? <Badge tone="success">{n.tag}</Badge> : null} />)}
      </Drawer>
    }}
  </div>
}
