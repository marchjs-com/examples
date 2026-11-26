import { Stat } from "march/charts"
import { Card, Grid } from "march/ui"
import { users, creditCard, activity, clock } from "march/icons"

// A SaaS product's monthly dashboard: a real-life row of four Stat boxes.
// Shows members and revenue (more is good), churn rate and response time (less is good), each with its change.
// Use a grid of Stats like this at the top of a dashboard: the four numbers a manager reads before anything else.
// It also shows the two ways to give the change (computed from `previous`, or a ready `delta`) and `invert` for
// metrics where a decrease is the good news.

// Six months of history for the two trend lines. Replace them with your own monthly numbers.
const months = [41200, 42800, 44100, 45900, 47300, 48210]
const mrr = [182000, 189000, 194500, 201000, 212000, 219400]

export function SaasMetrics() {
  // Grid cols={2} lays the four cards out two by two; each Card gives its Stat a surface and padding.
  //
  // Stat props, card by card:
  // - Members: value + previous, so Stat computes the change (+1.9 %); spark draws the six months under the value.
  // - Revenue: the same, with format={["money", "TRY"]} so the value reads as Turkish lira.
  // - Churn rate: delta={-0.18} gives the change directly as a fraction (−18 %) when no previous value is at hand.
  //   `invert` says a decrease is good, so the down arrow is green. format={["percent", 1]}: 0.021 → 2.1 %.
  // - Response time: delta={0.07} is a rise, and with `invert` a rise is bad, so it shows red; a function format adds
  //   the "ms" unit.
  // - hint: the text after each change, here "vs last month", "improvement" and "got slower".
  // Motion: no `animate` prop, so the default spring applies: each number counts up from 0 on first draw and the
  // sparklines draw in. animate={{ enter: false }} shows the first values at once; animate={false} turns motion off;
  // reduced motion is honoured automatically.
  // Accessibility: good and bad are told by the arrow and the sign as well as the color, and screen readers hear
  // "Up" / "Down" before each change; each sparkline is an image named after its label.
  return <Grid cols={2} gap={3}>
    <Card><Stat icon={users} label="Toplam üye" value={48210} previous={47300} spark={months} hint="geçen aya göre" /></Card>
    <Card><Stat icon={creditCard} label="Aylık gelir" value={219400} previous={212000} format={["money", "TRY"]} spark={mrr} hint="geçen aya göre" /></Card>
    <Card><Stat icon={activity} label="Kayıp oranı" value={0.021} delta={-0.18} invert format={["percent", 1]} hint="iyileşme" /></Card>
    <Card><Stat icon={clock} label="Yanıt süresi" value={182} delta={0.07} invert format={(v: number) => `${v} ms`} hint="yavaşladı" /></Card>
  </Grid>
}
