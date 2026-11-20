import { RichTextEditor, Card } from "march/ui"

// 280 karakterlik kısa not: sade araç çubuğu, sayaç kalan karakteri sayar; sınır aşılınca kart kırmızıya döner
const LIMIT = 280

export function ShortNote() {
  let $md = "Bugün **sahilde** koştum, deniz *çarşaf* gibiydi :)"
  const $left = LIMIT - $md.length
  return <Card m:color={$left < 0 ? "danger" : "brand-blue"}>
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ text: "lg", color: $left < 0 ? "danger" : "brand-blue" }}>{$left < 0 ? "Biraz kısalt" : "Ne düşünüyorsun?"}</span>
      <RichTextEditor bind:value={$md} rows={3} toolbar={["bold", "italic", "strike", "|", "emoji"]} hint={false}
        placeholder="Kısa bir şey yaz…" labels={{ count: () => `${$left} karakter kaldı` }} />
    </div>
  </Card>
}
