// NeonSign: the creative-minimal FormatToolbar example.
//
// What it shows: three toggle tools (bold, italic, strike) with letter icons that style a neon sign on a dark card.
// When to use this pattern: FormatToolbar is not only for text editors. Any set of on / off style switches can use it:
// `pressed` gives each tool its on / off look, and `onTool` just flips the matching flag.
// Keyboard and accessibility: the bar is a role="toolbar" with one Tab stop; arrow keys, Home and End move between tools;
// toggle tools expose aria-pressed.
import { FormatToolbar, Card } from "march/ui"

export function NeonSign() {
  // One boolean per style. They are the single source of truth: both the toolbar and the sign read them.
  let $bold = true
  let $italic = false
  let $strike = false
  // onTool receives the name of the pressed tool; each press flips that tool's flag.
  const toggle = (tool: "bold" | "italic" | "strike") => {
    if (tool === "bold") $bold = !$bold
    else if (tool === "italic") $italic = !$italic
    else $strike = !$strike
  }
  // m:theme="night" draws the card and everything in it in the dark colour theme.
  return <Card m:theme="night">
    <div sx={{ flex: ["col", "center"], gap: 3 }}>
      {/* - tools: which tools to show, in order ("|" would add a separator).
          - onTool: called with the tool name on every press.
          - size="md": the larger buttons. m:color: a common prop that sets the colour token of the bar.
          - icons: your own marks (here plain letters instead of the built-in icons).
          - pressed: for each toggle tool, a function that says whether it is on; it sets aria-pressed and the pressed look. */}
      <FormatToolbar tools={["bold", "italic", "strike"]} onTool={toggle} size="md" m:color="brand-pink"
        icons={{ bold: "B", italic: "I", strike: "S" }} pressed={{ bold: () => $bold, italic: () => $italic, strike: () => $strike }} />
      {/* The result: the sign's style follows the flags. Colour comes from the sx prop; the rest from inline style. */}
      <span sx={{ text: "xl", color: "brand-pink" }} style={{ "font-weight": $bold ? "800" : "400", "font-style": $italic ? "italic" : "normal", "text-decoration": $strike ? "line-through" : "none" }}>
        AÇIĞIZ
      </span>
    </div>
  </Card>
}
