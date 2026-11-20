import { Stat } from "march/charts"
import { Card, Grid } from "march/ui"
import { users, creditCard, activity, clock } from "march/icons"

// bir SaaS ürününün aylık paneli: üye, gelir, kayıp oranı (azalması iyi) ve yanıt süresi (azalması iyi)
const months = [41200, 42800, 44100, 45900, 47300, 48210]
const mrr = [182000, 189000, 194500, 201000, 212000, 219400]

export function SaasMetrics() {
  return <Grid cols={2} gap={3}>
    <Card><Stat icon={users} label="Toplam üye" value={48210} previous={47300} spark={months} hint="geçen aya göre" /></Card>
    <Card><Stat icon={creditCard} label="Aylık gelir" value={219400} previous={212000} format={["money", "TRY"]} spark={mrr} hint="geçen aya göre" /></Card>
    <Card><Stat icon={activity} label="Kayıp oranı" value={0.021} delta={-0.18} invert format={["percent", 1]} hint="iyileşme" /></Card>
    <Card><Stat icon={clock} label="Yanıt süresi" value={182} delta={0.07} invert format={(v: number) => `${v} ms`} hint="yavaşladı" /></Card>
  </Grid>
}
