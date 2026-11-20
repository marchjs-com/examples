import { LiveFeed } from "march/landing"
import { Button } from "march/ui"

// kuş gözlemi defteri: her basışta yeni bir kuş en üste düşer, en eskisi uçup gider
const BIRDS = [["🐦", "Serçe", "balkonda"], ["🦜", "Muhabbet kuşu", "komşunun penceresinde"], ["🦉", "Baykuş", "çam ağacında"], ["🦆", "Yaban ördeği", "gölette"], ["🕊️", "Güvercin", "meydanda"]]

export function BirdWatch() {
  let $seen = [{ id: 0, avatar: "🐦", title: "Serçe", body: "bahçede", meta: "sabah" }]
  let $n = 1
  const spot = () => {
    const [emoji, name, where] = BIRDS[$n % BIRDS.length]!
    $seen = [{ id: $n, avatar: emoji, title: name, body: where, meta: "şimdi" }, ...$seen]
    $n++
  }
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button on:click={spot}>Kuş gördüm ({$n})</Button>
    <LiveFeed items={() => $seen} max={4} enter="drop" leave="fall" label="Kuş defteri" pausable={false} />
  </div>
}
