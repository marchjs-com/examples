import { KeyValue, Card, Segmented, Button } from "march/ui"

// KeyValue'nun bütün özellikleri bir arada: items (dizi: label, value, hint, hidden — ya da nesne), columns (1–4),
// empty ve class; sütun sayısı ve gizli satır canlı değişir
export function KeyValueLab() {
  let $cols = "2"
  let $secret = true
  return <div sx={{ flex: "col", gap: 3 }}>
    <Segmented aria-label="Sütun" options={["1", "2", "3", "4"]} bind:value={$cols} />
    <KeyValue class="lab-kv" columns={Number($cols)} empty="(boş)" items={[
      { label: "Sürüm", value: "0.2.0", hint: "kararlı" },
      { label: "Lisans", value: "MIT" },
      { label: "Bağımlılık", value: 0 },
      { label: "Not", value: null },
      { label: "Gizli anahtar", value: "abc-123", hidden: () => $secret },
      { label: () => `Sütun: ${$cols}`, value: () => `${$cols} sütun` },
    ]} />
    <Button on:click={() => $secret = !$secret}>Gizli satırı aç / kapa</Button>
    <Card m:theme="night">
      <KeyValue items={{ Çerçeve: "March", Dil: "TSX", Boyut: "küçük" }} />
    </Card>
  </div>
}
