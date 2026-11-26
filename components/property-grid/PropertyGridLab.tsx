// PropertyGridLab: the full-featured PropertyGrid example; it uses every prop at least once.
//
// Props shown here: properties (own control, description, keywords, name, placeholder, step, unit, readonly, hidden,
// validate), value + setValue + onChange, saved, onSave, label, history, dirty, id, groups, search, layout, api,
// historyButtons / resetButtons / footer, changeMarks, groupTools, persist, openGroups, labels and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PropertyGridLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { PropertyGrid, Toolbar, Button, type PropertyGridApi } from "march/ui"

// A control of our own for the "icon" row. A `control` component receives `value` (a getter) and `setValue`; it may
// also receive id, labelledby, describedby, invalid and readonly.
const Faces = (p: { value?: unknown; setValue?: (v: unknown) => void }) => <div role="group" sx={{ flex: "row", gap: 1 }}>
  {["🙂", "🚀", "🌙"].map((e) => <Button size="sm" variant="ghost" pressed={p.value === e} on:click={() => p.setValue?.(e)}>{e}</Button>)}
</div>

// The rows. Without `type` a row is a text field. Options used here: group, placeholder, keywords (extra words the
// search matches), name (the form field name), description (small text under the row), control (our own editor),
// readonly, unit and step and min (for numbers), validate(value) (an error text or null) and hidden(values)
// (the row is hidden while it returns true: the share link only exists for public projects).
const ROWS = [
  { key: "name", label: "Ad", group: "Kimlik", placeholder: "Proje adı", keywords: "başlık isim", name: "project-name", description: "Listelerde görünür" },
  { key: "icon", label: "Simge", group: "Kimlik", control: Faces },
  { key: "id", label: "Kimlik", group: "Kimlik", readonly: true },
  { key: "budget", label: "Bütçe", type: "number" as const, unit: "₺", step: 500, min: 0, group: "Plan", validate: (v: unknown) => (Number(v) > 10000 ? "En çok 10 000 ₺" : null) },
  { key: "public", label: "Herkese açık", type: "switch" as const, group: "Plan" },
  { key: "link", label: "Paylaşım bağlantısı", group: "Plan", hidden: (v: Record<string, unknown>) => !v.public },
]

// A small undo stack of our own, to show the `history` prop. By default the grid records every change in the app's
// undo history (so Ctrl+Z works); this object only serves this grid: push(step), undo, redo, canUndo, canRedo and the
// step names that the Undo / Redo buttons show.
type Step = { label: string; undo: () => void; redo: () => void }
function ownHistory() {
  let $past: Step[] = []
  let $future: Step[] = []
  return {
    push: (s: Step) => { $past = [s, ...$past]; $future = [] },
    undo: () => { const [s, ...rest] = $past; if (s) { s.undo(); $past = rest; $future = [s, ...$future] } },
    redo: () => { const [s, ...rest] = $future; if (s) { s.redo(); $future = rest; $past = [s, ...$past] } },
    canUndo: () => $past.length > 0, canRedo: () => $future.length > 0,
    past: () => $past.map((s) => s.label), future: () => $future.map((s) => s.label),
    markSaved: () => {},
  }
}

export function PropertyGridLab() {
  // The edited object.
  let $value: Record<string, unknown> = { name: "Mars", icon: "🚀", id: "p-42", budget: 4000, public: false, link: "marchjs.com/p/42" }
  // What changes are compared with. After onSave it becomes the current value, so the footer says "no changes".
  let $saved: Record<string, unknown> = { ...$value }
  // How many times onChange fired.
  let $edits = 0
  // The grid's api object (changes(), save(), revert(), markSaved(), focus(key)), received through the `api` prop.
  let grid: PropertyGridApi | undefined
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Buttons that use the grid's api: revert all changes, or move focus to the budget field. */}
    <Toolbar label="Lab düğmeleri">
      <Button size="sm" variant="secondary" on:click={() => grid?.revert()}>Geri dön (api)</Button>
      <Button size="sm" variant="secondary" on:click={() => grid?.focus("budget")}>Bütçeye git</Button>
      <span sx={{ text: "sm" }}>düzenleme: {$edits} · kayıtlı ad: {String($saved.name)}</span>
    </Toolbar>
    {/* The props of the grid:
        - properties, value, setValue, onChange: the rows and the edited object (the same pair that bind:value sets).
        - saved, onSave: what changes are compared with, and the Save callback.
        - label: accessible name; history: where changes are recorded (here our own stack); dirty={false}: do not
          register
          unsaved changes with the app's DirtyState (the default does, and warns when leaving the page).
        - id: the base of the ids of the grid's parts (also its name in the registry); groups: the order of the groups;
          search: the search field; layout="auto":
          the label sits beside the editor (and above it in narrow panels), "stacked" is always above.
        - api: receives the grid's api object; historyButtons, resetButtons, changeMarks, footer: the Undo / Redo
          buttons,
          the per-row reset, the dot on changed rows and the footer bar with Revert and Save.
        - groupTools: open / close all groups; persist: remember which groups are closed (in localStorage, under this
          name); openGroups: the groups that start open.
        - labels: every text the grid writes itself; class: on the section (the tests use it). */}
    <PropertyGrid
      properties={ROWS}
      value={$value}
      setValue={(v) => $value = v}
      onChange={() => $edits++}
      saved={$saved}
      onSave={(v) => { $saved = { ...v } }}
      label="Proje ayarları"
      history={ownHistory() as never}
      dirty={false}
      id="lab-project"
      groups={["Plan", "Kimlik"]}
      search
      layout="auto"
      api={(a) => grid = a}
      historyButtons
      resetButtons
      changeMarks
      footer
      groupTools
      persist="lab-pg"
      openGroups={["Plan", "Kimlik"]}
      labels={{ search: "Ayar ara", save: "Kaydet", revert: "Vazgeç", noChanges: "Değişiklik yok", unsaved: (n) => `${n} kaydedilmemiş`, changed: "değişti", empty: "Satır yok", noMatch: (q) => `"${q}" bulunamadı`, openAll: "Hepsini aç", closeAll: "Hepsini kapat" }}
      class="lab-pg"
    />
  </div>
}
