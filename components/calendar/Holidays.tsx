import { Calendar } from "march/ui"

// resmi tatil takvimi: tatil günlerinin yanında nokta; bir güne basınca o günün adı yazar
type Day = string | null
const holidays: Record<string, string> = {
  "01-01": "Yılbaşı", "04-23": "Ulusal Egemenlik ve Çocuk Bayramı", "05-01": "Emek ve Dayanışma Günü",
  "05-19": "Gençlik ve Spor Bayramı", "07-15": "Demokrasi ve Milli Birlik Günü", "08-30": "Zafer Bayramı", "10-29": "Cumhuriyet Bayramı",
}
const nameOf = (iso: Day) => (iso && holidays[iso.slice(5)]) || "sıradan bir gün"

export function Holidays() {
  let $day: Day = "2026-10-29"
  return <div sx={{ flex: "col", gap: 2 }}>
    <Calendar bind:value={$day} firstDay={1} m:color="brand-orange"
      renderDay={(iso: string, d: number) => (holidays[iso.slice(5)] ? <b>{`${d}•`}</b> : d)} />
    <span sx={{ text: "bold" }}>{$day}: {nameOf($day)}</span>
  </div>
}
