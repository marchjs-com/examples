// ChoicePickerLab: the full-featured ChoicePicker example; it uses every prop at least once.
//
// Props shown here: kind="auto" (the picker chooses its look from the options: 2-6 short labels segmented, 7-9 chips,
// options with a preview cards, 10 or more a combobox), kind forced to segmented / chips / cards / grid / combobox,
// options as a comma-separated text, a disabled option, bind:value and onChange, the states disabled / readonly /
// required / invalid with describedby, aria-label / labelledby, id, name, class, onFocus / onBlur, and a dark surface.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ChoicePickerLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ChoicePicker, Card } from "march/ui"
import { Icon, defineIcon, droplet, sun, moon, monitor } from "march/icons"

const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Konya", "Adana", "Trabzon", "Samsun", "Eskişehir", "Kayseri", "Mersin"]
// Options with a `preview` (a function that returns a node) make the auto look pick cards: the preview is drawn
// above the label of each card.
const themes = [
  { value: "light", label: "Açık", preview: () => <Icon of={sun} /> },
  { value: "dark", label: "Koyu", preview: () => <Icon of={moon} /> },
  { value: "system", label: "Sistem", preview: () => <Icon of={monitor} /> },
]
// the droplet's outline drawn filled: a solid drop in each colour
const drop = defineIcon("drop-filled", droplet.d, true)
const swatches = ["brand-orange", "brand-blue", "brand-green", "brand-purple"].map((c) => ({
  value: c, label: c.replace("brand-", ""), preview: () => <span sx={{ flex: "center", color: c as "brand-blue", text: "2xl" }}><Icon of={drop} size="em" /></span>,
}))

// A layout helper: a caption above, the content below. Only the Lab uses it.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function ChoicePickerLab() {
  // The selected values of the demos, a counter of onChange calls and the focus state of one picker.
  let $period = "Hafta"
  let $city = "İzmir"
  let $theme = "system"
  let $color = "brand-blue"
  let $changes = 0
  let $focus = "dışarıda"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Auto look, few short labels: a Segmented control. bind:value keeps $period and the picker in sync; onChange is
        called with every new value (here it counts). aria-label names the radio group for screen readers. The
        wrapper div with a class only lets the test find this instance. */}
    <Section title="Otomatik: 3 kısa etiket → segmented">
      <div class="auto-segmented"><ChoicePicker aria-label="Dönem" bind:value={$period} options={["Gün", "Hafta", "Ay"]} onChange={() => $changes++} /></div>
      <span>Dönem: {$period} · değişiklik: {$changes}</span>
    </Section>
    {/* Auto look follows the number of options: 8 become chips, 12 a searchable Combobox. Both are bound to $city,
        so choosing in one updates the other. */}
    <Section title="Otomatik: 8 şehir → chip, 12 şehir → combobox">
      <div class="auto-chips"><ChoicePicker aria-label="Şehir (8)" bind:value={$city} options={cities.slice(0, 8)} /></div>
      <div class="auto-combobox"><ChoicePicker aria-label="Şehir (12)" bind:value={$city} options={cities} /></div>
      <span>Şehir: {$city}</span>
    </Section>
    {/* Options with a preview become cards by themselves. kind="grid" forces square boxes: good for swatches. */}
    <Section title="Otomatik: preview → kartlar; kind=grid → kare kutular">
      <ChoicePicker aria-label="Tema" bind:value={$theme} options={themes} />
      <ChoicePicker aria-label="Renk" kind="grid" bind:value={$color} options={swatches} />
      <span>Tema: {$theme} · renk: {$color}</span>
    </Section>
    {/* kind forces a look whatever the options. A comma-separated text is a shortcut for options: each part is both
        the value and the label. In the last picker one option has disabled: true, so it is shown but cannot be chosen. */}
    <Section title="Zorlanan görünüm ve virgüllü metin">
      <ChoicePicker aria-label="Beden (chip)" kind="chips" options="S, M, L, XL" value="M" />
      <ChoicePicker aria-label="Beden (segmented)" kind="segmented" options="S, M, L, XL" value="L" />
      <ChoicePicker aria-label="Beden (combobox)" kind="combobox" options="S, M, L, XL" value="XL" />
      <ChoicePicker aria-label="Beden (kart)" kind="cards" options={[{ value: "std", label: "Standart" }, { value: "xl", label: "Geniş kalıp", disabled: true }]} value="std" />
    </Section>
    {/* States: disabled and readonly lock the whole picker (the buttons are disabled); invalid + required +
        describedby is the accessible error pattern (aria-invalid, required, and the error text linked by id).
        id, name and class go to the control; onFocus / onBlur run when focus enters or leaves. labelledby names
        a picker by another element's id instead of aria-label. */}
    <Section title="Durum ve kimlik">
      <ChoicePicker aria-label="Kapalı" disabled options={["Evet", "Hayır"]} value="Evet" />
      <ChoicePicker aria-label="Kilitli" readonly options={["Aylık", "Yıllık"]} value="Yıllık" />
      <ChoicePicker aria-label="Hatalı" invalid required describedby="plan-error" options={["Temel", "Pro", "Kurumsal"]}
        id="plan" name="plan" class="lab-plan" onFocus={() => $focus = "içeride"} onBlur={() => $focus = "dışarıda"} />
      <span id="plan-error" sx={{ text: "xs", color: "danger" }}>Bir plan seç</span>
      <span id="lang-caption">Arayüz dili</span>
      <ChoicePicker labelledby="lang-caption" options={["Türkçe", "English", "Deutsch"]} value="Türkçe" />
      <span>Odak: {$focus}</span>
    </Section>
    {/* m:theme="night" draws this card in the dark theme whatever the page theme is. */}
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <ChoicePicker aria-label="Koyuda dönem" bind:value={$period} options={["Gün", "Hafta", "Ay"]} />
      </Section>
    </Card>
  </div>
}
