import { CheckboxGroup, RadioGroup, Checkbox, Card, Segmented } from "march/ui"

// seçim kontrollerinin bütün görünümleri: CheckboxGroup variant (classic, soft, chip, card, toggle), RadioGroup
// (segmented dahil), size, shape, colors="brand", m:color, inline, disabled seçenek; tek Checkbox indeterminate ve disabled
const DAYS = [{ value: "mon", label: "Pzt" }, { value: "tue", label: "Sal" }, { value: "wed", label: "Çar", disabled: true }, { value: "thu", label: "Per" }]
const VARIANTS = ["classic", "soft", "chip", "card", "toggle"] as const

const Case = (props: { name: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.name}</span>
  {props.children}
</div>

export function ChoiceVariantsLab() {
  let $size = "md"
  let $days = ["mon"]
  let $one = "tue"
  let $partial = true
  return <div sx={{ flex: "col", gap: 3 }}>
    <Segmented class="lab-size" bind:value={$size} aria-label="Boyut" options={["sm", "md", "lg"]} />
    {VARIANTS.map((v) => <Case name={v}>
      <CheckboxGroup class={`lab-${v}`} bind:value={$days} options={DAYS} variant={v} size={$size as "md"} inline aria-label={`Günler ${v}`} />
    </Case>)}
    <Case name="radio: segmented, kare köşe, mor">
      <RadioGroup class="lab-radio" bind:value={$one} options={DAYS} variant="segmented" shape="square" m:color="brand-purple" size={$size as "md"} inline aria-label="Tek gün" />
    </Case>
    <Case name="HADİ renkleri, yuvarlak">
      <CheckboxGroup bind:value={$days} options={DAYS} variant="chip" colors="brand" shape="circle" inline aria-label="Günler renkli" />
    </Case>
    <Card m:theme="night">
      <Case name="tek kutu: kısmi ve kapalı">
        <Checkbox class="lab-partial" bind:value={$partial} indeterminate label="Bazı alt öğeler seçili" />
        <Checkbox value={false} disabled label="Devre dışı" />
      </Case>
    </Card>
    <span class="lab-state" sx={{ text: "sm", color: "muted" }}>Günler: {$days.join(", ") || "yok"} · tek: {$one}</span>
  </div>
}
