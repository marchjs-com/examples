// DateTimeInputLab: the full-featured DateTimeInput example; it uses every prop at least once.
//
// Props shown here: bind:value (UTC ISO timestamp), value + onChange, min / max (for the date part), firstDay,
// defaultTime, timeLabel, picker (locale, placeholder, no icon), id, class, onBlur, disabled, readonly and a dark theme.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// DateTimeInputLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { DateTimeInput, Field, Button, Card } from "march/ui"
import { x } from "march/icons"

// Union types are written outside JSX: the compiler reads a `|` inside JSX as a pipe (like {$x | money}), so a
// type alias keeps the component props readable.
type Maybe<T> = T | null | undefined
// The value is an ISO timestamp in UTC (what new Date().toISOString() gives); the fields show it in local time.
const FLIGHT: Maybe<string> = "2026-03-14T09:30:00.000Z"
const NONE: Maybe<string> = null

// A layout helper: a caption above one input so each variant is labelled.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

// $flight and $call are the two values; $blurs counts how often the first input lost focus.
export function DateTimeInputLab() {
  let $flight = FLIGHT
  let $call = NONE
  let $blurs = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* First input:
              - bind:value keeps the input and $flight in step (two-way).
              - min / max limit the date part (a date outside is marked invalid and not accepted).
              - firstDay={1}: the calendar week starts on Monday.
              - timeLabel: the accessible name of the time field (the Field label names the date part).
              - picker: extra props for the inner DatePicker: locale (typing order and calendar language), placeholder.
              - class: added to the root, so tests or CSS can find this instance.
              - onBlur: called when focus leaves the input. */}
    <Row title="bind:value, 2026 içinde (min / max), hafta pazartesi başlar, tr-TR, onBlur, sınıf">
      <Field label="Uçuş">
        <DateTimeInput bind:value={$flight} min="2026-01-01" max="2026-12-31" firstDay={1} timeLabel="Uçuş saati"
          picker={{ locale: "tr-TR", placeholder: "gg.aa.yyyy" }} class="lab-flight" onBlur={() => { $blurs++ }} />
      </Field>
      <Button size="sm" variant="ghost" icon={x} on:click={() => { $flight = null }}>Temizle</Button>
    </Row>
    <span>Uçuş (UTC): {$flight ?? "—"} · odaktan çıkış: {$blurs}</span>
    {/* Second input: value + onChange is one-way (you decide what to store); it starts empty. When only a day is
              chosen the time comes from defaultTime (here 09:00; the default is 00:00). picker={{ icon: false }} removes
              the calendar button (Alt+Arrow Down still opens it in a DatePicker); id goes on the date field. */}
    <Row title="value + onChange, boş başlar; yalnız gün seçilince saat 09:00, ikonsuz, id">
      <DateTimeInput value={$call} onChange={(v: Maybe<string>) => { $call = v }} defaultTime="09:00" id="lab-call"
        timeLabel="Görüşme saati" picker={{ icon: false, placeholder: "Görüşme günü" }} />
    </Row>
    <span>Görüşme (UTC): {$call ?? "—"}</span>
    {/* disabled turns both fields off; readonly keeps them visible but not editable. */}
    <Row title="Durumlar">
      <DateTimeInput value={FLIGHT} disabled timeLabel="Kapalı saat" />
      <DateTimeInput value={FLIGHT} readonly timeLabel="Kilitli saat" />
    </Row>
    {/* m:theme="night" (a common prop) draws this subtree in the dark theme; it shares $flight with the first input. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <DateTimeInput bind:value={$flight} timeLabel="Koyuda uçuş saati" picker={{ locale: "tr-TR" }} />
      </Row>
    </Card>
  </div>
}
