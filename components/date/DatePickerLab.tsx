// DatePickerLab: the full-featured DatePicker example; it uses every prop at least once.
//
// Props shown here: bind:value and onChange, min / max, firstDay, locale, placeholder, labels, calendar (extra props
// for the calendar: here Sundays are off), name / class / required, focus events, icon (your own, or none), id /
// aria-label / describedby / invalid, readonly, disabled and a dark theme.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// DatePickerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { DatePicker, Field, Card } from "march/ui"
import { clock } from "march/icons"

// A date is an ISO string (YYYY-MM-DD) or null when empty.
type Day = string | null
// A rule for calendar.isDisabled: true for Sundays, which the calendar then shows as unavailable.
const sunday = (iso: string) => new Date(`${iso}T00:00:00Z`).getUTCDay() === 0

// A layout helper: a caption above each group of pickers.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

// $date is the main value, $changes counts onChange calls, $focused follows focus, $us is for the en-US pickers.
export function DatePickerLab() {
  let $date: Day = "2026-03-14"
  let $changes = 0
  let $focused = false
  let $us: Day = null
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* First picker:
              - bind:value keeps the picker and $date in step; onChange also runs on each change (here a counter).
              - min / max: dates outside are marked invalid and not accepted; firstDay={1}: weeks start on Monday.
              - locale decides the typing order and the placeholder; placeholder overrides the text.
              - name / required are passed to the real input, so it works in a native form; class is added to the root.
              - calendar passes extra props to the Calendar popover (isDisabled blocks days).
              - labels: names for the calendar button and the month buttons (the default texts are English).
              - onFocus / onBlur: focus events of the input. */}
    <Row title="Değer (bind:value + onChange), sınırlar, Türkçe">
      <Field label="Teslim tarihi">
        <DatePicker bind:value={$date} onChange={() => $changes++} min="2026-03-01" max="2026-06-30" firstDay={1} locale="tr-TR"
          placeholder="GG.AA.YYYY" name="due" class="lab-date" required calendar={{ isDisabled: sunday }}
          labels={{ choose: "Takvimi aç", prevMonth: "Önceki ay", nextMonth: "Sonraki ay" }}
          onFocus={() => $focused = true} onBlur={() => $focused = false} />
      </Field>
      <span>Değer: {$date ?? "—"}</span>
      <span>Değişiklik: {$changes}</span>
      <span>{$focused ? "Odakta" : "Odak dışında"}</span>
    </Row>
    {/* Second row. icon takes your own icon (or text / node); icon={false} removes the calendar button, leaving a plain
              typed field (Alt+Arrow Down still opens the calendar). locale="en-US" types month/day/year. aria-label names a
              picker that has no Field; id, describedby and invalid are the accessibility hooks: describedby points at the
              hint below, invalid marks the field while it is empty. */}
    <Row title="İkon, en-US, erişilebilirlik">
      <DatePicker bind:value={$us} locale="en-US" icon={clock} aria-label="ABD tarihi" labels={{ choose: "Saatli takvim" }} />
      <DatePicker bind:value={$us} locale="en-US" icon={false} class="lab-noicon" id="lab-plain" aria-label="İkonsuz tarih"
        describedby="lab-hint" invalid={!$us} />
      <span id="lab-hint" sx={{ text: "xs", color: "muted" }}>Ay/gün/yıl: {$us ?? "boş"}</span>
    </Row>
    {/* readonly shows the value without editing; disabled switches the whole picker (and its button) off. */}
    <Row title="Durum">
      <DatePicker value="2026-01-05" readonly aria-label="Salt okunur tarih" class="lab-readonly" />
      <DatePicker value="2026-02-10" disabled aria-label="Kapalı tarih" class="lab-disabled" />
    </Row>
    {/* m:theme="night" (a common prop) draws this subtree in the dark theme; it shares $date with the first picker. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <DatePicker bind:value={$date} locale="tr-TR" aria-label="Gece tarihi" labels={{ choose: "Gece takvimi" }} />
      </Row>
    </Card>
  </div>
}
