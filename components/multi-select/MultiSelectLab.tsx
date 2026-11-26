// MultiSelectLab: the full-featured MultiSelect example; it uses every prop at least once.
//
// MultiSelect is a Combobox with `multiple`: the value is an array and every picked value is a chip with its own
// remove button. Props shown here: options (static list), limit, placeholder, required, onSelect, onChange, labels
// (remove, noResults, searching, typeToSearch, searchFailed), removeIcon (a mark, an icon, text, or false for none),
// search + debounce + minChars + labelOf (async search), allowCustom (free text), renderOption (your own row),
// disabled, readonly, invalid, describedby, id, name, class, onFocus / onBlur, and `aria-label` for fields that have
// no visible <Field> label.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// MultiSelectLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { MultiSelect, Field, Card } from "march/ui"
import { trash, x } from "march/icons"

// Static options can be { value, label } objects or plain strings (the string is then value and label at once).
const langs = [
  { value: "tr", label: "Türkçe" }, { value: "en", label: "İngilizce" }, { value: "de", label: "Almanca" },
  { value: "ar", label: "Arapça" }, { value: "fr", label: "Fransızca" }, { value: "es", label: "İspanyolca" },
]
const fruits = ["Elma", "Armut", "Kiraz", "Muz", "Çilek"]
// Members have numeric ids as values. A chip only knows the id, so the async example below needs `labelOf`.
const members = ["Ayşe Yılmaz", "Mehmet Demir", "Zeynep Kaya", "Can Öztürk", "Elif Şahin"].map((label, i) => ({ value: 101 + i, label }))
// A stand-in for a server search. toLocaleLowerCase("tr") keeps Turkish letters such as dotted and dotless i correct.
const findMembers = (q: string) => members.filter((m) => m.label.toLocaleLowerCase("tr").includes(q.toLocaleLowerCase("tr")))
const colors = [{ value: "brand-orange", label: "Turuncu" }, { value: "brand-blue", label: "Mavi" }, { value: "brand-green", label: "Yeşil" }, { value: "brand-purple", label: "Mor" }]

