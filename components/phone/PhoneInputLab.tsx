// PhoneInputLab: the full-featured PhoneInput example; it uses every prop at least once.
//
// PhoneInput is a phone number field. The stored value is "+" and digits ("+447700900123"). With `country` the calling code
// is shown as a prefix and put in front of national numbers; without it, a typed "+" or "00" starts an international number.
// Props shown here: bind:value and onChange, country, your own prefix / suffix, placeholder, autocomplete, inputmode,
// maxLength, required, invalid, disabled, readonly, id / name / class, aria-label, describedby and the focus events, plus a
// dark background.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// PhoneInputLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { PhoneInput, Card } from "march/ui"
import { Icon, phone } from "march/icons"

// One example of the Lab: a small muted title and the fields under it. Plain composition, no PhoneInput feature.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: "col", gap: 2 }}>{props.children}</div>
</div>

export function PhoneInputLab() {
  // Reactive state: the stored values of the three editable fields, an edit counter, focus, and whether the office
  // number is too short (a Turkish number is 13 characters: "+90" and ten digits).
  let $tr = ""
  let $world = ""
  let $office = "+902125550101"
  let $edits = 0
  let $focused = false
  const $short = $office.length > 0 && $office.length < 13
  return <div sx={{ flex: "col", gap: 4 }}>
    <Row title="Ülke kodu (country), bind:value, onChange">
      {/* country="+90": the code is shown as a prefix and put in front of the national number, so typing "0532 111-22-33"
          stores "+905321112233" (the leading 0, spaces and dashes are removed). bind:value keeps $tr in step; onChange
          runs after every edit. placeholder: the expected shape. aria-label: the accessible name (no visible label). */}
      <PhoneInput bind:value={$tr} country="+90" placeholder="532 111 22 33" aria-label="Türkiye numarası" onChange={() => $edits++} />
      <span sx={{ text: ["sm", "mono"] }}>Saklanan: {$tr || "—"} · değişiklik: {$edits}</span>
    </Row>
    <Row title="Ülke kodu yok: + ya da 00 ile uluslararası">
      {/* Without `country` the field takes an international number: a typed "+" is kept and a leading "00" becomes "+". */}
      <PhoneInput bind:value={$world} placeholder="+49 151 2345 6789" aria-label="Uluslararası numara" />
      <span sx={{ text: ["sm", "mono"] }}>Uluslararası: {$world || "—"}</span>
    </Row>
    <Row title="Kendi önek ve sonekin">
      {/* prefix and suffix take your own content (a node or text), here an icon before the number and a text after it. */}
      <PhoneInput prefix={<Icon of={phone} />} suffix="dahili 12" value="+902125550199" aria-label="Santral" />
    </Row>
    <Row title="Form: zorunlu, geçersiz, uzunluk, otomatik doldurma, odak">
      {/* Form use.
          - id / name / class: for labels, form submission and CSS or tests. required: the field must be filled.
          - invalid: marks the field with aria-invalid; here it is true while the number is non-empty but too short.
          - autocomplete="tel-national": tells the browser to fill the national part only (the default is "tel").
            inputmode="tel": the phone keypad on touch screens. maxLength: the longest text.
          - describedby points at the hint text below, so a screen reader reads it with the field.
          - onFocus / onBlur: focus entering and leaving the field. */}
      <PhoneInput bind:value={$office} aria-label="İş telefonu" country="+90" id="lab-office-phone" name="office-phone" class="lab-phone" required
        invalid={$short} autocomplete="tel-national" inputmode="tel" maxLength={16} describedby="lab-phone-hint"
        onFocus={() => $focused = true} onBlur={() => $focused = false} />
      <span id="lab-phone-hint" sx={{ text: "sm", color: "muted" }}>{$short ? "Numara eksik" : "Numara tamam"} · {$focused ? "yazıyorsun" : "odak dışında"}</span>
    </Row>
    <Row title="Devre dışı ve salt okunur">
      {/* disabled turns the field off; readonly keeps the number readable but not editable. The calling code stays in the
          prefix, and the field shows only the national part. */}
      <PhoneInput value="+905321112233" country="+90" disabled aria-label="Kilitli numara" />
      <PhoneInput value="+442079460000" country="+44" readonly aria-label="Salt okunur numara" />
    </Row>
    {/* m:theme="night" on the Card makes the card and everything inside use the dark theme tokens. */}
    <Card m:theme="night">
      <Row title="Koyu zemin">
        <PhoneInput value="+15550143" country="+1" aria-label="Gece hattı" />
      </Row>
    </Card>
  </div>
}
