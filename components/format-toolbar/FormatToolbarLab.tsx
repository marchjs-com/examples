import { FormatToolbar, Card, Badge, Button } from "march/ui"
import { bold as boldIcon } from "march/icons"
import type { FormatTool } from "march/ui"

// FormatToolbar'ın bütün özellikleri: araç listesi ve ayırıcı, onTool, çubuğun adı (canlı), araç adları (labels ve
// name işlevi), kendi ikonları (false: ikonsuz), tek tek devre dışı, aç / kapa (pressed), kısayollar (keys),
// ipucunda kısayol (hints), boyut, sınıf öneki (prefix), düğmeye ek öznitelikler (attrs), sınıf
export function FormatToolbarLab() {
  let $bold = false
  let $italic = true
  let $last = "yok"
  let $count = 0
  let $big = true
  const run = (tool: FormatTool) => {
    if (tool === "bold") $bold = !$bold
    if (tool === "italic") $italic = !$italic
    $last = tool
    $count++
  }
  return <div sx={{ flex: "col", gap: 3 }}>
    <FormatToolbar tools={["bold", "italic", "strike", "|", "link", "code", "|", "undo", "redo"]} onTool={run}
      label={() => `Biçim (${$count})`} labels={() => ({ bold: $bold ? "Kalın: açık" : "Kalın: kapalı", italic: "Eğik" })}
      name={(tool) => (tool === "link" ? "Bağlantı ekle" : undefined)}
      icons={{ bold: boldIcon, strike: "S", code: false }} pressed={{ bold: () => $bold, italic: () => $italic }}
      disabled={(tool) => tool === "redo"} keys={{ link: "Control+L", code: false }} hints={() => $big}
      size={() => ($big ? "md" : "sm")} prefix="lab" class="lab-bar"
      attrs={(tool) => (tool === "link" ? { "aria-haspopup": "dialog", class: "lab-link" } : {})} />
    <div sx={{ flex: ["row", "center"], gap: 2 }}>
      <Badge tone="neutral">{`Son araç: ${$last}`}</Badge>
      <Button size="sm" variant="secondary" on:click={() => $big = !$big}>{$big ? "Küçült" : "Büyüt (ipucunda kısayol)"}</Button>
    </div>
    <Card m:theme="night">
      <FormatToolbar tools={["h2", "h3", "|", "ul", "ol", "task", "quote"]} onTool={run} disabled label="Kapalı çubuk" />
    </Card>
  </div>
}
