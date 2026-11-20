import { Accordion } from "march/ui"
import { Icon, user, bell, lock, plus, minus } from "march/icons"

// Accordion'un bütün özellikleri: items (id, title, subtitle, icon, content, disabled), multiple, open, variant,
// chevron (kendi işaretin, işlev ya da yok), animated, onToggle, class ve m:color
export function AccordionLab() {
  let $log = "henüz yok"
  const items = [
    { id: "profil", title: "Profil", subtitle: "Ad, fotoğraf", icon: user, content: "Adınızı ve fotoğrafınızı değiştirin." },
    { id: "bildirim", title: "Bildirimler", subtitle: "E-posta, anlık", icon: bell, content: "Hangi olaylarda haber verilsin?" },
    { id: "guvenlik", title: "Güvenlik", icon: lock, content: "İki adımlı doğrulama", disabled: true },
  ]
  return <div sx={{ flex: "col", gap: 4 }}>
    <Accordion items={items} multiple open={["profil", "bildirim"]} variant="contained" class="lab-acc"
      chevron={(open: () => boolean) => <span>{() => <Icon of={open() ? minus : plus} />}</span>}
      onToggle={(k: string | number, open: boolean) => $log = `${k} ${open ? "açıldı" : "kapandı"}`} />
    <span sx={{ text: "sm", color: "muted" }}>Son olay: {$log}</span>
    <Accordion items={items.slice(0, 2)} chevron={false} animated={false} m:color="brand-purple" />
  </div>
}
