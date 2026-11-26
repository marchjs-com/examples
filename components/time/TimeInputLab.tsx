// TimeInputLab: the full-featured TimeInput example; it uses every prop at least once.
//
// Props shown here: bind:value, value + onChange, step (seconds, 15 minutes), min / max, required, invalid, disabled,
// readonly, name, id, aria-label / ariaLabel, describedby, onFocus / onBlur, class, picker="clock" with hour12,
// locale, icon, labels and the minute step on the dial, and the common prop m:theme.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// TimeInputLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { TimeInput, Field, Card } from "march/ui"
import { bell } from "march/icons"

// A small layout helper: a muted title above a wrapping row of examples. It is only for this page.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 2 }}>{props.children}</div>
</div>

export function TimeInputLab() {
  // `$` variables are signals; the lines of text beside the inputs read them, so you see every change live.
  let $meet = "14:30"
  let $alarm = "06:45:30"
  let $slot = "10:00"
  let $focus = "yok"
  let $dial = "07:15"
  let $us = "19:40"
  // Derived: true when the appointment is outside working hours (plain text comparison works for "HH:MM").
  const $outside = $slot < "09:00" || $slot > "17:00"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* bind:value is the two-way binding (the field writes the signal, the signal writes the field). `name` is the
        form field name, `class` is a class you can use from CSS or a test to find this instance. Field gives the
        input a visible label. */}
    <Row title="İki yönlü bağ (bind:value), name ve id">
      <Field label="Toplantı"><TimeInput bind:value={$meet} name="meeting" class="lab-time" /></Field>
      <span>Toplantı: {$meet}</span>
    </Row>
    {/* The one-way form: `value` shows the signal, onChange(v) tells you the new value and you decide what to do with
        it. step={1} (seconds) makes the field show and accept seconds: the value becomes "HH:MM:SS". aria-label names
        the field for screen readers when there is no visible label. */}
    <Row title="value + onChange, saniyeli (step=1)">
      <TimeInput value={$alarm} onChange={(v: string) => { $alarm = v }} step={1} aria-label="Alarm" />
      <span>Alarm: {$alarm}</span>
    </Row>
    {/* min / max limit the range, step={900} is 15 minutes (the unit is seconds), `required` forbids an empty value.
        `invalid` marks the field as wrong from your own rule; here the rule is the $outside value.
        ariaLabel is the camelCase spelling of the same accessible name. */}
    <Row title="Mesai içinde (09:00–17:00), 15 dakikalık adımlar, zorunlu">
      <TimeInput bind:value={$slot} min="09:00" max="17:00" step={900} ariaLabel="Randevu" required invalid={$outside} />
      <span sx={{ color: $outside ? "danger" : "success" }}>Randevu: {$slot} {$outside ? "(mesai dışı)" : "(uygun)"}</span>
    </Row>
    {/* picker="clock" adds a clock button and a dial. hour12={false} gives a 24-hour dial (two rings); hour12 gives
        12 hours with an AM / PM switch. `locale` sets the dial's 12 / 24 hours and its AM / PM texts when hour12 is
        not given. `icon` replaces the clock on the button, `labels` replaces the accessible names (choose, hours,
        minutes). On the dial: arrow keys step, Enter moves from hours to minutes and then closes, Escape closes. */}
    <Row title="Saat kadranı: 24 saat (iki halka), 12 saat ÖÖ / ÖS, kendi ikonu ve adları">
      <TimeInput class="lab-dial" bind:value={$dial} picker="clock" hour12={false} labels={{ choose: "Kadranı aç", hours: "Saat", minutes: "Dakika" }} />
      <TimeInput class="lab-us" bind:value={$us} picker="clock" hour12 locale="en-US" icon={bell} step={300} labels={{ choose: "Alarm kur" }} />
      <span>Kadran: {$dial} · ABD: {$us}</span>
    </Row>
    {/* disabled: the field cannot be used or changed. readonly: it shows the value but cannot be changed. */}
    <Row title="Durumlar">
      <TimeInput value="08:00" disabled aria-label="Kapalı saat" />
      <TimeInput value="12:30" readonly aria-label="Öğle arası" />
    </Row>
    {/* describedby points at the id of a hint text, so a screen reader can read the hint with the field's name.
        onFocus / onBlur are plain callbacks; here they only write into a signal that is shown next to the field. */}
    <Row title="Açıklama ve odak">
      <TimeInput value="23:59" aria-label="Son teslim" describedby="lab-deadline-hint"
        onFocus={() => { $focus = "Son teslim" }} onBlur={() => { $focus = "yok" }} />
      <small id="lab-deadline-hint" sx={{ color: "muted" }}>Gece yarısından önce yüklenmeli</small>
      <span>Odak: {$focus}</span>
    </Row>
    {/* m:theme="night" is a common prop (every component takes it): the card and everything in it use the dark theme.
        The same signal $meet is bound again, so editing either field updates the other. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <TimeInput bind:value={$meet} id="lab-night-meeting" aria-label="Koyuda toplantı" />
      </Row>
    </Card>
  </div>
}
