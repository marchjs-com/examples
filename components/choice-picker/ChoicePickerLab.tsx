import { ChoicePicker, Card } from "march/ui"
import { Icon, defineIcon, droplet, sun, moon, monitor } from "march/icons"

// ChoicePicker'ın bütün özellikleri bir arada: görünümü seçeneklerden kendisi seçer (kind="auto": 2–6 kısa etiket
// segmented, 7–9 chip, preview'lu kartlar, 10+ combobox), kind ile zorlanan görünümler (segmented, chips, cards,
// grid, combobox), virgüllü metin olarak options, kapalı seçenek, bind:value ve onChange, devre dışı, salt okunur,
// zorunlu, geçersiz + describedby, aria-label / labelledby, id, name, class, onFocus / onBlur, koyu zemin
const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Konya", "Adana", "Trabzon", "Samsun", "Eskişehir", "Kayseri", "Mersin"]
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

// bir bölüm: başlığı ve altında içeriği
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function ChoicePickerLab() {
  let $period = "Hafta"
  let $city = "İzmir"
  let $theme = "system"
  let $color = "brand-blue"
  let $changes = 0
  let $focus = "dışarıda"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Section title="Otomatik: 3 kısa etiket → segmented">
      <div class="auto-segmented"><ChoicePicker aria-label="Dönem" bind:value={$period} options={["Gün", "Hafta", "Ay"]} onChange={() => $changes++} /></div>
      <span>Dönem: {$period} · değişiklik: {$changes}</span>
    </Section>
    <Section title="Otomatik: 8 şehir → chip, 12 şehir → combobox">
      <div class="auto-chips"><ChoicePicker aria-label="Şehir (8)" bind:value={$city} options={cities.slice(0, 8)} /></div>
      <div class="auto-combobox"><ChoicePicker aria-label="Şehir (12)" bind:value={$city} options={cities} /></div>
      <span>Şehir: {$city}</span>
    </Section>
    <Section title="Otomatik: preview → kartlar; kind=grid → kare kutular">
      <ChoicePicker aria-label="Tema" bind:value={$theme} options={themes} />
      <ChoicePicker aria-label="Renk" kind="grid" bind:value={$color} options={swatches} />
      <span>Tema: {$theme} · renk: {$color}</span>
    </Section>
    <Section title="Zorlanan görünüm ve virgüllü metin">
      <ChoicePicker aria-label="Beden (chip)" kind="chips" options="S, M, L, XL" value="M" />
      <ChoicePicker aria-label="Beden (segmented)" kind="segmented" options="S, M, L, XL" value="L" />
      <ChoicePicker aria-label="Beden (combobox)" kind="combobox" options="S, M, L, XL" value="XL" />
      <ChoicePicker aria-label="Beden (kart)" kind="cards" options={[{ value: "std", label: "Standart" }, { value: "xl", label: "Geniş kalıp", disabled: true }]} value="std" />
    </Section>
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
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <ChoicePicker aria-label="Koyuda dönem" bind:value={$period} options={["Gün", "Hafta", "Ay"]} />
      </Section>
    </Card>
  </div>
}
