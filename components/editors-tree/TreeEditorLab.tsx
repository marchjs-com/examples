// TreeEditorLab: the full-featured TreeEditor example; it uses every prop at least once.
//
// Props shown here: value and onChange, schema, validate (extra checks with paths), expand, search, history, label,
// onValidate, status, typeBadges, actions, labels (your own words), class and readonly.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// TreeEditorLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { TreeEditor, Card, Badge } from "march/ui"

// A JSON Schema subset: types (integer, array, string...), minimum, items... Rows that break it are marked invalid, with
// the message as their description.
const SCHEMA = { type: "object", properties: { port: { type: "integer", minimum: 1024 }, tags: { type: "array", items: { type: "string" } } } } as const

// $v is the JSON value being edited, $changes counts onChange calls, $problems is the count from onValidate.
export function TreeEditorLab() {
  let $v: unknown = { name: "api", port: 80, debug: false, tags: ["eu", "us"], note: "" }
  let $changes = 0
  let $problems = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Badge tone="neutral">{`${$changes} değişiklik · ${$problems} sorun`}</Badge>
    {/* The first TreeEditor:
            - value + onChange: one-way; every change gives a new value (immutable updates), which we store.
            - schema: the rules above; validate: extra problems as { path, message }; onValidate: gets every validation
              result (here only the count is kept).
            - label: the accessible name; class: a class on the wrapper.
            - expand: how many levels are open at the start; search: the search box; history: undo / redo buttons and
              Ctrl+Z; status: the "valid / N problems" text in the bar; typeBadges: a badge per row that converts the type.
            - actions: which row actions exist (add, duplicate, delete); a list keeps only those (the + / Insert and Delete
              keys follow); labels: your own words for every text of the editor, including the type names (kinds).
            Keyboard: arrows move, Enter edits a value, F2 renames, T opens the type menu, + / Insert adds, Delete removes. */}
    <TreeEditor value={$v} onChange={(x) => { $v = x; $changes++ }} class="lab-tree" label="Sunucu"
      schema={SCHEMA} validate={(x) => ((x as { name?: string })?.name === "api" ? [{ path: ["name"], message: "api adı eski" }] : [])}
      expand={2} search history onValidate={(e) => $problems = e.length} status typeBadges actions={["add", "delete"]}
      labels={{ root: "ayarlar", search: "Ayarlarda ara", valid: "Her şey yolunda", problems: (n) => `${n} düzeltilecek yer`,
        noMatches: "Bulunamadı", undo: "Geri al", redo: "Yinele", key: "Ad", valueName: (k) => `${k} değeri`, emptyText: "boş",
        items: (n) => `${n} öğe`, fields: (n) => `${n} alan`, addInside: "İçine ekle", addAfter: "Sonrasına ekle", duplicate: "Çoğalt",
        delete: "Sil", changeType: "Türü değiştir", typeOf: (k) => `Tür: ${k}`, kinds: { string: "metin", number: "sayı", boolean: "evet/hayır" } }} />
    {/* A read-only copy of the same value on a dark card (m:theme="night" draws this subtree in the dark theme): readonly
            stops edits; search, history, status, typeBadges and actions are switched off; expand={1} opens one level. */}
    <Card m:theme="night">
      <TreeEditor value={$v} readonly search={false} history={false} status={false} typeBadges={false} actions={false} expand={1} label="Salt okunur kopya" />
    </Card>
  </div>
}
