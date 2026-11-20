import { TreeEditor, Card } from "march/ui"

// pizza siparişi: malzemeleri ağaçta ekle, sil, değiştir; kart pizzayı malzeme emojileriyle çizer
const EMOJI: Record<string, string> = { mantar: "🍄", zeytin: "🫒", biber: "🌶️", domates: "🍅", mısır: "🌽", peynir: "🧀" }
type Pizza = { size?: string; toppings?: unknown[]; extraCheese?: boolean }

export function PizzaOrder() {
  let $order: unknown = { size: "orta", toppings: ["mantar", "zeytin", "biber"], extraCheese: true }
  const $p = ($order ?? {}) as Pizza
  const $face = [...($p.toppings ?? []).map((t) => EMOJI[String(t).toLowerCase()] ?? "❔"), ...($p.extraCheese ? ["🧀"] : [])].join(" ")
  return <div sx={{ flex: "col", gap: 2 }}>
    <Card m:theme="night">
      <div sx={{ flex: ["row", "center", "between"] }}>
        <span sx={{ text: "xl" }}>{`🍕 ${$face}`}</span>
        <span sx={{ text: "sm", color: "brand-orange" }}>{`${$p.size ?? "?"} boy`}</span>
      </div>
    </Card>
    <TreeEditor bind:value={$order} search={false} expand={2} label="Pizza siparişi" history
      schema={{ type: "object", properties: { size: { enum: ["küçük", "orta", "büyük"] }, toppings: { type: "array", items: { type: "string" }, maxItems: 5 } } }} />
  </div>
}