// One section of the Lab: a small muted heading and the examples under it. Plain composition, no MultiSelect feature.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function MultiSelectLab() {
  // `let $name` is reactive state: reading it in JSX keeps the text up to date, and bind:value writes back to it.
  let $langs = ["tr", "en"]
  let $last = "—"
  let $changes = 0
  let $members = [104]
  let $colors = ["brand-blue"]
  let $focus = "dışarıda"
  return <div sx={{ flex: "col", gap: 3 }}>
    <Section title="Sabit liste">
      {/* A fixed list inside a Field, which supplies the visible label and links it to the input.
          - bind:value={$langs}: two-way binding of the array of selected values.
          - limit={4}: show at most four options in the dropdown at a time (the default is 50).
          - required: marks the field as required, like on any other control.
          - onSelect gets the picked option, onChange fires on every change of the array (add or remove): the
            line below shows both, so you can see the callbacks run.
          - labels.remove is a function: it builds the accessible name of each chip's remove button from the chip's
            label; labels.noResults is the text shown when typing matches nothing. Built-in texts are replaced this
            way (a string, or a function where the text depends on a value). */}
      <Field label="Diller">
        <MultiSelect bind:value={$langs} options={langs} limit={4} placeholder="Dil ekle" required
          onSelect={(o: { label: string }) => $last = o.label} onChange={() => $changes++} labels={{ remove: (l: string) => `${l} dilini kaldır`, noResults: "Böyle bir dil yok" }} />
      </Field>
      <span>Diller: {$langs.join(", ")} · son: {$last} · değişiklik: {$changes}</span>
    </Section>
    <Section title="Kaldır düğmesi">
      {/* removeIcon decides what the remove button of a chip shows: omitted = the default cross, an icon (trash),
          a short text, or false = no button at all. Keep labels.remove in every variant: an icon-only button needs
          an accessible name for screen readers. There is no <Field> here, so each input gets its accessible name
          from aria-label instead. */}
      <MultiSelect aria-label="Çarpılı" value={["Elma", "Armut"]} options={fruits} labels={{ remove: (l: string) => `${l} çıkar` }} />
      <MultiSelect aria-label="Çöp kutulu" value={["Kiraz"]} options={fruits} removeIcon={trash} labels={{ remove: (l: string) => `${l} sil` }} />
      <MultiSelect aria-label="Metinli" value={["Muz"]} options={fruits} removeIcon="sil" labels={{ remove: (l: string) => `${l} kaldır` }} />
      <MultiSelect aria-label="Düğmesiz" value={["Çilek"]} options={fruits} removeIcon={false} labels={{ remove: (l: string) => `${l} at` }} />
    </Section>
    <Section title="Eşzamansız arama">
      {/* Async search: `search` replaces the static options with a function (it may return a Promise).
          - debounce={150}: wait 150 ms after the last keystroke before searching, so fast typing sends one query
            (the default is 250).
          - minChars={2}: do not search before two characters are typed (labels.typeToSearch explains this).
          - labelOf: the value 104 was set before any search, so the chip has no option to read a label from;
            labelOf turns the bare id into text. Without it the chip could only show the raw value.
          - labels.searching / typeToSearch / noResults / searchFailed: the states of a search; searchFailed gets
            the error message. */}
      <MultiSelect aria-label="Üyeler" bind:value={$members} search={findMembers} debounce={150} minChars={2}
        labelOf={(id: number) => `Üye #${id}`} placeholder="En az iki harf"
        labels={{ searching: "Aranıyor…", typeToSearch: "En az iki harf yaz", noResults: "Üye bulunamadı", searchFailed: (m: string) => `Arama olmadı: ${m}` }} />
      <span>Üyeler: {$members.join(", ")}</span>
    </Section>
    <Section title="Serbest metin ve kendi satırı">
      {/* allowCustom: typed text that matches no option can become a value, so the list is a suggestion and not a
          limit. renderOption draws each row of the dropdown yourself (here a bold row in the colour of the option
          itself); the dropdown still handles highlighting, keyboard and selection. */}
      <MultiSelect aria-label="Renkler" bind:value={$colors} options={colors} allowCustom
        renderOption={(o: { value: unknown; label: string }) => <span sx={{ text: "bold", color: o.value as "brand-blue" }}>{o.label}</span>} />
      <span>Renkler: {$colors.join(", ")}</span>
    </Section>
    <Section title="Durum ve kimlik">
      {/* States: `disabled` turns the whole control off; `readonly` shows the value but cannot change it (chips lose
          their remove button and the input is readOnly; the test checks this); `invalid` marks the field, and
          `describedby` points to the id of the error text below so a screen reader reads it with the field.
          id and name make the input usable in a normal <form>; class="lab-multi" lets CSS or a test find this
          instance. onFocus / onBlur report focus entering or leaving the field. */}
      <MultiSelect aria-label="Kapalı" disabled value={["tr"]} options={langs} />
      <MultiSelect aria-label="Kilitli" readonly value={["en", "de"]} options={langs} labels={{ remove: (l: string) => `${l} kilitli` }} />
      <MultiSelect aria-label="Hatalı" invalid describedby="langs-error" options={langs} id="langs-bad" name="langs" class="lab-multi"
        onFocus={() => $focus = "içeride"} onBlur={() => $focus = "dışarıda"} />
      <span id="langs-error" sx={{ text: "xs", color: "danger" }}>En az bir dil seç</span>
      <span>Odak: {$focus}</span>
    </Section>
    {/* m:theme="night" on the Card makes the card and everything in it use the dark theme tokens, so you can check
        that the chips, the field and the remove mark stay readable on a dark surface. */}
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <MultiSelect aria-label="Koyuda diller" value={["ar", "fr"]} options={langs} removeIcon={x} />
      </Section>
    </Card>
  </div>
}
