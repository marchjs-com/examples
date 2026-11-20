import { TreeEditor, Card, Badge } from "march/ui"

// TreeEditor'ün bütün özellikleri: değer ve onChange, şema, ek denetim (validate yollarıyla), açık düzey, arama,
// geri alma, ağacın adı, onValidate, durum yazısı, tür rozetleri, satır eylemleri, kendi metinleri, sınıf, salt okunur
const SCHEMA = { type: "object", properties: { port: { type: "integer", minimum: 1024 }, tags: { type: "array", items: { type: "string" } } } } as const

export function TreeEditorLab() {
  let $v: unknown = { name: "api", port: 80, debug: false, tags: ["eu", "us"], note: "" }
  let $changes = 0
  let $problems = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <Badge tone="neutral">{`${$changes} değişiklik · ${$problems} sorun`}</Badge>
    <TreeEditor value={$v} onChange={(x) => { $v = x; $changes++ }} class="lab-tree" label="Sunucu"
      schema={SCHEMA} validate={(x) => ((x as { name?: string })?.name === "api" ? [{ path: ["name"], message: "api adı eski" }] : [])}
      expand={2} search history onValidate={(e) => $problems = e.length} status typeBadges actions={["add", "delete"]}
      labels={{ root: "ayarlar", search: "Ayarlarda ara", valid: "Her şey yolunda", problems: (n) => `${n} düzeltilecek yer`,
        noMatches: "Bulunamadı", undo: "Geri al", redo: "Yinele", key: "Ad", valueName: (k) => `${k} değeri`, emptyText: "boş",
        items: (n) => `${n} öğe`, fields: (n) => `${n} alan`, addInside: "İçine ekle", addAfter: "Sonrasına ekle", duplicate: "Çoğalt",
        delete: "Sil", changeType: "Türü değiştir", typeOf: (k) => `Tür: ${k}`, kinds: { string: "metin", number: "sayı", boolean: "evet/hayır" } }} />
    <Card m:theme="night">
      <TreeEditor value={$v} readonly search={false} history={false} status={false} typeBadges={false} actions={false} expand={1} label="Salt okunur kopya" />
    </Card>
  </div>
}
