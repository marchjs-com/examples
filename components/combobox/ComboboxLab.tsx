// ComboboxLab: the full-featured Combobox example; it uses every prop at least once.
//
// Props shown here: a static list of options, limit, placeholder, required, onSelect; options with a hint and a disabled
// option, your own row drawing (renderOption); async search (search, debounce, minChars, labels, labelOf); free text
// (allowCustom); multiple choice (multiple, removeIcon, labels.remove, onChange); disabled, readonly, invalid + describedby,
// id, name, class, onFocus / onBlur.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ComboboxLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Combobox, Field } from "march/ui"
import { trash } from "march/icons"

const towns = ["Kadıköy", "Beşiktaş", "Üsküdar", "Şişli", "Bakırköy", "Ataşehir", "Sarıyer", "Fatih", "Beyoğlu", "Maltepe"]
// Option objects: `value` is stored, `label` is shown, `hint` is a small extra text (here the phone code) and
// `disabled: true` shows an option that cannot be chosen.
const codes = [
  { value: "tr", label: "Türkiye", hint: "+90" }, { value: "de", label: "Almanya", hint: "+49" },
  { value: "nl", label: "Hollanda", hint: "+31" }, { value: "fr", label: "Fransa", hint: "+33", disabled: true },
]
// A fake member list for the async example: the values are numbers (ids), the labels are names.
const members = ["Ayşe Yılmaz", "Mehmet Demir", "Zeynep Kaya", "Can Öztürk", "Elif Şahin"].map((label, i) => ({ value: 101 + i, label }))
// An async search function may return a list or a promise of one; here it filters locally (Turkish-aware lower-casing).
const findMembers = (q: string) => members.filter((m) => m.label.toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")))

// A layout helper: a caption above, the control below. Only the Lab uses it.
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
    {/* Static options: typing filters the list (accent and case-insensitive); arrow keys move, Enter picks, Escape
        closes. limit={5} shows at most five rows. required marks the field. onSelect receives the chosen option
        (bind:value stores only its value). */}
    <Section title="Sabit liste">
      <Field label="İlçe"><Combobox bind:value={$town} options={towns} limit={5} placeholder="İlçe yaz" required onSelect={(o: { label: string }) => $picked = o.label} /></Field>
      <span>İlçe: {$town ?? "—"} · seçilen: {$picked}</span>
    </Section>
    {/* Options with hints, and renderOption: a function that draws each row yourself (here the label on the left
        and the hint in a mono font on the right). The disabled option is listed but cannot be chosen. */}
    <Section title="İpucu, kapalı seçenek ve kendi satırı">
      <Combobox aria-label="Ülke kodu" bind:value={$code} options={codes}
        renderOption={(o: { label: string; hint?: unknown }) => <span sx={{ flex: ["row", "between"], gap: 2 }}><span>{o.label}</span><span sx={{ text: "mono", color: "brand-blue" }}>{o.hint}</span></span>} />
      <span>Kod: {$code}</span>
    </Section>
    {/* Async search: `search` is called with the typed text after `debounce` ms of silence and late answers are ignored.
        minChars={2} waits for two letters. labelOf names a value that is not in any list (the stored id 104 shows
        as "Member #104" before anything is searched). labels replaces the list state texts: searching, typeToSearch,
        noResults and searchFailed (a function that gets the error message). */}
    <Section title="Eşzamansız arama">
      <Combobox aria-label="Üye ara" id="member" bind:value={$member} search={findMembers} debounce={150} minChars={2}
        labelOf={(id: number) => `Üye #${id}`} placeholder="En az iki harf"
        labels={{ searching: "Aranıyor…", typeToSearch: "En az iki harf yaz", noResults: "Üye bulunamadı", searchFailed: (m: string) => `Arama olmadı: ${m}` }} />
      <span>Üye: {$member ?? "—"}</span>
    </Section>
    {/* allowCustom: typed text that matches no option can still become the value (Enter accepts it). */}
    <Section title="Serbest metin">
      <Combobox aria-label="Etiket" allowCustom bind:value={$tag} options={["acil", "hata", "öneri"]} placeholder="Yaz ve Enter'a bas" />
      <span>Etiket: {$tag ?? "—"}</span>
    </Section>
    {/* multiple: the value is an array shown as chips. removeIcon replaces the × of a chip, labels.remove gives its
        accessible name (a function of the option label) and onChange is called when the selection changes. */}
    <Section title="Çoklu seçim">
      <Combobox aria-label="Beceriler" multiple bind:value={$skills} options={["TypeScript", "CSS", "Rust", "Go", "SQL"]}
        removeIcon={trash} labels={{ remove: (l: string) => `${l} kaldır` }} onChange={() => $changes++} />
      <span>Beceriler: {$skills.join(", ") || "—"} · değişiklik: {$changes}</span>
    </Section>
    {/* States and identity: disabled and readonly lock the input; invalid + describedby is the accessible error
        pattern (aria-invalid and the error text linked by id); name and class go to the control; onFocus / onBlur
        run when focus enters or leaves. */}
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
