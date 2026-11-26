// JsonEditorLab: the full-featured JsonEditor example; it uses every prop at least once.
//
// Props shown here: value and onChange, rows, validate (an extra check), schema, indent, tabIndent, mode and modes, expand, format,
// status, labels (including the invalid and more functions), readonly and class.
// Use it as a reference when you need one option: find the prop below and copy the line.
// JsonEditorLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { JsonEditor, Card, Badge } from "march/ui"

// A JSON Schema (a subset): required fields, types, a minimum, and an array of strings. Both views use it.
const SCHEMA = {
  type: "object", required: ["name", "port"],
  properties: { name: { type: "string" }, port: { type: "integer", minimum: 1024 }, tags: { type: "array", items: { type: "string" } } },
} as const

export function JsonEditorLab() {
  // The value and a change counter.
  let $v: unknown = { name: "api", port: 80, tags: ["eu", 1] }
  let $changes = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* Shows how many times onChange fired. */}
    <Badge tone="neutral">{`${$changes} değişiklik`}</Badge>
    {/* - value + onChange: the one-way form of bind:value (we write the new value back ourselves).
        - rows={8}: height of the text view. schema: the JSON Schema; the text view lists the first problem with its path and,
          with our `more` text, how many others there are.
        - indent={4}: the width of the Format button's indentation. tabIndent: Tab inserts spaces in the text view.
        - mode="text" / modes: the first view and the views offered. expand={1}: tree levels open at the start.
        - format: the Format button. status: the "valid" confirmation line.
        - validate(value): an extra check; return a message for a problem or null for none (here the name "root" is reserved).
        - labels: our texts; invalid(line, column) and more(count) are functions that build a text.
        - aria-label and class: the accessible name and a hook for tests and CSS. */}
    <JsonEditor value={$v} onChange={(x) => { $v = x; $changes++ }} class="lab-json" aria-label="Sunucu ayarı"
      rows={8} schema={SCHEMA} indent={4} tabIndent mode="text" modes={["text", "tree"]} expand={1} format status
      validate={(x) => ((x as { name?: string })?.name === "root" ? "root adı ayrılmış" : null)}
      labels={{ text: "Kaynak", tree: "Ana hat", view: "Görünüm", treeName: "Ayar ağacı", fixFirst: "Önce JSON'u düzeltin",
        valid: "Sorun yok", format: "Toparla", invalid: (line, col) => `Bozuk JSON: ${line}. satır, ${col}. sütun`, more: (n) => `(+${n} sorun daha)` }} />
    {/* A second, read-only editor on a dark surface: readonly cannot be edited, format / status / tabIndent switched off, tree
        view only (modes with one view hide the switcher), expand={2}. */}
    <Card m:theme="night">
      <JsonEditor value={$v} mode="tree" modes={["tree"]} readonly format={false} status={false} tabIndent={false} expand={2} aria-label="Salt okunur ağaç" />
    </Card>
  </div>
}
