// LayerCake: the creative-minimal ExplodedView example.
//
// What it shows: a button taken apart into its layers (shadow, surface, content), with a springy motion; the small button
// brings it together again.
// When to use this pattern: to show how something is built. Nothing is drawn again: the same element tilts and rises, so what
// comes apart is exactly what was on screen.
// Animation: motion="spring" is the springy style (smooth is the default, none is instant); the movement is CSS transitions, so
// reduced motion makes it instant.
import { ExplodedView, Button, Card } from "march/ui"
import { sparkles } from "march/icons"

// $apart is the apart / together state.
export function LayerCake() {
  let $apart = true
  return <Card m:theme="night">
    {/* open follows $apart. Without `parts` the first element inside (the button) is taken apart into its layers. gap is the
            distance in px between two plates; motion="spring" gives a springy movement; m:color (a common prop) sets the colour
            token. m:theme="night" on the Card draws this subtree in the dark theme. */}
    <ExplodedView open={$apart} motion="spring" gap={34} m:color="brand-pink">
      <Button variant="primary" icon={sparkles}>Sihir</Button>
    </ExplodedView>
    <Button size="sm" on:click={() => $apart = !$apart}>{$apart ? "Birleştir" : "Ayır"}</Button>
  </Card>
}
