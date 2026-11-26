// ColorSwatch: the creative-minimal CodeEditor example.
//
// What it shows: a colour board. The first colour code in the CSS (#ff7a00) paints the circle beside the editor, and the
// foot line of the editor writes the colour it found. Edit the code and the circle follows.
// When to use this pattern: when the owner reads the editor's text and shows something from it. CodeEditor does not run
// or compile anything: `value` is yours to interpret.
// Accessibility: the circle is an image with a text alternative; the editor's text field is named by `label`.
import { CodeEditor, Card } from "march/ui"

// $css is bound to the editor; $color is derived: the first hex colour in it, or transparent when there is none.
export function ColorSwatch() {
  let $css = ".logo {\n  color: #ff7a00;\n  border-radius: 50%;\n}"
  const $color = /#[0-9a-fA-F]{3,8}\b/.exec($css)?.[0] ?? "transparent"
  return <Card>
    <div sx={{ flex: ["row", "center"], gap: 3 }}>
      {/* The swatch: role="img" with an aria-label gives it a text alternative; its background is the derived colour. */}
      <div role="img" aria-label="Renk örneği" style={{ width: "4rem", height: "4rem", "flex-shrink": "0", "border-radius": "50%", background: $color }} />
      {/* bind:value keeps the editor and $css in step; lang="css" colours the text; label names the field. message is the foot
              line (here the found colour); copy={false} and shortcuts={false} remove the copy button and the shortcuts menu. */}
      <CodeEditor bind:value={$css} lang="css" label="CSS" message={`Renk: ${$color}`} copy={false} shortcuts={false} />
    </div>
  </Card>
}
