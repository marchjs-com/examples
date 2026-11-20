import { OverlayScope, Button, openDrawer } from "march/ui"

// telefon taslağı: çekmece ekranın içinde açılır, sayfayı örtmez
export function PhoneMock() {
  return <OverlayScope class="m-card" sx={{ p: 3, w: "sm" }}>
    <div sx={{ flex: "col", gap: 2 }}>
      <strong>HADİ</strong>
      <Button size="sm" on:click={() => openDrawer(() => <p sx={{ p: 3 }}>Telefonun içindeki menü</p>, { title: "Menü", side: "bottom" })}>Menüyü aç</Button>
    </div>
  </OverlayScope>
}
