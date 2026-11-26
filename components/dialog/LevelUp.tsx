// LevelUp: the creative-minimal Dialog example.
//
// What it shows: a level-up celebration. Finishing a task raises the level and opens a small dialog that rises from
// below; "Devam" closes it.
// When to use this pattern: short, modal messages that need one acknowledgement.
// Animation: motion="rise" is the dialog's own entrance (scale, fade, rise or none); it runs on the motion engine, so
// reduced motion, the global speed and "Stop all" apply.
// Accessibility: focus moves into the dialog, Tab stays inside, Escape closes it, focus returns to the button.
import { Dialog, Button, Card } from "march/ui"

// $open shows the dialog; $level is the level, raised right before it opens.
export function LevelUp() {
  let $open = false
  let $level = 1
  return <Card m:theme="night">
    <Button variant="primary" on:click={() => { $level++; $open = true }}>Görevi bitir</Button>
    <span sx={{ text: "sm", color: "muted" }}> Seviye {$level}</span>
    {/* open follows $open and onClose (Escape, scrim, close button) sets it to false. The title is a template string, so it
            carries the new level; size="sm" makes a small panel; the footer holds the button that closes it. m:theme="night" on
            the Card draws this subtree in the dark theme. */}
    <Dialog open={$open} onClose={() => $open = false} title={`🎉 Seviye ${$level}!`} size="sm" motion="rise"
      footer={<Button variant="primary" on:click={() => $open = false}>Devam</Button>}>
      <p>Yeni bir rozet kazandın.</p>
    </Dialog>
  </Card>
}
