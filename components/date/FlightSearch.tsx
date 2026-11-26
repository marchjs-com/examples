// FlightSearch: the real-life DatePicker example.
//
// What it shows: a flight search. The departure cannot be in the past, the return cannot be before the departure, and
// choosing "one way" switches the return field off. The search button is enabled only when the dates are complete.
// When to use this pattern: two linked dates in a booking form. The second picker's `min` follows the first value.
// Keyboard: type a date in the field's own order, or Alt+Arrow Down opens the calendar; Escape closes it and returns
// focus to the field.
import { DatePicker, Field, Card, Button, Toggle, toast, todayIso, addDays } from "march/ui"
import { search } from "march/icons"

type Day = string | null
// todayIso() is today's date as an ISO string; addDays(iso, n) moves a date by n days.
const today = todayIso()

// $depart / $back are the chosen days, $oneWay switches the return off; ready() says whether the form is complete.
export function FlightSearch() {
  let $depart: Day = addDays(today, 7)
  let $back: Day = addDays(today, 14)
  let $oneWay = false
  const ready = () => !!$depart && ($oneWay || !!$back)
  const find = () => toast(`İstanbul → Antalya · ${$depart}${$oneWay ? " · tek yön" : ` · dönüş ${$back}`}`)
  return <Card title="İstanbul → Antalya" subtitle="1 yetişkin · ekonomi">
    <div sx={{ flex: "col", gap: 3 }}>
      <Toggle bind:value={$oneWay} label="Tek yön" />
      {/* grid: the two fields line up at the top, a hint under one of them does not push it */}
      <div sx={{ cols: 2, gap: 3 }}>
        {/* Departure: min is today and max is about a year ahead, so a date outside is marked invalid and not accepted;
                  firstDay={1} starts weeks on Monday; labels.choose is the accessible name of the calendar button. */}
        <Field label="Gidiş" required>
          <DatePicker bind:value={$depart} min={today} max={addDays(today, 330)} firstDay={1} required
            labels={{ choose: "Gidiş tarihini seç" }} />
        </Field>
        {/* Return: min={$depart ?? today} follows the departure value (a getter, so it updates when the departure changes);
                  disabled follows the one-way toggle; Field's help text explains the state. */}
        <Field label="Dönüş" help={$oneWay ? "Tek yönde dönüş yok" : "Gidişten sonra bir gün"}>
          <DatePicker bind:value={$back} min={$depart ?? today} disabled={$oneWay} firstDay={1}
            labels={{ choose: "Dönüş tarihini seç" }} />
        </Field>
      </div>
      <Button variant="primary" icon={search} disabled={!ready()} on:click={find}>Uçuş ara</Button>
    </div>
  </Card>
}
