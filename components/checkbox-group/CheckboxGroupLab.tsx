import { CheckboxGroup, Card } from "march/ui"
import { heart, users, zap, shieldCheck } from "march/icons"

// CheckboxGroup'un bütün özellikleri bir arada: değer (bind:value, onChange), seçenekler (metin, dizi, nesne: hint, icon,
// meta, disabled), görünüm (variant), boyut, köşe (shape), kendi işaret ikonu (icon), hareketsiz (animate), renkler
// (colors, m:color), yan yana (inline), durumlar (disabled, readonly, invalid, required), bağlar (id, name, class,
// aria-label, labelledby, describedby, onBlur) ve koyu zemin
const variants = ["classic", "soft", "chip", "card", "toggle"] as const
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

export function CheckboxGroupLab() {
  let $days = ["Sal", "Per"]
  let $plans = ["team"]
  let $changes = 0
  let $touched = false
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Değer (bind:value, metin seçenekler)">
      <CheckboxGroup bind:value={$days} options="Pzt, Sal, Çar, Per, Cum" variant="chip" inline aria-label="Günler" id="lab-days" name="days"
        onBlur={() => $touched = true} />
      <span>Seçili: {$days.length ? $days.join(", ") : "yok"}{$touched ? " · dokunuldu" : ""}</span>
    </Section>
    <Section title="Kart (hint, icon, meta, disabled) ve onChange">
      <CheckboxGroup value={$plans} onChange={(v: string[]) => { $plans = v; $changes++ }} variant="card" options={plans} aria-label="Planlar" />
      <span>Planlar: {$plans.length ? $plans.join(", ") : "yok"} · {$changes} değişiklik</span>
    </Section>
    <Section title="Görünüm">{variants.map((v) => <CheckboxGroup variant={v} value={["a"]} options={[{ value: "a", label: `${v} A` }, { value: "b", label: `${v} B` }]} aria-label={`Görünüm ${v}`} />)}</Section>
    <Section title="Boyut">{sizes.map((s) => <CheckboxGroup size={s} variant="soft" inline value={[1]} options={[1, 2, 3]} aria-label={`Boyut ${s}`} />)}</Section>
    <Section title="Köşe">{shapes.map((s) => <CheckboxGroup shape={s} variant="chip" inline value={["x"]} options={[{ value: "x", label: s }]} aria-label={`Köşe ${s}`} />)}</Section>
    <Section title="Renkler, kendi ikonu, hareketsiz">
      <CheckboxGroup colors="brand" variant="chip" inline value={["Kırmızı", "Mavi", "Yeşil", "Mor"]} options="Kırmızı, Mavi, Yeşil, Mor" aria-label="HADİ renkleri" />
      <CheckboxGroup colors={["brand-pink", "brand-gold"]} variant="soft" inline value={["Pembe"]} options="Pembe, Altın" aria-label="Kendi renklerim" />
      <CheckboxGroup m:color="brand-purple" icon={heart} animate={false} inline value={["Beğen"]} options="Beğen, Kaydet" aria-label="Kalpli" />
    </Section>
    <Section title="Durumlar">
      <CheckboxGroup disabled value={["Açık"]} options="Açık, Kapalı" aria-label="Devre dışı grup" />
      <CheckboxGroup readonly value={["Okunur"]} options="Okunur, Değişmez" aria-label="Salt okunur grup" />
      <div sx={{ flex: "col", gap: 1 }}>
        <span id="lab-terms-title" sx={{ text: "bold" }}>Onaylar</span>
        <CheckboxGroup labelledby="lab-terms-title" describedby="lab-terms-error" invalid required class="lab-terms" options="Koşulları kabul ediyorum, KVKK metnini okudum" />
        <span id="lab-terms-error" sx={{ text: "sm", color: "danger" }}>İki onay da gerekli</span>
      </div>
    </Section>
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <CheckboxGroup variant="toggle" colors="brand" value={["Gece"]} options="Gece, Gündüz, Akşam" aria-label="Koyu grup" />
      </Section>
    </Card>
  </div>
}
