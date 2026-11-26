// ListEditorLab: the full-featured ListEditor example; it uses every prop at least once.
//
// Props shown here: value / bind:value and onChange, max, unique, placeholder and addLabel, labels (accessible names),
// icons (your own icons), sortable / removable / addable, readonly, disabled, invalid with describedby, labelledby,
// onBlur, id and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ListEditorLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ListEditor } from "march/ui"
import { chevronUp, chevronDown, trash } from "march/icons"

// A small layout helper: a muted caption above whatever is passed as children. It only keeps the demo groups below
// tidy; it is not part of ListEditor.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function ListEditorLab() {
  // Signals: one list per demo group, two counters for onChange / onBlur.
  let $drinks = ["kahve", "çay", "su"]
  let $queue = ["Ali"]
  let $full = ["pazartesi", "salı", "çarşamba"]
  let $changes = 0
  let $blurs = 0
  // A derived signal: the drinks list is invalid when it is empty.
  const $empty = $drinks.length === 0
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Bağlı değer, onChange, kendi ad ve ikonlar">
      <span id="lab-drinks">İçecekler</span>
      {/* The first editor uses most options:
          - bind:value keeps $drinks in sync; onChange runs after every edit and onBlur when focus leaves a field.
          - labelledby="lab-drinks": names the group by the visible drinks heading above it (aria-labelledby).
          - id: given to the add field (the error text below points at it); class: for tests and your CSS.
          - placeholder and addLabel: the add field's hint and the add button's text.
          - labels: accessible names. `item` is a function of the row position; moveUp, moveDown and remove name the
            row buttons.
          - icons: your own up, down and remove icons.
          - invalid + describedby: when the list is empty the editor is marked invalid (aria-invalid) and linked to the
            error message below it (aria-describedby), so a screen reader reads the message with the field. */}
      <ListEditor bind:value={$drinks} onChange={() => $changes++} onBlur={() => $blurs++} labelledby="lab-drinks"
        id="lab-drink-input" class="lab-drinks" placeholder="İçecek ekle" addLabel="Ekle"
        labels={{ item: (n: number) => `${n}. içecek`, moveUp: "Yukarı taşı", moveDown: "Aşağı taşı", remove: "Listeden çıkar" }}
        icons={{ up: chevronUp, down: chevronDown, remove: trash }}
        invalid={$empty} describedby={$empty ? "lab-drinks-error" : undefined} />
      <span id="lab-drinks-error" sx={{ text: "sm", color: "danger" }}>{$empty ? "En az bir içecek gerekli" : ""}</span>
      <span>Liste: {$drinks.join(" · ")}</span>
      <span sx={{ text: "sm", color: "muted" }}>Değişiklik: {$changes} · odak kaybı: {$blurs}</span>
    </Section>
    <Section title="Yinelenenlere izin (unique={false}), sıralama yok">
      {/* By default an item that is already in the list is not added (unique). unique={false} allows duplicates.
          sortable={false} removes the move buttons and the drag grips. */}
      <ListEditor bind:value={$queue} unique={false} sortable={false} placeholder="Sıraya ad yaz" addLabel="Yine de ekle" />
      <span>Sıra: {$queue.join(" · ")}</span>
    </Section>
    <Section title="En fazla 3 (max), kaldırma düğmesi yok">
      {/* max={3}: the list already has three items, so the add button is disabled. removable={false}: no remove
          buttons, items can only be edited or moved. */}
      <ListEditor bind:value={$full} max={3} removable={false} placeholder="Gün ekle" addLabel="Dolu" />
    </Section>
    <Section title="Yalnız düzenleme (addable={false}), salt okunur, devre dışı">
      {/* Three ways to stop editing:
          - addable={false}: no add line, existing rows stay editable.
          - readonly: shows the items and hides the editing buttons; fields cannot be changed.
          - disabled: the whole editor is locked. */}
      <ListEditor value={["ilk", "ikinci"]} addable={false} labels={{ item: (n: number) => `Sabit satır ${n}` }} />
      <ListEditor value={["arşiv"]} readonly labels={{ item: () => "Salt okunur satır" }} />
      <ListEditor value={["kilitli"]} disabled placeholder="Kilitli liste" />
    </Section>
  </div>
}
