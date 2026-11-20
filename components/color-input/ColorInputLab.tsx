import { ColorInput, Field, Card } from "march/ui"

// ColorInput'un bütün özellikleri bir arada: bind:value ve onChange, kutunun adı (swatchLabel), yer tutucu,
// zorunlu, geçersiz, odak olayları; yalnız kutu (text={false}), yalnız metin (swatch={false}) ile id / name / class /
// aria-label / describedby; salt okunur, devre dışı ve koyu zemin
const Section = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>{props.children}</div>
</div>

export function ColorInputLab() {
  let $color = "#f2801f"
  let $changes = 0
  let $focused = false
  const $valid = /^#[0-9a-f]{6}$/.test($color)
  return <div sx={{ flex: "col", gap: 3 }}>
    <Section title="Değer (bind:value + onChange)">
      <Field label="Ana renk">
        <ColorInput bind:value={$color} onChange={() => $changes++} swatchLabel="Ana rengi seç" placeholder="#f2801f"
          required invalid={!$valid} onFocus={() => $focused = true} onBlur={() => $focused = false} />
      </Field>
      <span>Seçili: {$color}</span>
      <span>Değişiklik: {$changes}</span>
      <span>{$focused ? "Odakta" : "Odak dışında"}</span>
    </Section>
    <Section title="Parçalar">
      <ColorInput bind:value={$color} text={false} swatchLabel="Yalnız kutu" />
      <ColorInput bind:value={$color} swatch={false} id="lab-code" name="accentCode" class="lab-code"
        aria-label="Yalnız metin" describedby="lab-hint" />
      <span id="lab-hint" sx={{ text: "xs", color: "muted" }}>Altı haneli onaltılık renk</span>
    </Section>
    <Section title="Durum">
      <ColorInput value="#78be3a" readonly swatchLabel="Salt okunur renk" aria-label="Salt okunur kod" />
      <ColorInput value="#a3338c" disabled swatchLabel="Kapalı renk" aria-label="Kapalı kod" />
    </Section>
    <Card m:theme="night">
      <Section title="Koyu zemin">
        <ColorInput bind:value={$color} swatchLabel="Gece rengini seç" ariaLabel="Gece rengi kodu" />
      </Section>
    </Card>
  </div>
}
