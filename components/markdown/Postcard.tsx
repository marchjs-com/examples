import { MarkdownEditor, Card } from "march/ui"

// kartpostal: arkasına Markdown ile yazılır, "Ön yüz" sekmesi yazıyı gece temalı bir kartta gösterir
export function Postcard() {
  let $md = "**Selam** Ece!\n\nKapadokya'dan sevgiler. Balonlar *şafakta* kalkıyor:\n\n- sıcak çikolata\n- bol fotoğraf"
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ text: "lg", color: "brand-gold" }}>Kapadokya'dan kartpostal</span>
      <MarkdownEditor bind:value={$md} views={["write", "preview"]} view="preview" rows={6} stats={false}
        toolbar={["bold", "italic", "|", "ul"]} labels={{ write: "Arka yüz", preview: "Ön yüz" }} />
    </div>
  </Card>
}
