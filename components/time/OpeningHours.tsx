// OpeningHours: the real-life TimeInput example.
//
// What it shows: the opening hours of a coffee shop. Weekday and Saturday have an opening and a closing time, Sunday is
// an optional switch. The closing time may not be before the opening time, so a closing field is limited by the
// opening field and a Field shows an error message when the pair is wrong; the Save button stays disabled until
// both pairs are valid.
// When to use this pattern: any form where two times belong together as a range (opening hours, booking windows,
// shifts). The native time field already gives you the keyboard editing and the 12 / 24 hour display of the user's
// locale, so the example only adds the range rule.
import { TimeInput, Field, Toggle, Button, Card, toast } from "march/ui"
import { save } from "march/icons"

export function OpeningHours() {
  // `$` variables are signals: everything that reads them updates when they change. Times are "HH:MM" strings.
  let $open = "08:00"
  let $close = "20:00"
  let $satOpen = "09:30"
  let $satClose = "17:00"
  let $sunday = false
  // Derived values. "HH:MM" strings with the same length compare correctly as plain text, so `<=` is enough here.
  // They are recomputed whenever the times change, which re-draws the error messages and the Save button below.
  const $weekBad = $close <= $open
  const $satBad = $satClose <= $satOpen
  // Save only shows a toast; a real app would send the values to a server here.
  const store = () => toast(`Kaydedildi: hafta içi ${$open}–${$close}, cumartesi ${$satOpen}–${$satClose}${$sunday ? ", pazar açık" : ""}`)
  return <Card title="Çalışma saatleri" subtitle="Kahve Durağı · Kadıköy">
    <div sx={{ cols: 2, gap: 3 }}>
      {/* Field gives each input a visible label and shows the `error` text under it. bind:value keeps the signal
          and the field in sync both ways. min / max set the allowed range: the browser marks times outside it as
          invalid. `required` forbids an empty value. */}
      <Field label="Hafta içi açılış"><TimeInput bind:value={$open} min="06:00" max="12:00" required /></Field>
      {/* `error` is null when all is well; a text shows the message under the field. The closing field's `min`
          follows the opening time, so the range rule is expressed by the field itself as well as by the message. */}
      <Field label="Hafta içi kapanış" error={$weekBad ? "Kapanış açılıştan sonra olmalı" : null}>
        <TimeInput bind:value={$close} min={$open} max="23:30" required />
      </Field>
      {/* Saturday uses the same pattern without the outer min / max limits. */}
      <Field label="Cumartesi açılış"><TimeInput bind:value={$satOpen} /></Field>
      <Field label="Cumartesi kapanış" error={$satBad ? "Kapanış açılıştan sonra olmalı" : null}>
        <TimeInput bind:value={$satClose} min={$satOpen} />
      </Field>
    </div>
    <div sx={{ flex: ["row", "between"], gap: 2, mt: 3 }}>
      {/* Toggle is a real switch (role="switch", Space / Enter toggle it); its label is clickable too. */}
      <Toggle bind:value={$sunday} label="Pazar da açık" />
      {/* `disabled` blocks the click while either range is wrong, so invalid hours can never be saved. */}
      <Button icon={save} disabled={$weekBad || $satBad} on:click={store}>Kaydet</Button>
    </div>
  </Card>
}
