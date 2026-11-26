// DateRangePickerLab: the full-featured DateRangePicker example; it uses every prop at least once.
//
// Props shown here: bind:value, value + onChange, your own presets, today, custom={false}, presets={false}, min / max,
// firstDay, labels, separator (text, none, node), picker (locale, placeholder, no icon), id, class, labelledby,
// disabled, readonly and a dark theme.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// DateRangePickerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { DateRangePicker, Card, rangePresets } from "march/ui"
import { Icon, arrowRight } from "march/icons"

// A range is { from, to }; either end may be null (an open end). Dates are ISO strings (YYYY-MM-DD).
type Maybe<T> = T | null | undefined
type DateRange = { from: string | null; to: string | null }
type RangePreset = { id: string; label: string; range: DateRange }
// TODAY is fixed so the example looks the same every day. `today` is the base of the built-in presets (last 7 days…).
// OWN: your own presets: { id, label, range }. rangePresets(today) returns the built-in list, so we reuse two of them
// next to two of our own. Preset texts come from this list, so you write them in your language.
const TODAY = "2026-11-19"
const OWN: RangePreset[] = [
  { id: "week", label: "Bu hafta", range: { from: "2026-11-16", to: "2026-11-22" } },
  { id: "weekend", label: "Hafta sonu", range: { from: "2026-11-21", to: "2026-11-22" } },
  ...rangePresets(TODAY).slice(1, 3),
]
const WEEK: Maybe<DateRange> = OWN[0]!.range
const SPRING: Maybe<DateRange> = { from: "2026-03-02", to: "2026-03-14" }
const CAMPAIGN: Maybe<DateRange> = { from: "2026-11-27", to: "2026-11-30" }
// Writes a range as text for the lines under each picker.
const show = (r: Maybe<DateRange>) => (r ? `${r.from ?? "…"} → ${r.to ?? "…"}` : "—")

// A layout helper: a caption above one picker (or two) so each variant is labelled.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

// One signal per picker whose value we want to show; bind:value keeps the picker and the signal in step.
export function DateRangePickerLab() {
  let $a = WEEK
  let $b = SPRING
  let $c = CAMPAIGN
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* A: bind:value (two-way); presets={OWN} replaces the built-in presets; custom={false} removes the "Custom"
            choice, so only presets are offered; id / class are put on the root; labels.range is the accessible name of
            the presets radiogroup. */}
    <Row title="Kendi hazır aralıklarım, Özel yok, id, sınıf">
      <DateRangePicker bind:value={$a} presets={OWN} custom={false} id="lab-own" class="lab-a" labels={{ range: "Hafta seç" }} />
      <span>A: {show($a)}</span>
    </Row>
    {/* B: value + onChange (one-way: you decide what to store). Built-in presets plus "Custom". today is the base
            of the presets; min / max bound the pair of date fields (a date outside is marked invalid and not accepted);
            firstDay={1} starts the calendar week on Monday; labels rename the texts; separator="→" is the mark
            between the two fields; picker passes extra props to both DatePickers (locale for the calendar language,
            placeholder for the empty text). */}
    <Row title="Yerleşik hazırlar + Özel; today, 2026 içinde (min / max), pazartesi, kendi adlar, → işareti, tr-TR">
      <DateRangePicker value={$b} onChange={(v: Maybe<DateRange>) => { $b = v }} today={TODAY} min="2026-01-01" max="2026-12-31" firstDay={1}
        labels={{ range: "Dönem", custom: "Özel", from: "Başlangıç", to: "Bitiş" }} separator="→"
        picker={{ locale: "tr-TR", placeholder: "gg.aa.yyyy" }} class="lab-b" />
      <span>B: {show($b)}</span>
    </Row>
    {/* C: presets={false} shows only the two date fields, so the group needs a name: labelledby points at the title
            span (the root is role="group"). separator={false} draws nothing between the fields; picker={{ icon: false }}
            hides the calendar buttons. */}
    <Row title="Yalnız özel çift (presets={false}), işaretsiz, ikonsuz, labelledby">
      <span id="lab-c-title" sx={{ text: "bold" }}>Kampanya</span>
      <DateRangePicker bind:value={$c} presets={false} separator={false} picker={{ icon: false }} labelledby="lab-c-title" class="lab-c" />
      <span>C: {show($c)}</span>
    </Row>
    {/* disabled switches the whole picker off; readonly keeps the value visible but the presets cannot be changed. */}
    <Row title="Durumlar">
      <DateRangePicker value={SPRING} disabled class="lab-disabled" labels={{ range: "Kapalı dönem", from: "Kapalı başlangıç", to: "Kapalı bitiş" }} />
      <DateRangePicker value={WEEK} presets={OWN} readonly class="lab-readonly" labels={{ range: "Kilitli hafta" }} />
    </Row>
    {/* A dark card (m:theme="night" draws this subtree in the dark theme). The separator can also be a function
            returning a node, here an arrow icon. This picker shares $c with picker C, so both stay equal. */}
    <Card m:theme="night">
      <Row title="Koyu zemin, işaret bir ikon">
        <DateRangePicker bind:value={$c} presets={false} separator={() => <Icon of={arrowRight} />} labels={{ from: "Koyuda başlangıç", to: "Koyuda bitiş" }} />
      </Row>
    </Card>
  </div>
}
