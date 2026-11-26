// InboxNav: the real-life Badge example.
//
// An app's menu with unread counts: a count next to "Gelen kutusu", a mini badge on the corner of the bell button, a
// live "online" status badge. Counts hide at 0 and show "99+" above 99. Use this pattern for notification counters on
// navigation items and icon buttons.
import { Badge, IconButton, Button } from "march/ui"
import { mail, bell, inbox } from "march/icons"

export function InboxNav() {
  // Two reactive counters: unread mails and unread alerts.
  let $mail = 12
  let $alerts = 120
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "center"], gap: 3 }}>
      {/* count as a function stays live: the badge follows $mail and disappears at 0. `label` is read after the number
          by screen readers (for example "12 unread"), so the number alone is never announced without meaning. */}
      <span sx={{ flex: ["row", "center"], gap: 1 }}>Gelen kutusu <Badge count={() => $mail} label="okunmamış" /></span>
      {/* A Badge as the child of an IconButton becomes its corner mini badge: size="xs" and variant="solid" make it
          stand out. 120 is above the default max, so it reads "99+". Pressing the button clears the count. */}
      <IconButton icon={bell} label="Bildirimler" on:click={() => $alerts = 0}>
        <Badge size="xs" variant="solid" count={() => $alerts} />
      </IconButton>
      {/* dot + pulse: a status dot that pulses to say "live". The pulse follows reduced motion and the global speed /
          "Stop all" settings. */}
      <Badge tone="success" dot pulse>Çevrim içi</Badge>
    </div>
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" icon={inbox} on:click={() => $mail = 0}>Hepsini okundu say</Button>
      <Button size="sm" icon={mail} on:click={() => $mail++}>Yeni e-posta</Button>
    </div>
  </div>
}
