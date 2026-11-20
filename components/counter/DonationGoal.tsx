import { Counter } from "march/landing"
import { Button, Card, toast } from "march/ui"
import { heart } from "march/icons"

// bir bağış kampanyası: toplanan tutar odometre gibi döner, hedefe kalan yüzde sayar
const GOAL = 250000

export function DonationGoal() {
  let $raised = 184350
  const give = (n: number) => () => { $raised += n; toast(`${n} ₺ bağış için teşekkürler`) }
  return <Card>
    <div sx={{ flex: "col", gap: 3, p: 2 }}>
      <span sx={{ color: "muted" }}>Köy okuluna kütüphane kampanyası</span>
      <Counter value={() => $raised} mode="roll" format={{ style: "currency", currency: "TRY", maximumFractionDigits: 0 }} class="raised" />
      <span>Hedefin <Counter value={() => Math.min(1, $raised / GOAL)} format={{ style: "percent", maximumFractionDigits: 1 }} /> kadarı toplandı</span>
      <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
        <Button icon={heart} on:click={give(50)}>50 ₺</Button>
        <Button variant="secondary" on:click={give(250)}>250 ₺</Button>
        <Button variant="secondary" on:click={give(1000)}>1000 ₺</Button>
      </div>
    </div>
  </Card>
}
