import { ButtonGroup, Button } from "march/ui"

// yazı boyu ayarı: bitişik üç düğme tek şerit gibi durur; basılan düğme basılı kalır, örnek cümle büyüyüp küçülür
const sizes = [["A−", "sm"], ["A", "md"], ["A+", "xl"]] as const

export function FontSizer() {
  let $size: "sm" | "md" | "xl" = "md"
  return <div sx={{ flex: "col", gap: 3 }}>
    <ButtonGroup attached label="Yazı boyu">
      {sizes.map(([name, size]) => <Button variant="secondary" pressed={$size === size} on:click={() => $size = size}>{name}</Button>)}
    </ButtonGroup>
    <p sx={{ text: $size }}>March'ta bileşen bir kez çalışır; değişen yalnız bu yazının boyudur.</p>
  </div>
}
