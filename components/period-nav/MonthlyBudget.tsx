import { PeriodNav, Card, Progress } from "march/ui"

// aylık bütçe: oklar ayı değiştirir (veri yalnız son altı ay için: uçlarda ok kapanır), "Bu ay" bugüne döner;
// ayın geliri, gideri ve harcanan payı. title bir işlev: PeriodNav onu canlı okur
const now = new Date()
const monthName = (offset: number) => new Intl.DateTimeFormat("tr", { month: "long", year: "numeric" }).format(new Date(now.getFullYear(), now.getMonth() + offset, 1))
// her ayın gideri (gerçekte bir query() olurdu)
const spent = (offset: number) => 18000 + ((Math.abs(offset) * 37 + 5) % 9) * 1400
const income = 32000
const tl = (n: number) => new Intl.NumberFormat("tr", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n)

export function MonthlyBudget() {
  let $offset = 0
  return <Card title="Bütçem">
    <div sx={{ flex: "col", gap: 3 }}>
      <PeriodNav title={() => monthName($offset)} onPrev={() => $offset--} onNext={() => $offset++} onToday={() => $offset = 0} today="Bu ay"
        prevDisabled={$offset <= -5} nextDisabled={$offset >= 0} labels={{ group: "Ay", previous: "Önceki ay", next: "Sonraki ay" }} />
      <div sx={{ flex: ["row", "between"] }}>
        <span>{`Gelir: ${tl(income)}`}</span>
        <span sx={{ color: "danger" }}>{`Gider: ${tl(spent($offset))}`}</span>
        <span sx={{ text: "bold", color: "success" }}>{`Kalan: ${tl(income - spent($offset))}`}</span>
      </div>
      <Progress value={Math.round((spent($offset) / income) * 100)} label="Harcanan pay" />
    </div>
  </Card>
}
