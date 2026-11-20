import { Checkbox, Card, Button, toast } from "march/ui"
import { bell, mail, message, megaphone } from "march/icons"

// profil ayarları: bildirim kanalları (toggle), üstte "tümü" kutusu kısmi durumu gösterir, en altta kaydet
const channels = [
  { id: "push", label: "Anlık bildirimler", hint: "Telefonda ve tarayıcıda", icon: bell },
  { id: "mail", label: "E-posta özeti", hint: "Her pazartesi sabahı", icon: mail },
  { id: "dm", label: "Doğrudan mesajlar", hint: "Biri sana yazınca", icon: message },
  { id: "news", label: "Duyurular", hint: "Yeni özellikler ve kampanyalar", icon: megaphone },
]

export function NotificationSettings() {
  let $on = ["push", "dm"]
  const set = (id: string, v: boolean) => $on = v ? [...$on, id] : $on.filter((x) => x !== id)
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      <Checkbox label="Bütün bildirimler" size="lg" value={$on.length === channels.length}
        indeterminate={$on.length > 0 && $on.length < channels.length} onChange={(v: boolean) => $on = v ? channels.map((c) => c.id) : []} />
      {channels.map((c) => <Checkbox variant="card" icon={c.icon} label={c.label} hint={c.hint}
        value={$on.includes(c.id)} onChange={(v: boolean) => set(c.id, v)} />)}
      <Checkbox variant="toggle" label="Gece 23.00 ile 08.00 arası sessiz" value={true} />
      <div sx={{ flex: ["row", "end"] }}>
        <Button variant="primary" on:click={() => toast(`${$on.length} kanal kaydedildi`)}>Kaydet</Button>
      </div>
    </div>
  </Card>
}
