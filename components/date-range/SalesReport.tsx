// SalesReport: the real-life DateRangePicker example.
//
// What it shows: the period of a sales report. The built-in presets (today, last 7 / 30 / 90 days, this month) or a
// custom range; the number of days, orders and revenue follow the chosen range, and a button announces the CSV file name (a demo: no file is written).
// When to use this pattern: a report or dashboard filter where most people want a ready-made period and a few need
// exact dates.
// Keyboard: the presets are a radiogroup (arrow keys move between them); the custom fields are normal date inputs.
import { DateRangePicker, Field, Button, Card, toast, rangePresets } from "march/ui"
import { download } from "march/icons"

type Maybe<T> = T | null | undefined
type DateRange = { from: string | null; to: string | null }
// TODAY is fixed so the example is stable; in a real page leave `today` out and the picker uses the real date.
// rangePresets(today) is the built-in list; [2] is the third one, used as the starting range.
const TODAY = "2026-11-19"
const START: Maybe<DateRange> = rangePresets(TODAY)[2]!.range
// A small stat block: a muted label above a large number.
const Stat = (props: { label: string; children?: unknown }) => <div sx={{ flex: "col" }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.label}</span>
  <strong sx={{ text: "lg" }}>{props.children}</strong>
</div>

// $range is the chosen range; $days is derived from it (a `const $x = …` that reads a $ variable is recomputed
// whenever the range changes), and the numbers below are derived from $days. Inclusive: both end days count.
export function SalesReport() {
  let $range = START
  const $days = $range?.from && $range.to ? Math.round((Date.parse($range.to) - Date.parse($range.from)) / 86_400_000) + 1 : 0
  const exportCsv = () => toast(`satis_${$range?.from}_${$range?.to}.csv hazırlandı`)
  return <Card title="Satış raporu" subtitle="Moda şubesi">
    {/* Field gives the picker a visible label; `group` makes the label name the whole group instead of one input.
            max={TODAY} stops people picking future dates in the custom fields; today sets the base of the presets. */}
    <Field label="Dönem" group>
      <DateRangePicker bind:value={$range} today={TODAY} max={TODAY} labels={{ range: "Dönem", custom: "Özel", from: "Başlangıç", to: "Bitiş" }} />
    </Field>
    <div sx={{ cols: 3, gap: 2, my: 3 }}>
      <Stat label="Gün">{$days}</Stat>
      <Stat label="Sipariş">{($days * 42).toLocaleString("tr-TR")}</Stat>
      <Stat label="Ciro">{($days * 18_400).toLocaleString("tr-TR")} ₺</Stat>
    </div>
    {/* Disabled while there is no complete range (no days to export). */}
    <Button icon={download} variant="secondary" disabled={!$days} on:click={exportCsv}>CSV indir</Button>
  </Card>
}
