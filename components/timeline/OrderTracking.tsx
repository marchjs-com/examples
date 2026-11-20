import { Timeline, Card, Badge } from "march/ui"
import { packageBox, creditCard, truck, home } from "march/icons"

// bir siparişin takibi: tarihler (Date) yerel biçimde yazılır, gövde kargo bilgisini taşır; son adım bekliyor
const at = (h: number, m: number) => new Date(2026, 10, 18, h, m)

export function OrderTracking() {
  return <Card title="Sipariş #48210" actions={<Badge tone="info">Yolda</Badge>}>
    <Timeline items={[
      { time: at(9, 12), title: "Sipariş oluşturuldu", body: "3 ürün · 1.499,90 ₺", tone: "info", icon: packageBox },
      { time: at(9, 14), title: "Ödeme alındı", body: "Kart •••• 4242", tone: "success", icon: creditCard },
      { time: at(11, 40), title: "Kargoya verildi", body: "Takip: HD123456", tone: "warn", icon: truck },
      { title: "Teslim edilecek", body: "Tahmini: yarın 18:00'e kadar", icon: home },
    ]} />
  </Card>
}
