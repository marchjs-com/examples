// KeyValueEditorLab: the full-featured KeyValueEditor example; it uses every prop at least once.
//
// Props shown here: value / bind:value and onChange, numbers, keyPlaceholder and valuePlaceholder, labels (key, value,
// remove, add, duplicate), removeIcon, removable, addable, readonly, disabled, labelledby, onBlur, id and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// KeyValueEditorLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { KeyValueEditor, CodeView } from "march/ui"
import { trash } from "march/icons"

// A small layout helper: a muted caption above whatever is passed as children. It only keeps the three demo groups
// below tidy; it is not part of KeyValueEditor.
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function KeyValueEditorLab() {
  // Signals. $plans and $headers hold the edited objects; the counters show onChange and onBlur firing.
  let $plans: Record<string, string | number> = { free: 1, team: 10 }
  let $headers: Record<string, string | number> = { Accept: "application/json" }
  let $changes = 0
  let $blurs = 0
  return <div sx={{ flex: "col", gap: 4 }}>
    <Section title="Sayılar, kendi metinleri ve ikonu, onChange">
      <span id="lab-plans">Plan kotaları</span>
      {/* The first editor uses most options:
          - bind:value keeps $plans in sync; onChange runs after every edit (counted below), onBlur when focus leaves
            a field.
          - numbers: numeric-looking values are stored as numbers ({"free":1}, not {"free":"1"}).
          - id and class="lab-plans": for your own CSS or tests. labelledby="lab-plans" names the group by the visible
            plan-quota heading above it (aria-labelledby), instead of an invisible aria-label.
          - keyPlaceholder / valuePlaceholder: hints in empty fields.
          - labels: every text the editor writes itself. `duplicate` is the message shown under a repeated key.
          - removeIcon: your own icon for the remove button. */}
      <KeyValueEditor bind:value={$plans} numbers onChange={() => $changes++} onBlur={() => $blurs++}
        id="lab-plan-key" class="lab-plans" labelledby="lab-plans" keyPlaceholder="ör. pro" valuePlaceholder="ör. 25"
        labels={{ key: "Plan", value: "Koltuk", remove: "Planı sil", add: "Plan ekle", duplicate: "Bu plan zaten var" }}
        removeIcon={trash} />
      {/* A live JSON view of the object, so you can see what the editor really produces. */}
      <CodeView code={() => JSON.stringify($plans)} lang="json" label="Kota" toolbar={false} />
      <span sx={{ text: "sm", color: "muted" }}>Değişiklik: {$changes} · odak kaybı: {$blurs}</span>
    </Section>
    <Section title="Metin olarak (numbers yok), kaldırma düğmesi yok">
      {/* Without `numbers`, values stay text. removable={false} removes the per-row remove button, so rows can only
          be added. `labels` can name just the parts you need; the rest keep their defaults. */}
      <KeyValueEditor bind:value={$headers} removable={false} labels={{ key: "Başlık", value: "Başlık değeri", add: "Başlık ekle" }} />
      <CodeView code={() => JSON.stringify($headers)} lang="json" label="Başlıklar" toolbar={false} />
    </Section>
    <Section title="Ekleme yok (addable={false}), salt okunur, devre dışı">
      {/* Three ways to stop editing:
          - addable={false}: the "add row" button is gone, existing rows stay editable (a fixed set of rows).
          - readonly: shows the values and hides the editing buttons; the fields cannot be changed.
          - disabled: the whole editor is locked. */}
      <KeyValueEditor value={{ "renk": "mavi" }} addable={false} labels={{ key: "Sabit anahtar", value: "Sabit değer" }} />
      <KeyValueEditor value={{ "sürüm": "0.2.0" }} readonly labels={{ key: "Salt okunur anahtar", value: "Salt okunur değer" }} />
      <KeyValueEditor value={{ "bölge": "eu" }} disabled labels={{ key: "Kilitli anahtar", value: "Kilitli değer" }} />
    </Section>
  </div>
}
