import { Combobox, Field } from "march/ui"
import { trash } from "march/icons"

// Combobox'un bütün özellikleri bir arada: sabit seçenekler, limit, placeholder, required, onSelect;
// ipuçlu ve kapalı seçenekler, kendi satır çizimi (renderOption); eşzamansız arama (search, debounce, minChars,
// labels, labelOf); serbest metin (allowCustom); çoklu seçim (multiple, removeIcon, labels.remove, onChange);
// devre dışı, salt okunur, geçersiz + describedby, id, name, class, onFocus / onBlur
const towns = ["Kadıköy", "Beşiktaş", "Üsküdar", "Şişli", "Bakırköy", "Ataşehir", "Sarıyer", "Fatih", "Beyoğlu", "Maltepe"]
const codes = [
  { value: "tr", label: "Türkiye", hint: "+90" }, { value: "de", label: "Almanya", hint: "+49" },
  { value: "nl", label: "Hollanda", hint: "+31" }, { value: "fr", label: "Fransa", hint: "+33", disabled: true },
]
const members = ["Ayşe Yılmaz", "Mehmet Demir", "Zeynep Kaya", "Can Öztürk", "Elif Şahin"].map((label, i) => ({ value: 101 + i, label }))
const findMembers = (q: string) => members.filter((m) => m.label.toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")))

// bir bölüm: başlığı ve altında içeriği
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function ComboboxLab() {
  let $town: string | null = null
  let $picked = "—"
  let $code = "tr"
  let $member: number | null = 104
  let $tag: string | null = null
  let $skills = ["TypeScript", "CSS"]
  let $changes = 0
  let $focus = "dışarıda"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Section title="Sabit liste">
      <Field label="İlçe"><Combobox bind:value={$town} options={towns} limit={5} placeholder="İlçe yaz" required onSelect={(o: { label: string }) => $picked = o.label} /></Field>
      <span>İlçe: {$town ?? "—"} · seçilen: {$picked}</span>
    </Section>
    <Section title="İpucu, kapalı seçenek ve kendi satırı">
      <Combobox aria-label="Ülke kodu" bind:value={$code} options={codes}
        renderOption={(o: { label: string; hint?: unknown }) => <span sx={{ flex: ["row", "between"], gap: 2 }}><span>{o.label}</span><span sx={{ text: "mono", color: "brand-blue" }}>{o.hint}</span></span>} />
      <span>Kod: {$code}</span>
    </Section>
    <Section title="Eşzamansız arama">
      <Combobox aria-label="Üye ara" id="member" bind:value={$member} search={findMembers} debounce={150} minChars={2}
        labelOf={(id: number) => `Üye #${id}`} placeholder="En az iki harf"
        labels={{ searching: "Aranıyor…", typeToSearch: "En az iki harf yaz", noResults: "Üye bulunamadı", searchFailed: (m: string) => `Arama olmadı: ${m}` }} />
      <span>Üye: {$member ?? "—"}</span>
    </Section>
    <Section title="Serbest metin">
      <Combobox aria-label="Etiket" allowCustom bind:value={$tag} options={["acil", "hata", "öneri"]} placeholder="Yaz ve Enter'a bas" />
      <span>Etiket: {$tag ?? "—"}</span>
    </Section>
    <Section title="Çoklu seçim">
      <Combobox aria-label="Beceriler" multiple bind:value={$skills} options={["TypeScript", "CSS", "Rust", "Go", "SQL"]}
        removeIcon={trash} labels={{ remove: (l: string) => `${l} kaldır` }} onChange={() => $changes++} />
      <span>Beceriler: {$skills.join(", ") || "—"} · değişiklik: {$changes}</span>
    </Section>
    <Section title="Durum ve kimlik">
      <Combobox aria-label="Kapalı alan" disabled options={towns} value="Fatih" />
      <Combobox aria-label="Kilitli alan" readonly options={towns} value="Sarıyer" />
      <Combobox aria-label="Hatalı alan" invalid describedby="town-error" options={towns} name="town" class="lab-combo"
        onFocus={() => $focus = "içeride"} onBlur={() => $focus = "dışarıda"} />
      <span id="town-error" sx={{ text: "xs", color: "danger" }}>Geçerli bir ilçe seç</span>
      <span>Odak: {$focus}</span>
    </Section>
  </div>
}
