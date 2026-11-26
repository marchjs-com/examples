// TripNights: the creative-minimal DateRangePicker example.
//
// What it shows: a holiday plan. Pick the arrival and departure days; the nights and the hotel price update at once.
// With presets={false} the picker is just two date fields, which is all a booking form needs.
// When to use this pattern: a start / end pair where ready-made periods make no sense (stays, rentals, leave).
import { DateRangePicker, Card } from "march/ui"

type Maybe<T> = T | null | undefined
type DateRange = { from: string | null; to: string | null }
// The starting range; the picker keeps `from` and `to` in order, so people cannot make the end earlier than the start.
const TRIP: Maybe<DateRange> = { from: "2026-07-10", to: "2026-07-17" }
const NIGHT = 2_400

// $nights is derived from $trip: the day difference, so 10 -> 17 July is 7 nights (the departure day is not a night).
export function TripNights() {
  let $trip = TRIP
  const $nights = $trip?.from && $trip.to ? Math.round((Date.parse($trip.to) - Date.parse($trip.from)) / 86_400_000) : 0
  return <Card m:theme="night" title="Bodrum tatili" subtitle="Deniz manzaralı oda · gecesi 2.400 ₺">
    {/* bind:value ties the picker to $trip. presets={false} removes the preset row; separator="✈" replaces the
            default dash between the fields with any text or node; labels name the two fields. The Card uses
            m:theme="night" (a common prop), which draws this subtree in the dark theme. */}
    <DateRangePicker bind:value={$trip} presets={false} separator="✈" labels={{ from: "Gidiş", to: "Dönüş" }} />
    <p sx={{ text: "xl", color: "brand-blue" }}>
      {$nights} gece · {($nights * NIGHT).toLocaleString("tr-TR")} ₺
    </p>
  </Card>
}
