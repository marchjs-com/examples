import { Roadmap } from "march/landing"
import { Button } from "march/ui"

// pizza takibi: her basışta sipariş bir adım ilerler; geçen adımlar biter, sıradaki yanıp söner
const STEPS = [
  { title: "Sipariş alındı", body: "Margarita, bol peynir 🧀" },
  { title: "Fırında", body: "Taş fırın, 3 dakika 🔥" },
  { title: "Yolda", body: "Kurye köşeyi döndü 🛵" },
  { title: "Afiyet olsun", body: "Kapıdayız 🍕" },
]

export function PizzaTracker() {
  let $stage = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button on:click={() => $stage = $stage >= STEPS.length - 1 ? 0 : $stage + 1}>{$stage >= STEPS.length - 1 ? "Yeni sipariş" : "Sonraki adım"}</Button>
    {() => {
      const stage = $stage
      return <Roadmap scroll={false} labels={{ done: "Tamam", now: "Şimdi", next: "Bekliyor" }}
        items={STEPS.map((s, i) => ({ ...s, status: (i < stage ? "done" : i === stage ? "now" : "next") as "done" | "now" | "next" }))} />
    }}
  </div>
}
