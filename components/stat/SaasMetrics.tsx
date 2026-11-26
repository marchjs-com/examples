// SaasMetrics: the real-life Stat example.
//
// What it shows: the monthly dashboard of a SaaS product: members, revenue, churn rate and response time, each as a
// Stat inside a Card, in a two-column Grid.
// When to use this pattern: a KPI board where every figure is compared with an earlier period. Two ways to give the
// change: `previous` (Stat computes the change from the old value) or `delta` (you already have the fraction, 0.07
// meaning +7 %).
//
// The important part is `invert`. By default an increase is green and a decrease red. For costs, churn or latency a
// decrease is the good news, so those Stats pass `invert` and the colours swap. The sign and the arrow still tell the
// real direction, so the meaning never depends on colour alone.
// Animation: none of its own. Accessibility: the arrow is decoration; screen readers hear "Up", "Down" or "No change"
// before the change, and a sparkline is an image named by the label with a summary of its values.
import { Stat } from "march/charts"
import { Card, Grid } from "march/ui"
import { users, creditCard, activity, clock } from "march/icons"

// Six months of data for the trend lines (the last value is the current one).
const months = [41200, 42800, 44100, 45900, 47300, 48210]
const mrr = [182000, 189000, 194500, 201000, 212000, 219400]

export function SaasMetrics() {
  // Grid cols={2}: two equal columns; gap={3} is a step of the spacing scale.
  return <Grid cols={2} gap={3}>
    {/* previous: the change is computed from it. spark: the trend line under the value. hint: text after the change.
        Without `format` the value is shown as a plain number (the default is "number"). */}
    <Card><Stat icon={users} label="Toplam üye" value={48210} previous={47300} spark={months} hint="geçen aya göre" /></Card>
    {/* format={["money", "TRY"]}: a pipe name with its argument, so 219400 is written as an amount in lira. */}
    <Card><Stat icon={creditCard} label="Aylık gelir" value={219400} previous={212000} format={["money", "TRY"]} spark={mrr} hint="geçen aya göre" /></Card>
    {/* delta is given directly as a fraction (-0.18 = -18 %). invert: a decrease is good here, so it shows green.
        format={["percent", 1]} writes 0.021 as a percentage with one decimal. */}
    <Card><Stat icon={activity} label="Kayıp oranı" value={0.021} delta={-0.18} invert format={["percent", 1]} hint="iyileşme" /></Card>
    {/* format can also be a function: here it adds the unit. delta +7 % with invert is bad (slower), so it shows red. */}
    <Card><Stat icon={clock} label="Yanıt süresi" value={182} delta={0.07} invert format={(v: number) => `${v} ms`} hint="yavaşladı" /></Card>
  </Grid>
}
