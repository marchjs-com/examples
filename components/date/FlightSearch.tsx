import { DatePicker, Field, Card, Button, Toggle, toast, todayIso, addDays } from "march/ui"
import { search } from "march/icons"

// uçak bileti arama: gidiş bugünden önce, dönüş gidişten önce olamaz; tek yön seçilince dönüş kapanır
type Day = string | null
const today = todayIso()

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
        <Field label="Gidiş" required>
          <DatePicker bind:value={$depart} min={today} max={addDays(today, 330)} firstDay={1} required
            labels={{ choose: "Gidiş tarihini seç" }} />
        </Field>
        <Field label="Dönüş" help={$oneWay ? "Tek yönde dönüş yok" : "Gidişten sonra bir gün"}>
          <DatePicker bind:value={$back} min={$depart ?? today} disabled={$oneWay} firstDay={1}
            labels={{ choose: "Dönüş tarihini seç" }} />
        </Field>
      </div>
      <Button variant="primary" icon={search} disabled={!ready()} on:click={find}>Uçuş ara</Button>
    </div>
  </Card>
}
