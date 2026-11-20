import { RowTools, TextInput, Button, Card, Badge, toast } from "march/ui"
import { Icon, plus, mapPin, truck } from "march/icons"

// kuryenin teslimat rotası: durakları sürükleyerek ya da oklarla sırala, çıkar, yenisini ekle; son durak çıkarılamaz, rota kaydedilince bildirim
export function DeliveryRoute() {
  let $stops = ["Moda Cd. 12, Kadıköy", "Bağdat Cd. 210, Suadiye", "Fenerbahçe Parkı girişi"]
  let $next = ""
  const move = (i: number, d: number) => { const n = [...$stops]; [n[i], n[i + d]] = [n[i + d]!, n[i]!]; $stops = n }
  const remove = (i: number) => { $stops = $stops.filter((_, j) => j !== i) }
  const reorder = (from: number, to: number) => { const n = [...$stops]; const [x] = n.splice(from, 1); n.splice(to, 0, x!); $stops = n }
  const add = () => { if ($next.trim()) { $stops = [...$stops, $next.trim()]; $next = "" } }
  return <Card title="Bugünkü rota" subtitle="Kurye: Ece K.">
    <ol sx={{ flex: "col", gap: 2 }}>
      {$stops.map((stop, i) => <li sx={{ flex: ["row", "between", "center"], gap: 2 }}>
        <span sx={{ flex: ["row", "center"], gap: 1 }}><Icon of={mapPin} /> {i + 1}. {stop}</span>
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
