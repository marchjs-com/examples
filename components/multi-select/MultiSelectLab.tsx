import { MultiSelect, Field, Card } from "march/ui"
import { trash, x } from "march/icons"

// MultiSelect'in bütün özellikleri bir arada: sabit seçenekler, limit, placeholder, required, onSelect, onChange;
// chip'in kaldır düğmesi (varsayılan ×, ikon, metin, yok: removeIcon) ve adı (labels.remove); eşzamansız arama
// (search, debounce, minChars, labelOf, labels); serbest metin (allowCustom) ve kendi satırı (renderOption);
// devre dışı, salt okunur, geçersiz + describedby, id, name, class, onFocus / onBlur, koyu zemin
const langs = [
  { value: "tr", label: "Türkçe" }, { value: "en", label: "İngilizce" }, { value: "de", label: "Almanca" },
  { value: "ar", label: "Arapça" }, { value: "fr", label: "Fransızca" }, { value: "es", label: "İspanyolca" },
]
const fruits = ["Elma", "Armut", "Kiraz", "Muz", "Çilek"]
const members = ["Ayşe Yılmaz", "Mehmet Demir", "Zeynep Kaya", "Can Öztürk", "Elif Şahin"].map((label, i) => ({ value: 101 + i, label }))
const findMembers = (q: string) => members.filter((m) => m.label.toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")))
const colors = [{ value: "brand-orange", label: "Turuncu" }, { value: "brand-blue", label: "Mavi" }, { value: "brand-green", label: "Yeşil" }, { value: "brand-purple", label: "Mor" }]

// bir bölüm: başlığı ve altında içeriği
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function MultiSelectLab() {
  let $langs = ["tr", "en"]
  let $last = "—"
  let $changes = 0
  let $members = [104]
  let $colors = ["brand-blue"]
  let $focus = "dışarıda"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Section title="Sabit liste">
      <Field label="Diller">
        <MultiSelect bind:value={$langs} options={langs} limit={4} placeholder="Dil ekle" required
          onSelect={(o: { label: string }) => $last = o.label} onChange={() => $changes++} labels={{ remove: (l: string) => `${l} dilini kaldır`, noResults: "Böyle bir dil yok" }} />
      </Field>
      <span>Diller: {$langs.join(", ")} · son: {$last} · değişiklik: {$changes}</span>
    </Section>
    <Section title="Kaldır düğmesi">
      <MultiSelect aria-label="Çarpılı" value={["Elma", "Armut"]} options={fruits} labels={{ remove: (l: string) => `${l} çıkar` }} />
      <MultiSelect aria-label="Çöp kutulu" value={["Kiraz"]} options={fruits} removeIcon={trash} labels={{ remove: (l: string) => `${l} sil` }} />
      <MultiSelect aria-label="Metinli" value={["Muz"]} options={fruits} removeIcon="sil" labels={{ remove: (l: string) => `${l} kaldır` }} />
      <MultiSelect aria-label="Düğmesiz" value={["Çilek"]} options={fruits} removeIcon={false} labels={{ remove: (l: string) => `${l} at` }} />
    </Section>
    <Section title="Eşzamansız arama">
      <MultiSelect aria-label="Üyeler" bind:value={$members} search={findMembers} debounce={150} minChars={2}
        labelOf={(id: number) => `Üye #${id}`} placeholder="En az iki harf"
        labels={{ searching: "Aranıyor…", typeToSearch: "En az iki harf yaz", noResults: "Üye bulunamadı", searchFailed: (m: string) => `Arama olmadı: ${m}` }} />
      <span>Üyeler: {$members.join(", ")}</span>
    </Section>
    <Section title="Serbest metin ve kendi satırı">
      <MultiSelect aria-label="Renkler" bind:value={$colors} options={colors} allowCustom
        renderOption={(o: { value: unknown; label: string }) => <span sx={{ text: "bold", color: o.value as "brand-blue" }}>{o.label}</span>} />
      <span>Renkler: {$colors.join(", ")}</span>
    </Section>
    <Section title="Durum ve kimlik">
      <MultiSelect aria-label="Kapalı" disabled value={["tr"]} options={langs} />
      <MultiSelect aria-label="Kilitli" readonly value={["en", "de"]} options={langs} labels={{ remove: (l: string) => `${l} kilitli` }} />
      <MultiSelect aria-label="Hatalı" invalid describedby="langs-error" options={langs} id="langs-bad" name="langs" class="lab-multi"
        onFocus={() => $focus = "içeride"} onBlur={() => $focus = "dışarıda"} />
      <span id="langs-error" sx={{ text: "xs", color: "danger" }}>En az bir dil seç</span>
      <span>Odak: {$focus}</span>
    </Section>
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <MultiSelect aria-label="Koyuda diller" value={["ar", "fr"]} options={langs} removeIcon={x} />
      </Section>
    </Card>
  </div>
}
