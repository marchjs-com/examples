import { useForm, toast } from "march/ui"
import { Wizard } from "march/components/wizard"

// üç adımda bir kahve: boy, süt ve bardağa yazılacak ad; son adım siparişi verir
export function CoffeeWizard() {
  let $order = ""
  // march/ui'de useForm bir alan tanımından formu kurar; Wizard bu formun alanlarını adım adım gösterir
  const form = useForm({
    size: { type: "pick", label: "Boy", options: ["Küçük", "Orta", "Büyük"], default: "Orta" },
    milk: { type: "pick", label: "Süt", options: ["Sütsüz", "İnek sütü", "Yulaf sütü"], default: "Yulaf sütü" },
    name: { type: "text", label: "Bardağa yazılacak ad", required: true },
  }, {}, { onSubmit: (v) => { $order = `☕ ${v.name}: ${v.size} boy, ${v.milk}`; toast("Kahven hazırlanıyor") } })
  return <div sx={{ flex: "col", gap: 2 }}>
    <Wizard form={form} submitLabel="Sipariş ver" m:color="brand-orange"
      steps={[{ title: "Boy", fields: ["size"] }, { title: "Süt", fields: ["milk"] }, { title: "Ad", fields: ["name"] }]} />
    <span sx={{ text: "lg", color: $order ? "brand-orange" : "muted" }}>{$order || "Henüz sipariş yok"}</span>
  </div>
}
