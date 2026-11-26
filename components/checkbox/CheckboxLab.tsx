// CheckboxLab: the full-featured Checkbox example; it uses every prop at least once.
//
// Props shown here: variant, size, shape, icon, animate, hint, label or children, bind:value and onChange, indeterminate,
// disabled, readonly, required, invalid with describedby, a checkbox without a label (aria-label / ariaLabel /
// labelledby), id, name, class, onClick, tabIndex, onFocus / onBlur and the common prop m:color.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// CheckboxLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Checkbox, Card } from "march/ui"
import { star, heart, users } from "march/icons"

const variants = ["classic", "soft", "chip", "card", "toggle"] as const
const sizes = ["sm", "md", "lg"] as const
const shapes = ["square", "rounded", "circle"] as const

// A layout helper: a caption above, the boxes below in a wrapping row. Only the Lab uses it.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: ["row", "wrap"], gap: 3 }}>{props.children}</div>
</div>

export function CheckboxLab() {
  // Plain `let $x` variables are signals: when one changes, only the places that read it update.
  let $agree = false
  let $last = "—"
  let $news = true
  let $clicks = 0
  let $focus = "dışarıda"
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* variant: classic, soft, chip, card or toggle: the same checkbox in different looks. */}
    <Row title="Görünüm">{variants.map((v) => <Checkbox variant={v} label={`Görünüm: ${v}`} value={v !== "classic"} />)}</Row>
    {/* size: sm / md / lg. shape: square, rounded or circle (each look supports the corner shapes that suit it). */}
    <Row title="Boyut">{sizes.map((s) => <Checkbox size={s} label={`Boyut: ${s}`} value={true} />)}</Row>
    <Row title="Köşe">{shapes.map((sh) => <Checkbox shape={sh} label={`Köşe: ${sh}`} value={true} />)}</Row>
    {/* icon is drawn instead of the tick; m:color (a common prop) sets the colour token of the box. animate={false}
        switches the box motion off: with it on, the motion engine already honours reduced motion and the global
        speed / "Stop all" settings, so turn it off only where motion is never wanted. In the card look `hint` is the
        smaller description under the label. */}
    <Row title="İkon ve hareket">
      <Checkbox icon={star} m:color="brand-gold" label="Yıldızlı" value={true} />
      <Checkbox icon={heart} m:color="brand-pink" label="Favori" />
      <Checkbox animate={false} label="Animasyonsuz" />
      <Checkbox variant="card" icon={users} label="Ekip planı" hint="10 kişiye kadar" />
    </Row>
    {/* bind:value keeps $agree and the box in sync both ways; onChange also receives the new boolean (here it
        writes a text so the change is visible). required marks the field as required for forms and screen readers.
        Children can be the label instead of the `label` prop; they can hold any markup. */}
    <Row title="Değer">
      <Checkbox bind:value={$agree} required label="Koşulları kabul ediyorum"
        onChange={(v: boolean) => $last = v ? "işaretlendi" : "kaldırıldı"} />
      <span>Onay: {$agree ? "evet" : "hayır"} · son: {$last}</span>
      <Checkbox bind:value={$news} hint="Haftada bir e-posta">Bültene abone ol</Checkbox>
      <span>Bülten: {$news ? "açık" : "kapalı"}</span>
    </Row>
    {/* States: indeterminate draws the dash (the "some selected" state), disabled and readonly lock the real input
        (Tab skips it), invalid sets aria-invalid and describedby links the error text so a screen reader reads it. */}
    <Row title="Durum">
      <Checkbox indeterminate value={true} label="Bazı dosyalar seçili" />
      <Checkbox disabled label="Devre dışı" />
      <Checkbox readonly value={true} label="Salt okunur" />
      <Checkbox invalid describedby="kvkk-error" label="KVKK metnini okudum" />
      <span id="kvkk-error" sx={{ text: "xs", color: "danger" }}>Bu onay zorunlu</span>
    </Row>
    {/* Without a label only the box is drawn (a table selection cell): name it with aria-label (or ariaLabel, or
        labelledby that points to another element's id). id and name go to the input; class to the checkbox root;
        onClick receives the click event (e.shiftKey tells a range selection); tabIndex sets the tab order, e.g.
        -1 in a grid that moves focus with the arrow keys. */}
    <Row title="Etiketsiz kutu ve kimlik">
      <Checkbox aria-label="Satırı seç" id="row-1" name="rows" class="lab-row" tabIndex={0} onClick={() => $clicks++} />
      <span>Tıklama: {$clicks}</span>
      <Checkbox ariaLabel="Tümünü seç" />
      <span id="lab-caption">Başlığa bağlı kutu</span>
      <Checkbox labelledby="lab-caption" />
    </Row>
    {/* onFocus / onBlur run when keyboard focus enters or leaves the box. */}
    <Row title="Odak">
      <Checkbox label="Odakla beni" onFocus={() => $focus = "içeride"} onBlur={() => $focus = "dışarıda"} />
      <span>Odak: {$focus}</span>
    </Row>
    {/* m:theme="night" draws this card in the dark theme whatever the page theme is. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <Checkbox variant="toggle" m:color="brand-purple" label="Karanlık mod" value={true} />
        <Checkbox variant="soft" label="Koyuda yumuşak" value={true} />
      </Row>
    </Card>
  </div>
}
