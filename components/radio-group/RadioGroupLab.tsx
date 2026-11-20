import { RadioGroup, Card } from "march/ui"
import { users, zap, shieldCheck } from "march/icons"

// RadioGroup'un bütün özellikleri bir arada: değer (bind:value, onChange), seçenekler (metin, dizi, nesne: hint, icon,
// meta, disabled), görünüm (segmented dahil), boyut, köşe (shape), hareketsiz (animate), renkler (colors, m:color),
// yan yana (inline), durumlar (disabled, readonly, invalid, required), bağlar (id, name, class, aria-label,
// labelledby, describedby, onBlur) ve koyu zemin
const variants = ["classic", "soft", "chip", "card", "toggle", "segmented"] as const
const sizes = ["sm", "md", "lg"] as const
const shapes = ["square", "rounded", "circle"] as const
const plans = [
  { value: "free", label: "Ücretsiz", hint: "Bir kişi", icon: users, meta: "₺0" },
  { value: "team", label: "Ekip", hint: "10 kişiye kadar", icon: zap, meta: "₺499/ay" },
  { value: "business", label: "Kurumsal", hint: "Bu hesapta kapalı", icon: shieldCheck, meta: "Teklif", disabled: true },
]

// bir bölüm: üstte adı, altında örnekler; sığmazsa alt satıra
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap"], gap: 4 }}>{props.children}</div>
</div>

export function RadioGroupLab() {
  let $size = "M"
  let $plan = "team"
  let $changes = 0
  let $touched = false
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Değer (bind:value, metin seçenekler)">
      <RadioGroup bind:value={$size} options="XS, S, M, L, XL" variant="chip" inline aria-label="Beden" id="lab-size" name="size"
        onBlur={() => $touched = true} />
      <span>Seçili: {$size}{$touched ? " · dokunuldu" : ""}</span>
    </Section>
    <Section title="Kart (hint, icon, meta, disabled) ve onChange">
      <RadioGroup value={$plan} onChange={(v: string) => { $plan = v; $changes++ }} variant="card" options={plans} aria-label="Plan" />
      <span>Plan: {$plan} · {$changes} değişiklik</span>
    </Section>
    <Section title="Görünüm">{variants.map((v) => <RadioGroup variant={v} value="a" options={[{ value: "a", label: `${v} A` }, { value: "b", label: `${v} B` }]} aria-label={`Görünüm ${v}`} />)}</Section>
    <Section title="Boyut">{sizes.map((s) => <RadioGroup size={s} variant="soft" inline value={1} options={[1, 2, 3]} aria-label={`Boyut ${s}`} />)}</Section>
    <Section title="Köşe (toggle görünümünde)">{shapes.map((s) => <RadioGroup shape={s} variant="toggle" value="x" options={[{ value: "x", label: s }, { value: "y", label: "öteki" }]} aria-label={`Köşe ${s}`} />)}</Section>
    <Section title="Renkler, hareketsiz">
      <RadioGroup colors="brand" variant="chip" inline value="Mavi" options="Turuncu, Mavi, Yeşil, Mor" aria-label="HADİ renkleri" />
      <RadioGroup colors={["brand-pink", "brand-gold"]} variant="soft" inline value="Altın" options="Pembe, Altın" aria-label="Kendi renklerim" />
      <RadioGroup m:color="brand-purple" animate={false} inline value="Hemen" options="Hemen, Sonra" aria-label="Hareketsiz" />
    </Section>
    <Section title="Durumlar">
      <RadioGroup disabled value="Açık" options="Açık, Kapalı" aria-label="Devre dışı grup" />
      <RadioGroup readonly value="Okunur" options="Okunur, Değişmez" aria-label="Salt okunur grup" />
      <div sx={{ flex: "col", gap: 1 }}>
        <span id="lab-invoice-title" sx={{ text: "bold" }}>Fatura türü</span>
        <RadioGroup labelledby="lab-invoice-title" describedby="lab-invoice-error" invalid required class="lab-invoice" options="Bireysel, Kurumsal fatura" />
        <span id="lab-invoice-error" sx={{ text: "sm", color: "danger" }}>Bir fatura türü seç</span>
      </div>
    </Section>
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <RadioGroup variant="segmented" colors="brand" value="Gece" options="Gece, Gündüz, Akşam" aria-label="Koyu grup" />
      </Section>
    </Card>
  </div>
}
