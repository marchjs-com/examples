// OrderTracking: the real-life Timeline example.
//
// What it shows: the tracking page of an online order. Each step has a time, a title, a body line and an icon; the
// colour of the dot says how the step went (info, success, warn). The last step has no time because it has not
// happened yet, so it is drawn as a plain next step.
// When to use this pattern: any ordered history or progress with timestamps (order status, support ticket log,
// audit trail, release history). Timeline is only the list; the Card around it gives the frame and a status Badge.
import { Timeline, Card, Badge } from "march/ui"
import { packageBox, creditCard, truck, home } from "march/icons"

// Builds a Date on 18 November 2026 (months count from 0, so 10 is November). A Date as `time` is formatted for the
// visitor's locale by Timeline; a text would be shown as it is.
const at = (h: number, m: number) => new Date(2026, 10, 18, h, m)

export function OrderTracking() {
  // `actions` of Card is the slot at the end of its header: a Badge shows the current status there.
  return <Card title="Sipariş #48210" actions={<Badge tone="info">Yolda</Badge>}>
    {/* items is the list of events in the order they should be read (the list is an <ol>, so screen readers announce
        the order and the number of steps).
        - time: Date, epoch milliseconds, ISO string or free text; it is drawn in a <time> element.
        - title / body: the step's headline and its detail line.
        - tone: the colour of the dot (info, success, warn, danger).
        - icon: an icon drawn in the dot; a step without time or tone (the last one) stays neutral.
        Timeline has no animation of its own, so there is nothing to turn off here. */}
    <Timeline items={[
      { time: at(9, 12), title: "Sipariş oluşturuldu", body: "3 ürün · 1.499,90 ₺", tone: "info", icon: packageBox },
      { time: at(9, 14), title: "Ödeme alındı", body: "Kart •••• 4242", tone: "success", icon: creditCard },
      { time: at(11, 40), title: "Kargoya verildi", body: "Takip: HD123456", tone: "warn", icon: truck },
      { title: "Teslim edilecek", body: "Tahmini: yarın 18:00'e kadar", icon: home },
    ]} />
  </Card>
}
