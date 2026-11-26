// GiftCode: a creative, minimal masked field.
//
// What it shows: TextInput with a `mask` from march/mask. The gift code is three groups of four capitals and digits
// ("AB12-CD34-EF56"); the dashes come by themselves, lower-case letters become capitals, anything else is refused with a
// short shake. maskPlaceholder="ghost" draws the rest of the template faded after the text, so the person always sees how
// much is left; when the code is complete the check mark pops in and the card lights up.
// When to use it: any fixed-format code (vouchers, licence keys, booking references) where the format itself is the hint.
//
// Animation: the mask's own (literals fade in, slots grow as they fill, the shake, the check mark), all on the motion
// engine, so global speed / pause and reduced motion apply. maskMotion={false} turns them all off; maskMotion={{ reject:
// false }} turns one off; maskMotion={{ fill: (el) => … }} plays your own.
// Accessibility: still a real <input>; the format hint is read through aria-describedby, completion is announced once.
import { TextInput, Card } from "march/ui"
import { licenseKey } from "march/mask/presets"

export function GiftCode() {
  // Reactive state: the raw code (without dashes) and whether the mask says it is complete.
  let $code = ""
  let $done = false
  // licenseKey({ groups, size }) is a preset: groups × size capitals and digits joined by "-". Built once, outside the JSX,
  // so the mask is not rebuilt on every render.
  const mask = licenseKey({ groups: 3, size: 4 })
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 2 }}>
      <span sx={{ text: "sm", color: "muted" }}>Hediye kodunu yaz</span>
      {/* bind:value holds the raw value ("AB12CD34EF56"); maskValue="masked" would hold "AB12-CD34-EF56" instead.
          onMaskState runs on every change with { text, raw, complete, error, value }: we only keep `complete`. */}
      <TextInput bind:value={$code} mask={mask} maskPlaceholder="ghost" aria-label="Hediye kodu"
        onMaskState={(s: { complete: boolean }) => $done = s.complete} />
      {/* A derived line: the text and its color follow $done. */}
      <span sx={{ text: "sm", color: $done ? "brand-green" : "muted" }}>{$done ? "Kod hazır: hediyen hesabına geçecek" : `${$code.length} / 12`}</span>
    </div>
  </Card>
}
