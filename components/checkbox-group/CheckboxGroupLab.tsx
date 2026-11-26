// CheckboxGroupLab: the full-featured CheckboxGroup example; it uses every prop at least once.
//
// Props shown here: value (bind:value, onChange), options (text, array, objects with hint / icon / meta / disabled),
// variant, size, shape, icon (your own mark), animate, colors and the common prop m:color, inline, the states disabled /
// readonly / invalid / required, the hooks id, name, class, aria-label, labelledby, describedby, onBlur, and a dark surface.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CheckboxGroupLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { CheckboxGroup, Card } from "march/ui"
import { heart, users, zap, shieldCheck } from "march/icons"

const variants = ["classic", "soft", "chip", "card", "toggle"] as const
const sizes = ["sm", "md", "lg"] as const
const shapes = ["square", "rounded", "circle"] as const
// Option objects: `value` is what goes into the array, `label` is the text. In the card variant `hint` (description),
// `icon` and `meta` (a price, a tag) are drawn too; `disabled: true` locks one option only.
const plans = [
  { value: "free", label: "Ücretsiz", hint: "Bir kişi", icon: users, meta: "₺0" },
  { value: "team", label: "Ekip", hint: "10 kişiye kadar", icon: zap, meta: "₺499/ay" },
  { value: "business", label: "Kurumsal", hint: "Bu hesapta kapalı", icon: shieldCheck, meta: "Teklif", disabled: true },
]

// A layout helper: a caption above, the examples below in a wrapping row. Only the Lab uses it.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap"], gap: 4 }}>{props.children}</div>
</div>

export function CheckboxGroupLab() {
  // The checked values of the first two groups, a counter of onChange calls and whether the first group was blurred.
  let $days = ["Sal", "Per"]
  let $plans = ["team"]
  let $changes = 0
  let $touched = false
  return <div sx={{ flex: "col", gap: 4 }}>
    {/* bind:value keeps $days and the checked boxes in sync both ways. A comma-separated text in `options` makes each
        part both the value and the label. variant="chip" + inline gives a row of pills. aria-label names the group
        for screen readers; id and name go to the first real input (so a form or a label can reach it); onBlur runs
        when focus leaves a box. */}
    <Section title="Değer (bind:value, metin seçenekler)">
      <CheckboxGroup bind:value={$days} options="Pzt, Sal, Çar, Per, Cum" variant="chip" inline aria-label="Günler" id="lab-days" name="days"
        onBlur={() => $touched = true} />
      <span>Seçili: {$days.length ? $days.join(", ") : "yok"}{$touched ? " · dokunuldu" : ""}</span>
    </Section>
    {/* value + onChange instead of bind:value: you receive the new array and decide what to do with it (validate,
        save, count). variant="card" is the look that shows hint, icon and meta of the option objects above. */}
    <Section title="Kart (hint, icon, meta, disabled) ve onChange">
      <CheckboxGroup value={$plans} onChange={(v: string[]) => { $plans = v; $changes++ }} variant="card" options={plans} aria-label="Planlar" />
      <span>Planlar: {$plans.length ? $plans.join(", ") : "yok"} · {$changes} değişiklik</span>
    </Section>
    {/* variant: classic, soft, chip, card or toggle. Options can be objects ({ value, label }). */}
    <Section title="Görünüm">{variants.map((v) => <CheckboxGroup variant={v} value={["a"]} options={[{ value: "a", label: `${v} A` }, { value: "b", label: `${v} B` }]} aria-label={`Görünüm ${v}`} />)}</Section>
    {/* size: sm / md / lg. Options may also be a plain array of values (numbers here): each is its own label. */}
    <Section title="Boyut">{sizes.map((s) => <CheckboxGroup size={s} variant="soft" inline value={[1]} options={[1, 2, 3]} aria-label={`Boyut ${s}`} />)}</Section>
    {/* shape: square, rounded or circle corners of the boxes / chips. */}
    <Section title="Köşe">{shapes.map((s) => <CheckboxGroup shape={s} variant="chip" inline value={["x"]} options={[{ value: "x", label: s }]} aria-label={`Köşe ${s}`} />)}</Section>
    {/* colors="brand" gives each option the next brand colour in turn; an array of colour tokens does the same with
        your own list. m:color is the common prop that sets one colour token for the whole group. icon replaces the
        tick with your own mark; animate={false} switches the box motion off (otherwise the motion engine already
        honours reduced motion and the global speed / "Stop all" settings). */}
    <Section title="Renkler, kendi ikonu, hareketsiz">
      <CheckboxGroup colors="brand" variant="chip" inline value={["Kırmızı", "Mavi", "Yeşil", "Mor"]} options="Kırmızı, Mavi, Yeşil, Mor" aria-label="HADİ renkleri" />
      <CheckboxGroup colors={["brand-pink", "brand-gold"]} variant="soft" inline value={["Pembe"]} options="Pembe, Altın" aria-label="Kendi renklerim" />
      <CheckboxGroup m:color="brand-purple" icon={heart} animate={false} inline value={["Beğen"]} options="Beğen, Kaydet" aria-label="Kalpli" />
    </Section>
    {/* States: disabled and readonly lock the whole group (the real inputs are disabled, so Tab skips them).
        The last group shows the accessible error pattern: labelledby points to the visible title, describedby to
        the error text, invalid sets aria-invalid and required marks the group as required. */}
    <Section title="Durumlar">
      <CheckboxGroup disabled value={["Açık"]} options="Açık, Kapalı" aria-label="Devre dışı grup" />
      <CheckboxGroup readonly value={["Okunur"]} options="Okunur, Değişmez" aria-label="Salt okunur grup" />
      <div sx={{ flex: "col", gap: 1 }}>
        <span id="lab-terms-title" sx={{ text: "bold" }}>Onaylar</span>
        <CheckboxGroup labelledby="lab-terms-title" describedby="lab-terms-error" invalid required class="lab-terms" options="Koşulları kabul ediyorum, KVKK metnini okudum" />
        <span id="lab-terms-error" sx={{ text: "sm", color: "danger" }}>İki onay da gerekli</span>
      </div>
    </Section>
    {/* m:theme="night" draws this card in the dark theme whatever the page theme is: a check that the toggle look
        stays readable on a dark surface. */}
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <CheckboxGroup variant="toggle" colors="brand" value={["Gece"]} options="Gece, Gündüz, Akşam" aria-label="Koyu grup" />
      </Section>
    </Card>
  </div>
}
