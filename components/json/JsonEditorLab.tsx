import { JsonEditor, Card, Badge } from "march/ui"

// JsonEditor'ün bütün özellikleri: değer ve onChange, satır sayısı, ek denetim (validate), şema, biçim girintisi, Tab
// girintisi, ilk görünüm ve sunulan görünümler, ağacın açık düzeyi, Biçimlendir düğmesi, "geçerli" satırı, kendi
// metinleri (invalid ve more işlevleri dahil), salt okunur, sınıf
const SCHEMA = {
  type: "object", required: ["name", "port"],
  properties: { name: { type: "string" }, port: { type: "integer", minimum: 1024 }, tags: { type: "array", items: { type: "string" } } },
} as const

export function JsonEditorLab() {
  let $v: unknown = { name: "api", port: 80, tags: ["eu", 1] }
  let $changes = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Badge tone="neutral">{`${$changes} değişiklik`}</Badge>
    <JsonEditor value={$v} onChange={(x) => { $v = x; $changes++ }} class="lab-json" aria-label="Sunucu ayarı"
      rows={8} schema={SCHEMA} indent={4} tabIndent mode="text" modes={["text", "tree"]} expand={1} format status
      validate={(x) => ((x as { name?: string })?.name === "root" ? "root adı ayrılmış" : null)}
      labels={{ text: "Kaynak", tree: "Ana hat", view: "Görünüm", treeName: "Ayar ağacı", fixFirst: "Önce JSON'u düzeltin",
        valid: "Sorun yok", format: "Toparla", invalid: (line, col) => `Bozuk JSON: ${line}. satır, ${col}. sütun`, more: (n) => `(+${n} sorun daha)` }} />
    <Card m:theme="night">
      <JsonEditor value={$v} mode="tree" modes={["tree"]} readonly format={false} status={false} tabIndent={false} expand={2} aria-label="Salt okunur ağaç" />
    </Card>
  </div>
}
