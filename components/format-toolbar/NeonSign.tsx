import { FormatToolbar, Card } from "march/ui"

// neon tabela: üç aç / kapa aracı (harf ikonlarıyla) gece kartındaki yazının biçimini değiştirir
export function NeonSign() {
  let $bold = true
  let $italic = false
  let $strike = false
  const toggle = (tool: "bold" | "italic" | "strike") => {
    if (tool === "bold") $bold = !$bold
    else if (tool === "italic") $italic = !$italic
    else $strike = !$strike
  }
  return <Card m:theme="night">
    <div sx={{ flex: ["col", "center"], gap: 3 }}>
      <FormatToolbar tools={["bold", "italic", "strike"]} onTool={toggle} size="md" m:color="brand-pink"
        icons={{ bold: "B", italic: "I", strike: "S" }} pressed={{ bold: () => $bold, italic: () => $italic, strike: () => $strike }} />
      <span sx={{ text: "xl", color: "brand-pink" }} style={{ "font-weight": $bold ? "800" : "400", "font-style": $italic ? "italic" : "normal", "text-decoration": $strike ? "line-through" : "none" }}>
        AÇIĞIZ
      </span>
    </div>
  </Card>
}
