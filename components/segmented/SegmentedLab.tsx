// SegmentedLab: the full-featured Segmented example; it uses every prop at least once.
//
// Props shown here: value (bind:value or value + onChange), options (a comma-separated text, an array of values, or
// objects with label, icon, title and disabled; label "" gives an icon-only segment), indicator ("fill" or "slide"),
// m:color, the states disabled, readonly, invalid and required, and the form and accessibility props id, name, class,
// aria-label, labelledby and onBlur.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// SegmentedLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Segmented, Card } from "march/ui"
import { sun, moon, monitor, bold, italic, strikethrough } from "march/icons"

// Objects as options: `value` is what the control holds, `label` the text, `icon` an icon before it. The third one has
// label "" so it is icon-only; its accessible name and tooltip come from `title`.
const themes = [
  { value: "light", label: "Açık", icon: sun }, { value: "dark", label: "Koyu", icon: moon },
  { value: "system", label: "", icon: monitor, title: "Sisteme uy" },
]
// `disabled: true` keeps a segment visible but not choosable; its `title` is the tooltip that says why.
const plans = [{ value: "monthly", label: "Aylık" }, { value: "yearly", label: "Yıllık" }, { value: "life", label: "Ömür boyu", disabled: true, title: "Yakında" }]

// A titled group: the title on top, the examples in a row that wraps when they do not fit.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

export function SegmentedLab() {
  // Plain `let $name` variables are March signals: writing one redraws whatever reads it.
  let $view = "Hafta"
  let $theme = "light"
  let $plan = "monthly"
  let $changes = 0
  let $touched = false
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Değer (bind:value, metin seçenekler), id, name, onBlur">
      {/* - bind:value={$view}: two-way binding with the signal.
          - options as a comma-separated text: each part is both a value and its label.
          - aria-label: the name of the group (a radiogroup). id goes to the first segment, name is the form field name.
          - onBlur: called when focus leaves; here it only records that the control was touched. */}
      <Segmented bind:value={$view} options="Gün, Hafta, Ay" aria-label="Dönem" id="lab-period" name="period" onBlur={() => $touched = true} />
      <span>Seçili: {$view}{$touched ? " · dokunuldu" : ""}</span>
    </Section>
    <Section title="İkonlar, yalnız ikon (title), kayan gösterge, onChange">
      {/* value + onChange is the one-way alternative to bind:value: the Lab stores the new value itself and counts the
          changes. indicator="slide": one highlight glides to the chosen segment (the default "fill" colours the chosen
          segment in place). The glide runs on the motion engine, so reduced motion and the global speed apply. */}
      <Segmented value={$theme} onChange={(v: string) => { $theme = v; $changes++ }} options={themes} indicator="slide" aria-label="Tema" />
      <span>Tema: {$theme} · {$changes} değişiklik</span>
    </Section>
    <Section title="Kapalı seçenek (title ipucu), renk">
      {/* m:color is a common prop (it works on every component): it sets the colour token of the control. The second
          Segmented is a text-format switch with three icon-only segments (each named by its title) and a slide. */}
      <Segmented bind:value={$plan} options={plans} m:color="brand-green" aria-label="Plan" />
      <Segmented value="b" options={[{ value: "b", label: "", icon: bold, title: "Kalın" }, { value: "i", label: "", icon: italic, title: "Eğik" }, { value: "s", label: "", icon: strikethrough, title: "Üstü çizili" }]} m:color="brand-purple" indicator="slide" aria-label="Biçim" />
    </Section>
    <Section title="Dizi seçenekler (sayılar)">
      {/* An array of plain values: each value is also its label. */}
      <Segmented value={2} options={[1, 2, 3, 4]} m:color="brand-orange" aria-label="Kişi sayısı" />
    </Section>
    <Section title="Durumlar">
      {/* States: disabled and readonly both stop changes; the test checks that every button is disabled. invalid marks
          the group with aria-invalid and required marks it required. labelledby names the group through a visible
          element (the "Beden" text) instead of aria-label. class adds your own class to the root. */}
      <Segmented disabled value="Evet" options="Evet, Hayır" aria-label="Devre dışı" />
      <Segmented readonly value="Okunur" options="Okunur, Değişmez" aria-label="Salt okunur" />
      <span id="lab-size-title" sx={{ text: "bold" }}>Beden</span>
      <Segmented labelledby="lab-size-title" invalid required class="lab-size" options="S, M, L" />
    </Section>
    {/* m:theme="night" (a common prop that works on every element and component) draws the card in the dark theme. */}
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <Segmented value="Gece" options="Gece, Gündüz" indicator="slide" m:color="brand-blue" aria-label="Koyu zeminde" />
      </Section>
    </Card>
  </div>
}
