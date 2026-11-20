import { Steps, Button, Badge, Card } from "march/ui"
import { packageBox, truck, mapPin, checkCircle } from "march/icons"

// kargo takibi: adımlar yalnız gösterilir (onSelect yok, düğme değil); "Durumu yenile" siparişi bir adım ilerletir
const STAGES = [
  { title: "Sipariş alındı", description: "Pzt 09:12 · ödeme onaylandı", icon: packageBox },
  { title: "Kargoya verildi", description: "Pzt 17:40 · İstanbul aktarma", icon: truck },
  { title: "Dağıtımda", description: "Kurye yolda, tahmini 14:00", icon: mapPin },
  { title: "Teslim edildi", description: "İmza: kapıda bırakıldı", icon: checkCircle },
]

export function OrderTracking() {
  let $stage = 1
  const $done = $stage >= STAGES.length
  return <Card title="Sipariş #48213" subtitle="HADİ kahve makinesi + 2 filtre">
    <div sx={{ flex: "col", gap: 3 }}>
      <Steps steps={STAGES} current={$stage} vertical m:color="brand-blue" />
      <div sx={{ flex: ["row", "between"], gap: 2 }}>
        <Badge tone={$done ? "success" : "info"}>{$done ? "Teslim edildi" : "Yolda"}</Badge>
        <Button size="sm" disabled={$done} on:click={() => $stage++}>Durumu yenile</Button>
      </div>
    </div>
  </Card>
}
