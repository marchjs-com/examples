import { DateRangePicker, Card, rangePresets } from "march/ui"
import { Icon, arrowRight } from "march/icons"

// DateRangePicker'ın bütün özellikleri bir arada: bind:value, value + onChange, kendi hazır aralıklarım (presets),
// today, "Özel"siz (custom={false}), yalnız özel çift (presets={false}), min / max, firstDay, labels, separator
// (metin, yok, düğüm), picker (dil, yer tutucu, ikonsuz), id, sınıf, labelledby, devre dışı, yalnız okunur, koyu zemin
type Maybe<T> = T | null | undefined
type DateRange = { from: string | null; to: string | null }
type RangePreset = { id: string; label: string; range: DateRange }
const TODAY = "2026-11-19"
const OWN: RangePreset[] = [
  { id: "week", label: "Bu hafta", range: { from: "2026-11-16", to: "2026-11-22" } },
  { id: "weekend", label: "Hafta sonu", range: { from: "2026-11-21", to: "2026-11-22" } },
  ...rangePresets(TODAY).slice(1, 3),
]
const WEEK: Maybe<DateRange> = OWN[0]!.range
const SPRING: Maybe<DateRange> = { from: "2026-03-02", to: "2026-03-14" }
const CAMPAIGN: Maybe<DateRange> = { from: "2026-11-27", to: "2026-11-30" }
const show = (r: Maybe<DateRange>) => (r ? `${r.from ?? "…"} → ${r.to ?? "…"}` : "—")

const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function DateRangePickerLab() {
  let $a = WEEK
  let $b = SPRING
  let $c = CAMPAIGN
  return <div sx={{ flex: "col", gap: 3 }}>
    <Row title="Kendi hazır aralıklarım, Özel yok, id, sınıf">
      <DateRangePicker bind:value={$a} presets={OWN} custom={false} id="lab-own" class="lab-a" labels={{ range: "Hafta seç" }} />
      <span>A: {show($a)}</span>
    </Row>
    <Row title="Yerleşik hazırlar + Özel; today, 2026 içinde (min / max), pazartesi, kendi adlar, → işareti, tr-TR">
      <DateRangePicker value={$b} onChange={(v: Maybe<DateRange>) => { $b = v }} today={TODAY} min="2026-01-01" max="2026-12-31" firstDay={1}
        labels={{ range: "Dönem", custom: "Özel", from: "Başlangıç", to: "Bitiş" }} separator="→"
        picker={{ locale: "tr-TR", placeholder: "gg.aa.yyyy" }} class="lab-b" />
      <span>B: {show($b)}</span>
    </Row>
    <Row title="Yalnız özel çift (presets={false}), işaretsiz, ikonsuz, labelledby">
      <span id="lab-c-title" sx={{ text: "bold" }}>Kampanya</span>
      <DateRangePicker bind:value={$c} presets={false} separator={false} picker={{ icon: false }} labelledby="lab-c-title" class="lab-c" />
      <span>C: {show($c)}</span>
    </Row>
    <Row title="Durumlar">
      <DateRangePicker value={SPRING} disabled class="lab-disabled" labels={{ range: "Kapalı dönem", from: "Kapalı başlangıç", to: "Kapalı bitiş" }} />
      <DateRangePicker value={WEEK} presets={OWN} readonly class="lab-readonly" labels={{ range: "Kilitli hafta" }} />
    </Row>
    <Card m:theme="night">
      <Row title="Koyu zemin, işaret bir ikon">
        <DateRangePicker bind:value={$c} presets={false} separator={() => <Icon of={arrowRight} />} labels={{ from: "Koyuda başlangıç", to: "Koyuda bitiş" }} />
      </Row>
    </Card>
  </div>
}
