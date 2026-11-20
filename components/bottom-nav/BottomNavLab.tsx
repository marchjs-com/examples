import { BottomNav, OverlayScope, Button, Badge } from "march/ui"
import { home, compass, calendar, bell, user, sparkles, image, film, radio, barChart } from "march/icons"

// BottomNav'ın bütün özellikleri: sekmeler (etkin ikon, sayı rozeti, nokta, renk, bağlantı), değer ve onChange, Oluştur
// düğmesi (onCreate, kendi ikonu, adı, halka renkleri), Oluştur menüsü (görünüm, başlık, tutamak, onAction), baloncuk,
// hareket, etiketler, görünüm, renk tonu, erişilebilir ad ve sınıf; üstteki düğmeler canlı olanları değiştirir
const LOOKS = ["fan", "stack", "sheet"] as const

export function BottomNavLab() {
  let $tab = "home"
  let $alerts = 120
  let $look = 0
  let $flat = false
  let $quiet = false
  let $log = "-"
  return <OverlayScope sx={{ flex: "col", gap: 3, p: 2 }}>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>
      <Button size="sm" variant="ghost" on:click={() => $look = ($look + 1) % LOOKS.length}>{`Menü: ${LOOKS[$look]}`}</Button>
      <Button size="sm" variant="ghost" on:click={() => $flat = !$flat}>{$flat ? "Yüzen" : "Düz"}</Button>
      <Button size="sm" variant="ghost" on:click={() => $quiet = !$quiet}>{$quiet ? "Sesli" : "Sade"}</Button>
      <Badge tone="primary">{`Sekme: ${$tab}`}</Badge>
      <span sx={{ text: "xs", color: "muted" }}>{$log}</span>
    </div>
    <BottomNav class="lab-bnav" label="Laboratuvar sekmeleri" value={() => $tab} onChange={(id) => { $tab = id; if (id === "alerts") $alerts = 0 }}
      onCreate={() => $log = "onCreate (uzun basış)"} createLabel="Yeni ekle" createIcon={sparkles} ring={["brand-pink", "brand-gold", "#22c55e"]}
      createActions={[
        { id: "post", label: "Gönderi", icon: image, desc: "Fotoğraf ya da yazı", color: "brand-orange" },
        { id: "story", label: "Hikâye", icon: film, badge: "yeni" },
        { id: "live", label: "Canlı", icon: radio, disabled: true },
        { id: "poll", label: "Anket", icon: barChart, run: () => $log = "anketin kendi run'ı" },
      ]}
      createMenu={() => LOOKS[$look]} createTitle="Ne paylaşalım?" createHandle={false} onAction={(id) => $log = `onAction: ${id}`}
      bubble={() => !$quiet} motion={() => !$quiet} labels={() => !$quiet} variant={() => ($flat ? "flat" : "floating")} tint={() => ($quiet ? "accent" : "brand")}
      items={[
        { id: "home", label: "Akış", icon: home, color: "brand-blue" },
        { id: "explore", label: "Keşfet", icon: compass, activeIcon: sparkles },
        { id: "events", label: "Takvim", icon: calendar, href: "#takvim" },
        { id: "alerts", label: "Bildirimler", icon: bell, badge: () => $alerts },
        { id: "me", label: "Profil", icon: user, dot: true, color: "brand-purple" },
      ]} />
  </OverlayScope>
}
