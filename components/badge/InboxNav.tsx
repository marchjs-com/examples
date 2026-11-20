import { Badge, IconButton, Button } from "march/ui"
import { mail, bell, inbox } from "march/icons"

// bir uygulama menüsü: okunmamış sayılar, köşede mini rozet, 99'u aşınca 99+, 0'da gizlenir; durum rozeti canlı
export function InboxNav() {
  let $mail = 12
  let $alerts = 120
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center"], gap: 3 }}>
      <span sx={{ flex: ["row", "center"], gap: 1 }}>Gelen kutusu <Badge count={() => $mail} label="okunmamış" /></span>
      <IconButton icon={bell} label="Bildirimler" on:click={() => $alerts = 0}>
        <Badge size="xs" variant="solid" count={() => $alerts} />
      </IconButton>
      <Badge tone="success" dot pulse>Çevrim içi</Badge>
    </div>
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" icon={inbox} on:click={() => $mail = 0}>Hepsini okundu say</Button>
      <Button size="sm" icon={mail} on:click={() => $mail++}>Yeni e-posta</Button>
    </div>
  </div>
}
