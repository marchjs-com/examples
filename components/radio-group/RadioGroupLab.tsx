// RadioGroupLab: the full-featured RadioGroup example; it uses every prop at least once.
//
//  Props shown here: value (bind:value, onChange), options (a text, an array, objects with hint / icon / meta /
// disabled),
//  variant (all six, segmented included), size, shape, animate, colors and m:color, inline, disabled / readonly /
// invalid /
// required, id, name, class, aria-label, labelledby, describedby, onBlur, and a dark surface.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// RadioGroupLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { RadioGroup, Card } from "march/ui"
import { users, zap, shieldCheck } from "march/icons"

// The looks the Lab walks through.
const variants = ["classic", "soft", "chip", "card", "toggle", "segmented"] as const
// The three sizes.
const sizes = ["sm", "md", "lg"] as const
// The corner shapes (used by the toggle look).
const shapes = ["square", "rounded", "circle"] as const
// Options as objects: value, label, plus optional hint (small text), icon, meta (text at the end) and disabled.
const plans = [
  { value: "free", label: "Ücretsiz", hint: "Bir kişi", icon: users, meta: "₺0" },
  { value: "team", label: "Ekip", hint: "10 kişiye kadar", icon: zap, meta: "₺499/ay" },
  { value: "business", label: "Kurumsal", hint: "Bu hesapta kapalı", icon: shieldCheck, meta: "Teklif", disabled: true },
]

// A small helper: a muted title with its examples under it, wrapping to the next line when they do not fit.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap"], gap: 4 }}>{props.children}</div>
</div>

export function RadioGroupLab() {
  // The chosen size of the first group.
  let $size = "M"
  // The chosen plan of the card group.
  let $plan = "team"
  // How many times onChange fired.
  let $changes = 0
  // Set by onBlur: whether the first group has lost focus once.
  let $touched = false
  return <div sx={{ flex: "col", gap: 4 }}>
    {/* bind:value keeps $size in step; options as a comma-separated text; variant="chip"; inline puts the options in a
        row;
        aria-label names the group; id lands on the first radio and name on all of them; onBlur reports lost focus. */}
    <Section title="Değer (bind:value, metin seçenekler)">
      <RadioGroup bind:value={$size} options="XS, S, M, L, XL" variant="chip" inline aria-label="Beden" id="lab-size" name="size"
        onBlur={() => $touched = true} />
      <span>Seçili: {$size}{$touched ? " · dokunuldu" : ""}</span>
    </Section>
    {/* value + onChange instead of bind:value: you set the value yourself. Card look with hint, icon, meta and a
        disabled option. */}
    <Section title="Kart (hint, icon, meta, disabled) ve onChange">
      <RadioGroup value={$plan} onChange={(v: string) => { $plan = v; $changes++ }} variant="card" options={plans} aria-label="Plan" />
      <span>Plan: {$plan} · {$changes} değişiklik</span>
    </Section>
    {/* All six looks (classic, soft, chip, card, toggle, segmented). */}
    <Section title="Görünüm">{variants.map((v) => <RadioGroup variant={v} value="a" options={[{ value: "a", label: `${v} A` }, { value: "b", label: `${v} B` }]} aria-label={`Görünüm ${v}`} />)}</Section>
    {/* The three sizes; options can also be plain numbers. */}
    <Section title="Boyut">{sizes.map((s) => <RadioGroup size={s} variant="soft" inline value={1} options={[1, 2, 3]} aria-label={`Boyut ${s}`} />)}</Section>
    {/* shape: the corner shape of the options (square, rounded, circle). */}
    <Section title="Köşe (toggle görünümünde)">{shapes.map((s) => <RadioGroup shape={s} variant="toggle" value="x" options={[{ value: "x", label: s }, { value: "y", label: "öteki" }]} aria-label={`Köşe ${s}`} />)}</Section>
    {/* colors="brand": the four brand colours across the options; colors with a list: your own tokens; m:color: one
        colour
        token for the whole group; animate={false}: no motion in this group (the motion engine already honours reduced
        motion). */}
    <Section title="Renkler, hareketsiz">
      <RadioGroup colors="brand" variant="chip" inline value="Mavi" options="Turuncu, Mavi, Yeşil, Mor" aria-label="HADİ renkleri" />
      <RadioGroup colors={["brand-pink", "brand-gold"]} variant="soft" inline value="Altın" options="Pembe, Altın" aria-label="Kendi renklerim" />
      <RadioGroup m:color="brand-purple" animate={false} inline value="Hemen" options="Hemen, Sonra" aria-label="Hareketsiz" />
    </Section>
    {/* disabled and readonly lock the group; invalid and required set aria-invalid and aria-required; labelledby and
        describedby point at the visible title and the error text by id. */}
    <Section title="Durumlar">
      <RadioGroup disabled value="Açık" options="Açık, Kapalı" aria-label="Devre dışı grup" />
      <RadioGroup readonly value="Okunur" options="Okunur, Değişmez" aria-label="Salt okunur grup" />
      <div sx={{ flex: "col", gap: 1 }}>
        <span id="lab-invoice-title" sx={{ text: "bold" }}>Fatura türü</span>
        <RadioGroup labelledby="lab-invoice-title" describedby="lab-invoice-error" invalid required class="lab-invoice" options="Bireysel, Kurumsal fatura" />
        <span id="lab-invoice-error" sx={{ text: "sm", color: "danger" }}>Bir fatura türü seç</span>
      </div>
    </Section>
    {/* The same component on a dark surface (m:theme="night" works on every component). */}
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <RadioGroup variant="segmented" colors="brand" value="Gece" options="Gece, Gündüz, Akşam" aria-label="Koyu grup" />
      </Section>
    </Card>
  </div>
}
