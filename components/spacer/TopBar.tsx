import { Spacer, Button, Badge } from "march/ui"

// uygulama üst çubuğu: logo ve taslak rozeti başta, eylemler sonda; düğme yazı yönünü çevirir
export function TopBar() {
  let $rtl = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <div dir={$rtl ? "rtl" : "ltr"} sx={{ flex: ["row", "center"], gap: 2 }}>
      <strong>HADİ</strong>
      <Badge>Taslak</Badge>
      <Spacer />
      <Button size="sm">Paylaş</Button>
      <Button size="sm" variant="primary">Yayınla</Button>
    </div>
    <Button size="sm" variant="ghost" on:click={() => $rtl = !$rtl}>{$rtl ? "Soldan sağa" : "Sağdan sola"}</Button>
  </div>
}
