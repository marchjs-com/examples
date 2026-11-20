import { FontPicker, TextInput, Card, type FontChoice } from "march/ui"

// dükkân tabelası: adını yaz, cihazdaki yazı tiplerinden birini seç (hiçbir yere istek gitmez), tabela o yazıyla asılır
export function ShopSign() {
  let $name = "Kahve Durağı"
  let $font = "Georgia"
  let $stack = "Georgia, serif"
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <TextInput bind:value={$name} aria-label="Dükkânın adı" />
      <FontPicker bind:value={$font} catalog={false} specimen={false} closeOnPick onPick={(c: FontChoice) => $stack = c.stack} />
    </div>
    <Card m:theme="night">
      <div style={{ fontFamily: $stack, fontSize: "2.4rem", textAlign: "center", letterSpacing: "0.04em" }}>{$name}</div>
    </Card>
  </div>
}
