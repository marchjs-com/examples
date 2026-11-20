import { RadioGroup, CheckboxGroup, Card } from "march/ui"
import { users, zap, shieldCheck } from "march/icons"

// abonelik sayfası: plan kart görünümünde, ek özellikler yumuşak kutularla; seçim özetini altta gösterir
const PLANS = [
  { value: "free", label: "Ücretsiz", hint: "Bir kişi, temel özellikler", icon: users, meta: "₺0" },
  { value: "team", label: "Ekip", hint: "10 kişiye kadar, paylaşılan alanlar", icon: zap, meta: "₺499/ay" },
  { value: "business", label: "Kurumsal", hint: "Tek oturum açma, denetim kaydı, öncelikli destek", icon: shieldCheck, meta: "Teklif al" },
]
const EXTRAS = [{ value: "backup", label: "Günlük yedek" }, { value: "domain", label: "Kendi alan adın" }, { value: "support", label: "7/24 destek" }]

export function PlanPicker() {
  let $plan = "team"
  let $extras = ["backup"]
  // full width up to 40rem: the cards share the row instead of shrinking to their narrowest
  return <Card title="Planını seç" sx={{ w: "md" }}>
    <div sx={{ flex: "col", gap: 3 }}>
      <RadioGroup bind:value={$plan} options={PLANS} variant="card" aria-label="Plan" />
      <CheckboxGroup bind:value={$extras} options={EXTRAS} variant="soft" aria-label="Ek özellikler" />
      <span sx={{ text: "sm", color: "muted" }}>Seçilen: {PLANS.find((p) => p.value === $plan)?.label} + {$extras.length} ek</span>
    </div>
  </Card>
}
