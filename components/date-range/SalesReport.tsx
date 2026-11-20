import { DateRangePicker, Field, Button, Card, toast, rangePresets } from "march/ui"
import { download } from "march/icons"

// satış raporunun dönemi: hazır aralıklar (bugün, 7 / 30 / 90 gün, bu ay) ya da özel aralık; özet ve CSV indirme
type Maybe<T> = T | null | undefined
type DateRange = { from: string | null; to: string | null }
const TODAY = "2026-11-19"
const START: Maybe<DateRange> = rangePresets(TODAY)[2]!.range
const Stat = (props: { label: string; children?: unknown }) => <div sx={{ flex: "col" }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.label}</span>
  <strong sx={{ text: "lg" }}>{props.children}</strong>
</div>

export function SalesReport() {
  let $range = START
  const $days = $range?.from && $range.to ? Math.round((Date.parse($range.to) - Date.parse($range.from)) / 86_400_000) + 1 : 0
  const exportCsv = () => toast(`satis_${$range?.from}_${$range?.to}.csv hazırlandı`)
  return <Card title="Satış raporu" subtitle="Moda şubesi">
    <Field label="Dönem" group>
      <DateRangePicker bind:value={$range} today={TODAY} max={TODAY} labels={{ range: "Dönem", custom: "Özel", from: "Başlangıç", to: "Bitiş" }} />
    </Field>
    <div sx={{ cols: 3, gap: 2, my: 3 }}>
      <Stat label="Gün">{$days}</Stat>
      <Stat label="Sipariş">{($days * 42).toLocaleString("tr-TR")}</Stat>
      <Stat label="Ciro">{($days * 18_400).toLocaleString("tr-TR")} ₺</Stat>
    </div>
    <Button icon={download} variant="secondary" disabled={!$days} on:click={exportCsv}>CSV indir</Button>
  </Card>
}
