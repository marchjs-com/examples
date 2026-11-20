import { StoryProgress, Card } from "march/ui"

// beş saniyelik geri sayım: beş parça, biri bitince sıradaki başlar
export function Countdown() {
  let $i = 0
  return <Card m:theme="night">
    <StoryProgress count={5} index={$i} duration={1000} color="brand-orange" onDone={() => { if ($i < 4) $i++ }} />
    <span sx={{ text: ["2xl", "bold"] }}>{5 - $i}</span>
  </Card>
}
