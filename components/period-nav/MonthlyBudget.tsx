// MonthlyBudget: the real-life PeriodNav example.
//
// A monthly budget: the arrows change the month (the data exists only for the last six months, so the arrow turns off at
// each end), a "this month" button goes back to today, and the month's income, spending and share spent follow. Use this
// pattern for any view that is stepped by period (a month, a week, a day) with a "back to now" button.
import { PeriodNav, Card, Progress } from "march/ui"

const now = new Date()
// The month name for an offset from the current month (0 = this month, -1 = last month), formatted in Turkish.
const monthName = (offset: number) => new Intl.DateTimeFormat("tr", { month: "long", year: "numeric" }).format(new Date(now.getFullYear(), now.getMonth() + offset, 1))
// Spending per month (in a real app this would be a query()). A made-up formula that gives a different number per month.
const spent = (offset: number) => 18000 + ((Math.abs(offset) * 37 + 5) % 9) * 1400
const income = 32000
const tl = (n: number) => new Intl.NumberFormat("tr", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n)

export function MonthlyBudget() {
  // How many months away from the current one (0 = this month, negative = the past).
  let $offset = 0
  return <Card title="Bütçem">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* - title as a function: PeriodNav reads it live, so the month name follows $offset. The title sits between
          the arrows.
        - onPrev / onNext: called by the arrows. onToday + today: shows a "today" button with our own text and runs
          onToday (back to offset 0).
        - prevDisabled / nextDisabled: turn an arrow off at the first and last period (here: five months back, and no
          future).
        - labels: group = the accessible name of the whole group, previous / next = the accessible names of the arrows
          (they are icon buttons, so they need names). All buttons are in the Tab order and work with Enter and Space. */}
      <PeriodNav title={() => monthName($offset)} onPrev={() => $offset--} onNext={() => $offset++} onToday={() => $offset = 0} today="Bu ay"
        prevDisabled={$offset <= -5} nextDisabled={$offset >= 0} labels={{ group: "Ay", previous: "Önceki ay", next: "Sonraki ay" }} />
      <div sx={{ flex: ["row", "between"] }}>
        <span>{`Gelir: ${tl(income)}`}</span>
        <span sx={{ color: "danger" }}>{`Gider: ${tl(spent($offset))}`}</span>
        <span sx={{ text: "bold", color: "success" }}>{`Kalan: ${tl(income - spent($offset))}`}</span>
      </div>
      {/* Progress shows the share of the income already spent; its label is the accessible name. */}
      <Progress value={Math.round((spent($offset) / income) * 100)} label="Harcanan pay" />
    </div>
  </Card>
}
