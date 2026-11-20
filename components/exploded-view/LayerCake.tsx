import { ExplodedView, Button, Card } from "march/ui"
import { sparkles } from "march/icons"

// katman pastası: bir düğmenin katmanları yaylanarak ayrılır; düğmeye basınca birleşir
export function LayerCake() {
  let $apart = true
  return <Card m:theme="night">
    <ExplodedView open={$apart} motion="spring" gap={34} m:color="brand-pink">
      <Button variant="primary" icon={sparkles}>Sihir</Button>
    </ExplodedView>
    <Button size="sm" on:click={() => $apart = !$apart}>{$apart ? "Birleştir" : "Ayır"}</Button>
  </Card>
}
