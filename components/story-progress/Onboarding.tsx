import { StoryProgress, Button } from "march/ui"

// tanıtım ekranları: üç adım; basılı tutunca duraklar, İleri atlar
const steps = ["Hoş geldin!", "Arkadaşlarını bul", "İlk hikâyeni paylaş"]

export function Onboarding() {
  let $i = 0
  let $hold = false
  return <div sx={{ flex: "col", gap: 2 }}>
    <StoryProgress count={steps.length} index={$i} run={$i} duration={4000} paused={$hold} onDone={() => $i = ($i + 1) % steps.length} />
    <h3 sx={{ text: ["lg", "bold"] }}>{steps[$i]}</h3>
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" on:click={() => $hold = !$hold}>{$hold ? "Sürdür" : "Duraklat"}</Button>
      <Button size="sm" variant="primary" on:click={() => $i = ($i + 1) % steps.length}>İleri</Button>
    </div>
  </div>
}
