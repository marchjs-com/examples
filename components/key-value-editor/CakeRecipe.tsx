// CakeRecipe: the creative-minimal KeyValueEditor example.
//
// What it shows: a cake recipe as an editable ingredient → grams table. Because of `numbers`, the grams are stored as
// real numbers, so the total weight of the dough can be added up live and a hint under the table reacts to it.
// When to use this pattern: any small "name → amount" list the visitor edits freely (recipes, price lists, quotas),
// where the result is a plain object you can compute with.
//
// Animation: none of its own. Accessibility: the editor is a role="group"; the labels below name every key and value
// field for screen readers, and a duplicate ingredient is flagged on its row.
import { KeyValueEditor, Card } from "march/ui"

export function CakeRecipe() {
  // $recipe is a signal holding the whole object; bind:value below keeps it in sync both ways (typing updates it, and
  // changing it from code redraws the rows).
  let $recipe: Record<string, string | number> = { "un": 250, "şeker": 180, "tereyağı": 120, "yumurta": 150 }
  // A derived signal: recomputed whenever $recipe changes. Only numeric values are added, which is safe because
  // `numbers` below stores numeric-looking input as numbers (anything else stays text and is skipped).
  const $total = Object.values($recipe).reduce((sum: number, g) => sum + (typeof g === "number" ? g : 0), 0)
  return <Card title="Limonlu kek" subtitle={`Toplam hamur: ${$total} g`}>
    {/* bind:value two-way binds the object. `numbers`: numeric-looking values become numbers. keyPlaceholder and
        valuePlaceholder are the hints in the empty fields. `labels` replaces every text the editor writes itself
        (field names, the remove and add buttons, the duplicate-key message), which here also makes them Turkish. */}
    <KeyValueEditor bind:value={$recipe} numbers keyPlaceholder="Malzeme" valuePlaceholder="Gram"
      labels={{ key: "Malzeme", value: "Gram", remove: "Malzemeyi çıkar", add: "Malzeme ekle", duplicate: "Bu malzeme zaten var" }} />
    {/* A live hint that depends on the computed total. */}
    <span sx={{ text: "sm", color: "muted" }}>{$total > 800 ? "Büyük kalıp gerekecek." : "Orta boy kalıba sığar."}</span>
  </Card>
}
