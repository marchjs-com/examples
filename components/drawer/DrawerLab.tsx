// DrawerLab: the full-featured Drawer example; it uses every prop at least once.
//
// Props shown here: open, onClose, side, size, modal, dragToClose, snapPoints, snap, onSnap, handle, handleLabel,
// closeButton, motion, title (`target` is described in the docs; the default, the nearest scope, is used here).
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// DrawerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Drawer, Button, Segmented, Toggle, ListRow, Badge } from "march/ui"
import { sparkles, bell, calendar, users, zap, star } from "march/icons"

// The drawer's content: rows of a news list.
const NEWS = [
  { icon: sparkles, title: "Bugün iki yeni özellik yayında.", sub: "Karanlık tema ve hızlı arama", tag: "Yeni" },
  { icon: bell, title: "Bildirimler artık gruplanıyor", sub: "Aynı kişiden gelenler tek satırda" },
  { icon: calendar, title: "Takvim paylaşımı", sub: "Ekibinle tek dokunuşla paylaş" },
  { icon: users, title: "Ortak klasörler", sub: "Herkes aynı dosyada, aynı anda" },
  { icon: zap, title: "Daha hızlı açılış", sub: "İlk ekran yüzde 40 daha çabuk" },
  { icon: star, title: "Favoriler", sub: "Sık kullandıkların en üstte" },
]
// The four sides (start / end follow the reading direction, so they mirror in right-to-left layouts) and the sizes.
type Side = "top" | "bottom" | "start" | "end"
type Size = "sm" | "md" | "lg" | "full"

// startOpen: in the preview the drawer starts open; the tests start it closed and open it with the button.
export function DrawerLab(props: { startOpen?: boolean }) {
  // One signal per option the controls change: side, size, modal, snap points on / off, the snap index and dragToClose.
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
      {/* snap is controlled: changing its value moves the drawer to that stop (an index into snapPoints). */}
      <Button variant="secondary" disabled={!$snaps} on:click={() => { $snap = $snap === 0 ? 1 : 0; $open = true }}>Boyutu değiştir</Button>
      <Badge tone="neutral" class="lab-snap">Durma noktası {$snap}</Badge>
    </div>
    <div sx={{ flex: ["row", "center", "wrap"], gap: 3 }}>
      {/* Controls for the options: side, size (only used without snap points), snap points, modal and dragToClose. */}
      <Segmented aria-label="Kenar" size="sm" bind:value={$side}
        options={[{ value: "bottom", label: "Alt" }, { value: "top", label: "Üst" }, { value: "start", label: "Baş" }, { value: "end", label: "Son" }]} />
      <Segmented aria-label="Boyut" size="sm" bind:value={$size} disabled={$snaps}
        options={[{ value: "sm", label: "S" }, { value: "md", label: "M" }, { value: "lg", label: "L" }, { value: "full", label: "Tam" }]} />
      <Toggle label="Durma noktaları" bind:value={$snaps} />
      <Toggle label="Modal" bind:value={$modal} />
      <Toggle label="Sürükleyip kapat" bind:value={$drag} />
    </div>
    {() => {
      // side, modal and snapPoints are read when the drawer opens, so the drawer is rebuilt whenever one of these signals changes
      // (this function re-runs, and it re-reads them). open / snap are passed as signals and stay live.
      const side = $side, size = $size, modal = $modal, snaps = $snaps, drag = $drag
      // The Drawer:
      //   open + onClose: shown while open is true; onClose runs on Escape, the scrim, the close button or a drag past the edge,
      //     and we set $open to false there.
      //   side: the edge; size: sm, md, lg or full (without snap points it is the largest size).
      //   modal: true adds a scrim, a focus trap and locks the page; false leaves the page usable.
      //   dragToClose: drag toward the edge to close it.
      //   snapPoints: resting heights as fractions of the viewport (0.35 and 0.8 here); snap / onSnap: the current index, kept
      //     in $snap, so the drawer and the button agree. The grab handle steps through the points with Enter or Space.
      //   handle / handleLabel: the grab handle and its accessible name; closeButton: the x in the head.
      //   motion: an object sets your own timing ({ duration } in ms); false makes it appear at once. The engine honours
      //     reduced motion, so the panel appears at once for people who ask for that.
      //   title: the heading, which also names the dialog; class: a class on the drawer.
      return <Drawer open={$open} onClose={() => $open = false} side={side} size={size} modal={modal} dragToClose={drag}
        snapPoints={snaps ? [0.35, 0.8] : undefined} snap={() => $snap} onSnap={(i: number) => $snap = i}
        handle handleLabel="Çekmeceyi sürükle" closeButton motion={{ duration: 200 }} title="Duyurular" class="lab-drawer">
        {NEWS.map((n) => <ListRow lead={n.icon} title={n.title} sub={n.sub} trail={n.tag ? <Badge tone="success">{n.tag}</Badge> : null} />)}
      </Drawer>
    }}
  </div>
}
