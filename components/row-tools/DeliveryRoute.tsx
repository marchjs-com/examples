// DeliveryRoute: the real-life RowTools example.
//
// What it shows: a courier's route. Stops can be reordered by dragging or with the arrow buttons, removed, and a new
// one can be added; the last stop cannot be removed, and Save announces the route. When to use this pattern: an
// editable list where order matters.
//
// Accessibility: the tools are a group of icon buttons, each with its own accessible name (here naming the stop);
// a tool that cannot act is disabled, not hidden. The drag grip is for pointers; the arrows are the keyboard way.

import { RowTools, TextInput, Button, Card, Badge, toast } from "march/ui"
import { Icon, plus, mapPin, truck } from "march/icons"

export function DeliveryRoute() {
  // The stops (addresses are content, so they stay Turkish).
  let $stops = ["Moda Cd. 12, Kadıköy", "Bağdat Cd. 210, Suadiye", "Fenerbahçe Parkı girişi"]
  // The text of the new-stop field.
  let $next = ""
  // Swap a stop with its neighbour (d is -1 for up, 1 for down).
  const move = (i: number, d: number) => { const n = [...$stops]; [n[i], n[i + d]] = [n[i + d]!, n[i]!]; $stops = n }
  // Take a stop out.
  const remove = (i: number) => { $stops = $stops.filter((_, j) => j !== i) }
  // Move a stop from one index to another; RowTools calls it once when a drag ends.
  const reorder = (from: number, to: number) => { const n = [...$stops]; const [x] = n.splice(from, 1); n.splice(to, 0, x!); $stops = n }
  // Add the typed stop to the end, ignoring empty text.
  const add = () => { if ($next.trim()) { $stops = [...$stops, $next.trim()]; $next = "" } }
  return <Card title="Bugünkü rota" subtitle="Kurye: Ece K.">
    <ol sx={{ flex: "col", gap: 2 }}>
      {$stops.map((stop, i) => <li sx={{ flex: ["row", "between", "center"], gap: 2 }}>
        <span sx={{ flex: ["row", "center"], gap: 1 }}><Icon of={mapPin} /> {i + 1}. {stop}</span>
        {/* - index and count: the position and the length of the list, so Up is off on the first row and Down on the
            last.
            - onReorder: gives the row a drag grip; onUp, onDown, onRemove: the other tools. danger: the remove tool in
              the danger colour.
            - disabled as an object turns off some tools only: here Remove is off while one stop is left.
            - labels: accessible names and tooltips; naming the stop makes rows that look alike distinguishable. */}
        <RowTools index={i} count={$stops.length} onReorder={reorder} danger disabled={{ remove: $stops.length <= 1 }}
          labels={{ up: "Önce git", down: "Sonra git", remove: `${stop} durağını çıkar`, group: `${i + 1}. durak` }}
          onUp={() => move(i, -1)} onDown={() => move(i, 1)} onRemove={() => remove(i)} />
      </li>)}
    </ol>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 2, mt: 3 }}>
      <Badge tone="info">{$stops.length} durak</Badge>
      <TextInput bind:value={$next} placeholder="Yeni durak adresi" aria-label="Yeni durak" />
      <Button icon={plus} variant="secondary" on:click={add}>Ekle</Button>
      <Button icon={truck} on:click={() => toast(`Rota kaydedildi: ${$stops.length} durak`)}>Kaydet</Button>
    </div>
  </Card>
}
