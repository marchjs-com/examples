import { NumberInput, IntInput, MoneyInput, PercentInput, Card } from "march/ui"

// NumberInput'un bütün özellikleri: bind:value ve onChange, min / max sınırı (alandan çıkınca), ok tuşu adımı (step),
// ondalık ve en az ondalık, binlik ayırıcı (grouping), ölçek (scale), dil (locale), önek / sonek, ref, yer tutucu,
// otomatik doldurma, klavye (inputmode), en çok uzunluk, zorunlu, geçersiz, devre dışı, salt okunur, id / name / class,
// aria-label, describedby, odak olayları; altta aile: IntInput, MoneyInput, PercentInput
const Row = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  <div sx={{ flex: "col", gap: 2 }}>{props.children}</div>
</div>

export function NumberInputLab() {
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
      <NumberInput bind:value={$qty} min={1} max={10} step={1} decimals={0} suffix="adet" aria-label="Adet" onChange={() => $edits++} />
      <span sx={{ text: "sm" }}>Adet: {$qty} · değişiklik: {$edits}</span>
    </Row>
    <Row title="Ondalık, en az ondalık, binlik ayırıcı, önek, dil (tr-TR)">
      <NumberInput bind:value={$amount} decimals={2} minDecimals={2} grouping prefix="₺" locale="tr-TR" aria-label="Tutar" />
      <span sx={{ text: "sm" }}>Saklanan tutar: {$amount}</span>
    </Row>
    <Row title="Ölçek: binde gösterilir, oran saklanır">
      <NumberInput bind:value={$ratio} scale={1000} decimals={1} suffix="‰" aria-label="Binde oran" />
      <span sx={{ text: "sm" }}>Saklanan oran: {$ratio}</span>
    </Row>
    <Row title="Başka bir dil (de-DE), salt okunur">
      <NumberInput value={1234567.891} locale="de-DE" grouping decimals={2} readonly aria-label="Almanca biçim" />
    </Row>
    <Row title="Form: boş başlar, zorunlu, geçersiz, yer tutucu, ref, odak">
      <NumberInput bind:value={$weight} aria-label="Kilo" id="lab-weight" name="weight" class="lab-weight" required invalid={$weight === null}
        placeholder="Ör. 72,5" suffix="kg" decimals={1} autocomplete="off" inputmode="decimal" maxLength={6}
        describedby="lab-weight-hint" ref={(el: HTMLInputElement) => $tag = el.tagName.toLowerCase()}
        onFocus={() => $focused = true} onBlur={() => $focused = false} />
      <span id="lab-weight-hint" sx={{ text: "sm", color: "muted" }}>Kilo: {$weight ?? "boş"} · ref: {$tag} · {$focused ? "yazıyorsun" : "odak dışında"}</span>
      <NumberInput value={7} disabled aria-label="Kilitli sayı" />
    </Row>
    <Card m:theme="night">
      <Row title="Aile: IntInput, MoneyInput, PercentInput (koyu zemin)">
        <IntInput bind:value={$int} min={0} aria-label="Tam sayı" />
        <MoneyInput bind:value={$price} currency="EUR" aria-label="Avro fiyat" />
        <PercentInput bind:value={$rate} aria-label="KDV oranı" />
        <span sx={{ text: "sm" }}>{$int} · {$price} · {$rate}</span>
      </Row>
    </Card>
  </div>
}
