import { ColorInput, Field, Card, Button, Swatch, toast } from "march/ui"
import { check } from "march/icons"

// mağaza ayarları: vitrinin marka ve vurgu rengi, canlı önizleme; yalnız geçerli ve değişmiş renkler kaydedilir
const valid = (c: string) => /^#[0-9a-f]{6}$/.test(c)

export function StoreTheme() {
  let $brand = "#1d9ad6"
  let $accent = "#f2801f"
  let $dirty = false
  const save = () => { $dirty = false; toast(`Renkler kaydedildi: ${$brand} · ${$accent}`) }
  return <Card title="Mağaza görünümü" subtitle="Vitrinde, düğmelerde ve indirim etiketlerinde kullanılır">
    <div sx={{ flex: "col", gap: 3 }}>
      <Field label="Marka rengi" help="Logo, başlıklar ve bağlantılar">
        <ColorInput bind:value={$brand} onChange={() => $dirty = true} required />
      </Field>
      <Field label="Vurgu rengi" help="Sepete ekle düğmesi" error={valid($accent) ? null : "#RRGGBB biçiminde yazın"}>
        <ColorInput bind:value={$accent} onChange={() => $dirty = true} invalid={!valid($accent)} />
      </Field>
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <span sx={{ text: "sm", color: "muted" }}>Önizleme</span>
        <Swatch color={$brand} label="Marka" />
        <Swatch color={$accent} label="Vurgu" shape="circle" />
        <Swatch color={`linear-gradient(90deg, ${$brand}, ${$accent})`} label="Kampanya afişi" size="lg">Aa</Swatch>
      </div>
      <div sx={{ flex: ["row", "end"] }}>
        <Button variant="primary" icon={check} disabled={!$dirty || !valid($brand) || !valid($accent)} on:click={save}>Kaydet</Button>
      </div>
    </div>
  </Card>
}
