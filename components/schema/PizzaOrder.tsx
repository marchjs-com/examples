import { Form, toast } from "march/ui"
import { schema } from "march/schema"

// pizza siparişi: tek tanımdan form; boy segmentli seçim, malzemeler çoklu, ekstra peynir anahtar
const Pizza = schema({
  size: { type: "pick", label: "Boy", options: ["Küçük", "Orta", "Büyük"], default: "Orta", control: "segmented" },
  toppings: { type: "multi", label: "Malzemeler", options: ["Mantar", "Zeytin", "Mısır", "Biber", "Sucuk"] },
  cheese: { type: "bool", label: "Ekstra peynir 🧀", control: "switch" },
  note: { type: "textarea", label: "Not", max: 120, help: "Zil bozuk, kapıyı çalın gibi" },
})

export function PizzaOrder() {
  return <Form schema={Pizza} submitLabel="Sipariş ver 🍕"
    onSubmit={(v: Record<string, unknown>) => { toast(`${v.size} pizza yolda! ${(v.toppings as string[]).join(", ") || "sade"}`, { kind: "success" }) }} />
}
