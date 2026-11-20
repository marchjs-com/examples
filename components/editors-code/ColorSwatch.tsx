import { CodeEditor, Card } from "march/ui"

// renk tahtası: CSS'teki ilk renk kodu yanındaki daireyi boyar; renk kodunun altında kendi rengi çizilir
export function ColorSwatch() {
  let $css = ".logo {\n  color: #ff7a00;\n  border-radius: 50%;\n}"
  const $color = /#[0-9a-fA-F]{3,8}\b/.exec($css)?.[0] ?? "transparent"
  return <Card>
    <div sx={{ flex: ["row", "center"], gap: 3 }}>
      <div role="img" aria-label="Renk örneği" style={{ width: "4rem", height: "4rem", "flex-shrink": "0", "border-radius": "50%", background: $color }} />
      <CodeEditor bind:value={$css} lang="css" label="CSS" message={`Renk: ${$color}`} copy={false} shortcuts={false} />
    </div>
  </Card>
}
