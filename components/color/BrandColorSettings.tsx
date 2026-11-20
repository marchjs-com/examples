import { ColorPicker, Card, Button, toast } from "march/ui"

// mağaza ayarları: marka rengini seç, düğmenin nasıl görüneceğine bak, kaydet; paletler mağazanın kendi renkleri
const PALETTES = [{ label: "Mağaza renkleri", colors: ["#e4572e", "#17bebb", "#ffc914", "#2e282a", "#76b041"] }]

export function BrandColorSettings() {
  let $brand = "#17bebb"
  let $saved = "#17bebb"
  return <Card>
    <div sx={{ flex: "col", gap: 3 }}>
      <b>Marka rengi</b>
      <ColorPicker bind:value={$brand} alpha={false} palettes={PALETTES} recent={4} preview={false} aria-label="Marka rengi" />
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <span sx={{ text: "sm", color: "muted" }}>Önizleme:</span>
        <span style={{ background: $brand, color: "white", padding: "0.4rem 0.9rem", borderRadius: "0.5rem" }}>Sepete ekle</span>
      </div>
      <Button disabled={$brand === $saved} on:click={() => { $saved = $brand; toast(`Marka rengi ${$brand} kaydedildi`) }}>Kaydet</Button>
    </div>
  </Card>
}
