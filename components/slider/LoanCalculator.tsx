import { Slider, Field, Card, Button, toast } from "march/ui"

// ihtiyaç kredisi hesaplayıcı: tutar ve vade kaydırıcıları; aylık taksit ve toplam geri ödeme canlı hesaplanır
const rate = 0.0349 // aylık faiz
const tl = (n: number) => `${Math.round(n).toLocaleString("tr-TR")} ₺`

export function LoanCalculator() {
  let $amount = 100000
  let $months = 24
  const $monthly = $amount * rate / (1 - Math.pow(1 + rate, -$months))
  return <Card title="İhtiyaç kredisi" subtitle="Aylık %3,49 faiz">
    <div sx={{ flex: "col", gap: 3 }}>
      <Field label="Tutar" help="10.000 ₺ ile 500.000 ₺ arası">
        <Slider bind:value={$amount} min={10000} max={500000} step={5000} format={tl} track m:color="brand-blue" />
      </Field>
      <Field label="Vade">
        <Slider bind:value={$months} min={3} max={36} step={3} format={(v: number) => `${v} ay`} m:color="brand-purple" />
      </Field>
      <div sx={{ flex: ["row", "between", "center"] }}>
        <div sx={{ flex: "col" }}>
          <strong sx={{ text: "xl" }}>{tl($monthly)} / ay</strong>
          <span sx={{ text: "sm", color: "muted" }}>Toplam geri ödeme: {tl($monthly * $months)}</span>
        </div>
        <Button variant="primary" on:click={() => toast(`Başvuru alındı: ${tl($amount)}, ${$months} ay`)}>Başvur</Button>
      </div>
    </div>
  </Card>
}
