// StoreTheme: the real-life ColorInput example.
//
// What it shows: the settings of an online shop: the brand colour and the accent colour, a live preview, and a Save
// button that works only when both colours are valid and something changed.
// When to use this pattern: settings forms with a colour. Wrap each ColorInput in a Field (label, help and error text);
// use `invalid` for the validation state and `onChange` to track that the form is dirty.
// For palettes, gradients or contrast checks use ColorPicker instead; ColorInput is the compact "one hex colour" field.
import { ColorInput, Field, Card, Button, Swatch, toast } from "march/ui"
import { check } from "march/icons"

// A valid colour is a complete lower-case #rrggbb code, which is the format ColorInput produces.
const valid = (c: string) => /^#[0-9a-f]{6}$/.test(c)

export function StoreTheme() {
  let $brand = "#1d9ad6"
  let $accent = "#f2801f"
  // true once the user changed a colour and has not saved yet.
  let $dirty = false
  const save = () => { $dirty = false; toast(`Renkler kaydedildi: ${$brand} · ${$accent}`) }
  return <Card title="Mağaza görünümü" subtitle="Vitrinde, düğmelerde ve indirim etiketlerinde kullanılır">
    <div sx={{ flex: "col", gap: 3 }}>
      {/* Field gives the control its label and help text. onChange marks the form dirty; required marks the field. */}
      <Field label="Marka rengi" help="Logo, başlıklar ve bağlantılar">
        <ColorInput bind:value={$brand} onChange={() => $dirty = true} required />
      </Field>
      {/* The Field shows `error` instead of the help text while the accent is not a valid code; invalid also marks
          the input itself (aria-invalid) so a screen reader announces it. */}
      <Field label="Vurgu rengi" help="Sepete ekle düğmesi" error={valid($accent) ? null : "#RRGGBB biçiminde yazın"}>
        <ColorInput bind:value={$accent} onChange={() => $dirty = true} invalid={!valid($accent)} />
      </Field>
      {/* A live preview with Swatch: a square, a circle and a gradient banner built from the two colours. */}
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
