// KeyValueLab: the full-featured KeyValue example; it uses every prop at least once.
//
// Props shown here: items (an array of { label, value, hint, hidden }, or a plain object), columns (1 to 4), empty
// and class. Labels, values and `hidden` may be functions, so the number of columns and the hidden row change live.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// KeyValueLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { KeyValue, Card, Segmented, Button } from "march/ui"

export function KeyValueLab() {
  // Signals: $cols is the chosen column count (Segmented values are strings), $secret says whether the secret row is
  // hidden.
  let $cols = "2"
  let $secret = true
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* A Segmented control picks the column count; it needs an aria-label because it has no visible caption. */}
    <Segmented aria-label="Sütun" options={["1", "2", "3", "4"]} bind:value={$cols} />
    {/* The array form of `items`:
        - label + value are the pair; hint is a small extra line under the value.
        - value: 0 is shown as 0, value: null shows the `empty` text.
        - hidden: here a function, so the row appears when $secret becomes false.
        - label and value may be functions (the last row), so they are redrawn when $cols changes.
        - columns: 1 to 4 (the component uses fewer on narrow screens). class="lab-kv" is for tests and your CSS. */}
    <KeyValue class="lab-kv" columns={Number($cols)} empty="(boş)" items={[
      { label: "Sürüm", value: "0.2.0", hint: "kararlı" },
      { label: "Lisans", value: "MIT" },
      { label: "Bağımlılık", value: 0 },
      { label: "Not", value: null },
      { label: "Gizli anahtar", value: "abc-123", hidden: () => $secret },
      { label: () => `Sütun: ${$cols}`, value: () => `${$cols} sütun` },
    ]} />
    <Button on:click={() => $secret = !$secret}>Gizli satırı aç / kapa</Button>
    {/* The object form of `items`: the keys become the labels. m:theme="night" is a common prop that renders the card
        and everything inside it in the dark theme, so you can see KeyValue on both backgrounds. */}
    <Card m:theme="night">
      <KeyValue items={{ Çerçeve: "March", Dil: "TSX", Boyut: "küçük" }} />
    </Card>
  </div>
}
