// WorldClock: the creative-minimal Combobox example.
//
// What it shows: a world clock. Type a city, pick it, and the local time there is shown in big letters.
// When to use this pattern: choosing one item from a longer list where the user knows what to type. Option objects keep
// a friendly `label` (shown, searched) apart from the real `value` (here a time-zone name used by the clock).
// Keyboard: typing filters the list; arrow keys move, Enter picks, Escape closes. The Field gives the input its label.
import { Combobox, Field } from "march/ui"

// `value` is the IANA time-zone name the clock needs; `label` is what the user reads and types.
const cities = [
  { value: "Europe/Istanbul", label: "İstanbul" }, { value: "Europe/London", label: "Londra" },
  { value: "America/New_York", label: "New York" }, { value: "Asia/Tokyo", label: "Tokyo" },
  { value: "Australia/Sydney", label: "Sidney" }, { value: "America/Sao_Paulo", label: "São Paulo" },
  { value: "Asia/Dubai", label: "Dubai" }, { value: "Europe/Berlin", label: "Berlin" },
]

export function WorldClock() {
  let $zone = "Asia/Tokyo"
  // The time is formatted for the chosen zone; it is read inside the JSX, so it updates when $zone changes (it shows
  // the time of the moment the zone was chosen, it does not tick).
  const time = () => new Date().toLocaleTimeString("tr", { timeZone: $zone, hour: "2-digit", minute: "2-digit" })
  return <div sx={{ flex: "col", gap: 2 }}>
    <Field label="Şehir"><Combobox bind:value={$zone} options={cities} placeholder="Şehir yaz" /></Field>
    <span sx={{ text: "2xl", color: "brand-blue" }}>{time()}</span>
  </div>
}
