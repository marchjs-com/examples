// NotificationSettings: the real-life Checkbox example.
//
// What it shows: notification channels of a profile page. A "select all" checkbox at the top shows the partial state
// (indeterminate) when only some channels are on; each channel is a card-style Checkbox with an icon and a hint; a
// toggle-style checkbox is the quiet-hours switch; Save confirms with a toast.
// When to use this pattern: any group where one parent checkbox controls several children: set `value` for "all on"
// and `indeterminate` for "some on", and let its onChange switch every child at once.
// Keyboard / accessibility: every checkbox is a real input (Tab, Space). The box motion runs on the motion engine
// (reduced motion, global speed and "Stop all" apply; animate={false} turns it off).
import { Checkbox, Card, Button, toast } from "march/ui"
import { bell, mail, message, megaphone } from "march/icons"

const channels = [
  { id: "push", label: "Anlık bildirimler", hint: "Telefonda ve tarayıcıda", icon: bell },
  { id: "mail", label: "E-posta özeti", hint: "Her pazartesi sabahı", icon: mail },
  { id: "dm", label: "Doğrudan mesajlar", hint: "Biri sana yazınca", icon: message },
  { id: "news", label: "Duyurular", hint: "Yeni özellikler ve kampanyalar", icon: megaphone },
]

export function NotificationSettings() {
  // The ids of the channels that are on. Everything else (parent state, children) is derived from this one array.
  let $on = ["push", "dm"]
  // Switch one channel on or off by adding or removing its id.
  const set = (id: string, v: boolean) => $on = v ? [...$on, id] : $on.filter((x) => x !== id)
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      {/* The parent checkbox: checked when every channel is on, "indeterminate" (a dash) when only some are, and its
          onChange turns all channels on or off. */}
      <Checkbox label="Bütün bildirimler" size="lg" value={$on.length === channels.length}
        indeterminate={$on.length > 0 && $on.length < channels.length} onChange={(v: boolean) => $on = v ? channels.map((c) => c.id) : []} />
      {/* variant="card": a framed checkbox that shows `icon` and `hint` next to the label. */}
      {channels.map((c) => <Checkbox variant="card" icon={c.icon} label={c.label} hint={c.hint}
        value={$on.includes(c.id)} onChange={(v: boolean) => set(c.id, v)} />)}
      {/* variant="toggle": the same checkbox drawn as a switch; value={true} makes it start on. */}
      <Checkbox variant="toggle" label="Gece 23.00 ile 08.00 arası sessiz" value={true} />
      <div sx={{ flex: ["row", "end"] }}>
        <Button variant="primary" on:click={() => toast(`${$on.length} kanal kaydedildi`)}>Kaydet</Button>
      </div>
    </div>
  </Card>
}
