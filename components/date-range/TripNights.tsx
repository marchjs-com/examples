import { DateRangePicker, Card } from "march/ui"

// tatil planı: gidiş ve dönüş günlerini seç; kaç gece kaldığın ve otelin tutarı anında hesaplanır
type Maybe<T> = T | null | undefined
type DateRange = { from: string | null; to: string | null }
const TRIP: Maybe<DateRange> = { from: "2026-07-10", to: "2026-07-17" }
const NIGHT = 2_400

export function TripNights() {
  let $trip = TRIP
  const $nights = $trip?.from && $trip.to ? Math.round((Date.parse($trip.to) - Date.parse($trip.from)) / 86_400_000) : 0
  return <Card m:theme="night" title="Bodrum tatili" subtitle="Deniz manzaralı oda · gecesi 2.400 ₺">
    <DateRangePicker bind:value={$trip} presets={false} separator="✈" labels={{ from: "Gidiş", to: "Dönüş" }} />
    <p sx={{ text: "xl", color: "brand-blue" }}>
      {$nights} gece · {($nights * NIGHT).toLocaleString("tr-TR")} ₺
    </p>
  </Card>
}
