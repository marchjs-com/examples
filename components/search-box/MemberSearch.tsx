// MemberSearch: the real-life SearchBox example.
//
// What it shows: searching a team list the way an admin screen does. Pressing "/" anywhere focuses the box, the list
// filters once typing pauses (250 ms, the default debounce), the name, e-mail and role are all searched, the card
// subtitle counts the matches, and an empty result says what was searched for.
// When to use this pattern: any list screen with a search field. For lists loaded from a server, put the request in
// the SearchBox's `onSearch` (it gets the debounced text); here the data is local, so filtering is done from the signal.
import { SearchBox, Card, Badge } from "march/ui"

interface Member { name: string; mail: string; role: "Yönetici" | "Editör" | "Okur" }

// The team. A real page would load it from an API.
const MEMBERS: Member[] = [
  { name: "Ayşe Kaya", mail: "ayse@hadisosyal.com", role: "Yönetici" },
  { name: "Mehmet Demir", mail: "mehmet@hadisosyal.com", role: "Editör" },
  { name: "Zeynep Arslan", mail: "zeynep@hadisosyal.com", role: "Editör" },
  { name: "Can Öztürk", mail: "can@hadisosyal.com", role: "Okur" },
  { name: "Elif Şahin", mail: "elif@hadisosyal.com", role: "Okur" },
]
// One Badge tone per role, so the role is recognisable at a glance.
const TONES = { "Yönetici": "danger", "Editör": "info", "Okur": "neutral" } as const

export function MemberSearch() {
  // `let $q` is a March signal bound to the box. The `const $name` lines are derived values: they are computed again
  // whenever the signals they read change. $needle is the trimmed, lower-cased query (with Turkish case rules), and
  // $rows keeps the members whose name, e-mail or role contains it. An empty query matches everyone.
  let $q = ""
  const $needle = $q.trim().toLocaleLowerCase("tr")
  const $rows = MEMBERS.filter((m) => `${m.name} ${m.mail} ${m.role}`.toLocaleLowerCase("tr").includes($needle))
  return <Card title="Ekip üyeleri" subtitle={`${$rows.length} / ${MEMBERS.length} üye`}>
    {/* SearchBox options used here:
        - bind:value={$q}: two-way binding with the signal; with the default debounce of 250 ms the value is written
          after typing pauses (Enter writes it at once, and so does the clear button).
        - shortcut: `true` means the "/" key focuses the box from anywhere on the page; the key is also shown as a hint
          at the end of the box (a Kbd, decorative for screen readers).
        - placeholder and label: the hint text, and the accessible name of the input. */}
    <SearchBox bind:value={$q} shortcut placeholder="Ad, e-posta ya da rol…" label="Üye ara" />
    {/* The results: one row per member, or a single muted line that repeats the query when nothing matches. */}
    <ul sx={{ flex: "col", gap: 2, p: 0 }}>
      {$rows.length ? $rows.map((m) => <li sx={{ flex: ["row", "between"], gap: 2 }}>
        <span>{m.name} <span sx={{ text: "sm", color: "muted" }}>{m.mail}</span></span>
        <Badge tone={TONES[m.role]}>{m.role}</Badge>
      </li>) : <li sx={{ color: "muted" }}>"{$q}" ile eşleşen üye yok</li>}
    </ul>
  </Card>
}
