// CalendarLab: the full-featured Calendar example; it uses every prop at least once.
//
// Props shown here: bind:value with onChange, onPick, onEscape, min / max, isDisabled, firstDay, locale, labels,
// autoFocus, class; a range (rangeFrom / rangeTo) with initial and your own month marks (prevIcon / nextIcon); the
// weekday row and the month buttons turned off (weekdays / nav = false) with your own day content (renderDay); and a
// dark surface with m:theme and m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CalendarLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Calendar, Card } from "march/ui"

// Dates are plain ISO strings ("2026-03-14"); null means "no day chosen".
type Day = string | null

// A titled section, so each calendar below has a small caption.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function CalendarLab() {
  // The chosen day (shared with the dark calendar), how many times it changed, the last onPick date and whether
  // Escape was pressed. Plain `let $x` variables are reactive state.
  let $day: Day = "2026-03-14"
  let $changes = 0
  let $picked = "—"
  let $escaped = false
  return <div sx={{ flex: ["row", "wrap"], gap: 4 }}>
    <Section title="Değer, sınırlar, kapalı gün (20 Mart), Türkçe, pazartesi başı">
      {/* The first calendar:
          - bind:value keeps $day in sync both ways; onChange runs when the value changes, onPick when the user picks a
            day (it receives the ISO date), and onEscape when Escape is pressed inside the grid.
          - min / max: days outside them cannot be picked; isDisabled blocks any other day (here 20 March). Such days
            are aria-disabled.
          - firstDay={1}: the week starts on Monday (0 is Sunday). locale="tr-TR": month and weekday names come from
            the locale.
          - labels: the accessible names of the previous / next month buttons.
          - autoFocus: focus goes to the current day. Keyboard: arrows move by day and week, Page Up / Down by month,
            Home / End to the week's ends, Enter or Space picks.
          - class="lab-cal": added to the root so CSS or a test can find it. */}
      <Calendar bind:value={$day} onChange={() => $changes++} onPick={(iso: string) => $picked = iso} onEscape={() => $escaped = true}
        min="2026-03-05" max="2026-03-25" isDisabled={(iso: string) => iso === "2026-03-20"} firstDay={1} locale="tr-TR"
        labels={{ prevMonth: "Önceki ay", nextMonth: "Sonraki ay" }} autoFocus class="lab-cal" />
      <span>Seçilen: {$day}</span>
      <span>Değişiklik: {$changes} · onPick: {$picked}</span>
      <span>{$escaped ? "Escape'e basıldı" : "Escape bekleniyor"}</span>
    </Section>
    <Section title="Aralık, initial, kendi ay işaretleri, en-US, pazar başı">
      {/* The second calendar: initial is the month shown when there is no value; rangeFrom / rangeTo highlight a range
          (the ends are selected, the days between carry a range class); prevIcon / nextIcon replace the month
          buttons' content with your own text or nodes; locale="en-US" and firstDay={0} give English names and a
          Sunday start. */}
      <Calendar initial="2026-04-01" rangeFrom="2026-04-06" rangeTo="2026-04-12" locale="en-US" firstDay={0}
        prevIcon="«" nextIcon="»" labels={{ prevMonth: "Önceki (aralık)", nextMonth: "Sonraki (aralık)" }} class="lab-range" />
    </Section>
    <Section title="Gün adları ve ay düğmeleri yok, kendi gün içeriği">
      {/* The third calendar: weekdays={false} removes the weekday row, nav={false} removes the month buttons (Page Up
          and Page Down still change the month), m:color sets the colour token (selection, today ring), and renderDay
          draws your own content in each day cell: here a bullet after every fourth day. */}
      <Calendar initial="2026-05-01" weekdays={false} nav={false} m:color="brand-green" class="lab-busy"
        renderDay={(_iso: string, d: number) => (d % 4 === 0 ? <b>{`${d}•`}</b> : d)} />
    </Section>
    {/* m:theme="night" on the Card shows a calendar on a dark surface; it shares $day with the first one. */}
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <Calendar bind:value={$day} m:color="brand-orange" locale="tr-TR" labels={{ prevMonth: "Gece önceki ay", nextMonth: "Gece sonraki ay" }} />
      </Section>
    </Card>
  </div>
}
