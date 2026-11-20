import { KeyValueEditor, Card } from "march/ui"

// kek tarifi: malzeme → gram; sayılar sayı olarak saklanır, toplam hamur ağırlığı canlı hesaplanır
export function CakeRecipe() {
  let $recipe: Record<string, string | number> = { "un": 250, "şeker": 180, "tereyağı": 120, "yumurta": 150 }
  const $total = Object.values($recipe).reduce((sum: number, g) => sum + (typeof g === "number" ? g : 0), 0)
  return <Card title="Limonlu kek" subtitle={`Toplam hamur: ${$total} g`}>
    <KeyValueEditor bind:value={$recipe} numbers keyPlaceholder="Malzeme" valuePlaceholder="Gram"
      labels={{ key: "Malzeme", value: "Gram", remove: "Malzemeyi çıkar", add: "Malzeme ekle", duplicate: "Bu malzeme zaten var" }} />
    <span sx={{ text: "sm", color: "muted" }}>{$total > 800 ? "Büyük kalıp gerekecek." : "Orta boy kalıba sığar."}</span>
  </Card>
}
