import { OverlayScope, Button, openDrawer, openDialog } from "march/ui"

// OverlayScope'un özellikleri: class (sabit ya da canlı), içerik; içinde açılan katman kutuda kalır, target: "page"
// sayfaya çıkarır
export function OverlayScopeLab() {
  let $dark = false
  return <OverlayScope class={() => ($dark ? "lab-scope lab-dark" : "lab-scope")}>
    <Button size="sm" on:click={() => $dark = !$dark}>Sınıfı değiştir</Button>
    <Button size="sm" on:click={() => openDrawer(() => <p>Kutudaki çekmece</p>, { title: "Çekmece" })}>Kutuda aç</Button>
    <Button size="sm" on:click={() => openDialog(() => <p>Bütün sayfa</p>, { title: "Sayfa", target: "page" })}>Sayfada aç</Button>
  </OverlayScope>
}
