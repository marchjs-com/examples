import { Combobox, Field } from "march/ui"

// dünya saati: bir şehir yaz, oradaki saat kocaman görünsün
const cities = [
  { value: "Europe/Istanbul", label: "İstanbul" }, { value: "Europe/London", label: "Londra" },
  { value: "America/New_York", label: "New York" }, { value: "Asia/Tokyo", label: "Tokyo" },
  { value: "Australia/Sydney", label: "Sidney" }, { value: "America/Sao_Paulo", label: "São Paulo" },
  { value: "Asia/Dubai", label: "Dubai" }, { value: "Europe/Berlin", label: "Berlin" },
]

export function WorldClock() {
  let $zone = "Asia/Tokyo"
  const time = () => new Date().toLocaleTimeString("tr", { timeZone: $zone, hour: "2-digit", minute: "2-digit" })
  return <div sx={{ flex: "col", gap: 2 }}>
    <Field label="Şehir"><Combobox bind:value={$zone} options={cities} placeholder="Şehir yaz" /></Field>
    <span sx={{ text: "2xl", color: "brand-blue" }}>{time()}</span>
  </div>
}
