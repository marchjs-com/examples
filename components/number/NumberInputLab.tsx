// NumberInputLab: the full-featured NumberInput example; it uses every prop at least once.
//
// NumberInput is a locale-aware number field: it accepts "12,5" and "12.5", never produces NaN, clamps to min / max
// and steps with ArrowUp / ArrowDown. Props shown here: bind:value and onChange, min / max, step, decimals and
// minDecimals, grouping, scale, locale, prefix / suffix, ref, placeholder, autocomplete, inputmode, maxLength,
// required, invalid, disabled, readonly, id / name / class, aria-label, describedby, onFocus / onBlur; and the family
// at the bottom: IntInput, MoneyInput and PercentInput.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// NumberInputLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { NumberInput, IntInput, MoneyInput, PercentInput, Card } from "march/ui"

// One block of the Lab: a small muted heading and the fields under it. Plain composition, no NumberInput feature.
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: "col", gap: 2 }}>{props.children}</div>
</div>

export function NumberInputLab() {
  // Reactive values. The value of a NumberInput is a number, or null while the field is empty.
  let $qty = 3
  let $edits = 0
  let $amount = 1499.9
  let $ratio = 0.025
  let $weight: number | null = null
  let $focused = false
  let $tag = ""
  let $int = 42
  let $price = 249.5
  let $rate = 0.18
  return <div sx={{ flex: "col", gap: 4 }}>
    <Row title="Sınır ve adım: 1–10 adet, ↑ / ↓ birer birer; onChange">
      {/* min / max limit the value (applied when the field is left, and by the arrow keys). step={1}: ArrowUp /
          ArrowDown change it by one. decimals={0}: whole numbers. suffix: a unit after the number. onChange runs
          after every edit (the counter below). aria-label gives the field its accessible name. */}
      <NumberInput bind:value={$qty} min={1} max={10} step={1} decimals={0} suffix="adet" aria-label="Adet" onChange={() => $edits++} />
      <span sx={{ text: "sm" }}>Adet: {$qty} · değişiklik: {$edits}</span>
    </Row>
    <Row title="Ondalık, en az ondalık, binlik ayırıcı, önek, dil (tr-TR)">
      {/* decimals={2} rounds to two digits; minDecimals={2} pads ("1499,90"); grouping adds thousands separators
          while the field is not being edited; prefix puts a sign before the number; locale="tr-TR" writes and reads
          the number the Turkish way. The stored value is always a plain JavaScript number (shown below). */}
      <NumberInput bind:value={$amount} decimals={2} minDecimals={2} grouping prefix="₺" locale="tr-TR" aria-label="Tutar" />
      <span sx={{ text: "sm" }}>Saklanan tutar: {$amount}</span>
    </Row>
    <Row title="Ölçek: binde gösterilir, oran saklanır">
      {/* scale={1000}: display = value x scale. The ratio 0.025 is shown as 25 per mille and typing 40 stores 0.04. */}
      <NumberInput bind:value={$ratio} scale={1000} decimals={1} suffix="‰" aria-label="Binde oran" />
      <span sx={{ text: "sm" }}>Saklanan oran: {$ratio}</span>
    </Row>
    <Row title="Başka bir dil (de-DE), salt okunur">
      {/* A different locale formats the same kind of number its own way (German: dots for thousands, a comma for
          decimals). readonly: the text can be read and selected but not changed. */}
      <NumberInput value={1234567.891} locale="de-DE" grouping decimals={2} readonly aria-label="Almanca biçim" />
    </Row>
    <Row title="Form: boş başlar, zorunlu, geçersiz, yer tutucu, ref, odak">
      {/* Form use. The value starts as null (an empty field).
          - id / name / class: for labels, form submission and CSS or tests. required: the field must be filled.
          - invalid: marks the field with aria-invalid; here it is true while the value is empty. (The component itself
            refuses characters that make no number, with a short shake: `motion={false}` turns it off.)
          - placeholder, autocomplete="off" and maxLength: the usual input attributes. inputmode="decimal" makes
            phones show a keypad with a decimal mark.
          - describedby points at the hint text below, so a screen reader reads it with the field.
          - ref receives the real <input> element (here only to show its tag name).
          - onFocus / onBlur: focus entering and leaving the field. */}
      <NumberInput bind:value={$weight} aria-label="Kilo" id="lab-weight" name="weight" class="lab-weight" required invalid={$weight === null}
        placeholder="Ör. 72,5" suffix="kg" decimals={1} autocomplete="off" inputmode="decimal" maxLength={6}
        describedby="lab-weight-hint" ref={(el: HTMLInputElement) => $tag = el.tagName.toLowerCase()}
        onFocus={() => $focused = true} onBlur={() => $focused = false} />
      <span id="lab-weight-hint" sx={{ text: "sm", color: "muted" }}>Kilo: {$weight ?? "boş"} · ref: {$tag} · {$focused ? "yazıyorsun" : "odak dışında"}</span>
      {/* disabled: cannot be focused or changed. */}
      <NumberInput value={7} disabled aria-label="Kilitli sayı" />
    </Row>
    {/* m:theme="night" on the Card makes the card and everything inside use the dark theme tokens. */}
    <Card m:theme="night">
      <Row title="Aile: IntInput, MoneyInput, PercentInput (koyu zemin)">
        {/* The family is NumberInput with preset props: IntInput has 0 decimals; MoneyInput puts the currency symbol
            on the locale's side and uses the currency's decimals with grouping; PercentInput shows 18 % for the stored
            0.18 (set fraction={false} to store 18 instead). */}
        <IntInput bind:value={$int} min={0} aria-label="Tam sayı" />
        <MoneyInput bind:value={$price} currency="EUR" aria-label="Avro fiyat" />
        <PercentInput bind:value={$rate} aria-label="KDV oranı" />
        <span sx={{ text: "sm" }}>{$int} · {$price} · {$rate}</span>
      </Row>
    </Card>
  </div>
}
