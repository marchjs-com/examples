import { NumberInput, Card } from "march/ui"

// hesabı böl: tutar, bahşiş ve kişi sayısı; kişi başı tutar anında hesaplanır (alanlarda ↑ / ↓ da çalışır)
export function BillSplit() {
  let $bill = 1240
  let $tip = 10
  let $people = 4
  const $each = (($bill ?? 0) * (1 + ($tip ?? 0) / 100)) / Math.max(1, $people ?? 1)
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 2 }}>
      <NumberInput bind:value={$bill} prefix="₺" decimals={2} minDecimals={2} grouping min={0} aria-label="Hesap" />
      <div sx={{ flex: "row", gap: 2 }}>
        <NumberInput bind:value={$tip} suffix="%" min={0} max={30} step={5} decimals={0} aria-label="Bahşiş" />
        <NumberInput bind:value={$people} suffix="kişi" min={1} max={20} decimals={0} aria-label="Kişi sayısı" />
      </div>
      <span sx={{ text: ["xl", "bold"], color: "brand-gold" }}>Kişi başı ₺{$each.toFixed(2)}</span>
    </div>
  </Card>
}
