// PlanPicker: the real-life example of the choice-control looks.
//
// What it shows: a subscription page. The plan is a RadioGroup in the card look (exactly one plan, with description,
// icon and price tag); the extras are a CheckboxGroup in the soft look (any number); a summary line shows the result.
// When to use this pattern: "pick one" with rich options (RadioGroup, variant="card") next to "pick any" with simple
// ones (CheckboxGroup). Both take the same option objects: value, label and, for cards, hint, icon and meta.
// Accessibility: the options are real radios / checkboxes (Tab, arrow keys or Space as the browser defines them) and
// aria-label names each group.
import { RadioGroup, CheckboxGroup, Card } from "march/ui"
import { users, zap, shieldCheck } from "march/icons"

// Card options: `hint` is the description, `icon` the leading mark, `meta` a small tag at the end (the price).
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
      {/* bind:value on a RadioGroup holds one value, on a CheckboxGroup an array. */}
      <RadioGroup bind:value={$plan} options={PLANS} variant="card" aria-label="Plan" />
      <CheckboxGroup bind:value={$extras} options={EXTRAS} variant="soft" aria-label="Ek özellikler" />
      <span sx={{ text: "sm", color: "muted" }}>Seçilen: {PLANS.find((p) => p.value === $plan)?.label} + {$extras.length} ek</span>
    </div>
  </Card>
}
