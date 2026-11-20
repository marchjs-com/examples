import { DateTimeInput, Field, Card } from "march/ui"

// yılbaşı geri sayımı: partinin tarihini ve saatini seç; kalan gün ve saat kocaman, altında yerel saatle an
const PARTY: string | null = "2026-12-31T21:00:00.000Z"

export function Countdown() {
  let $at = PARTY
  const $left = $at ? Math.max(0, Date.parse($at) - Date.now()) : 0
  return <Card m:theme="night">
    <Field label="Parti ne zaman?"><DateTimeInput bind:value={$at} defaultTime="22:00" /></Field>
    <p sx={{ text: "2xl", color: "brand-gold" }}>
      {Math.floor($left / 86_400_000)} gün {Math.floor($left / 3_600_000) % 24} saat
    </p>
    <span sx={{ text: "sm", color: "muted" }}>kaldı · {$at ? new Date($at).toLocaleString("tr-TR") : "tarih seç"}</span>
  </Card>
}
