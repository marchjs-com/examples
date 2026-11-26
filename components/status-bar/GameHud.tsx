// GameHud: the creative-minimal StatusBar example.
//
// What it shows: a game's heads-up display built from a StatusBar: lives and score at the start, an energy indicator
// at the end. Pressing the lives item loses a life (the dot turns red on the last one); pressing the score adds points.
// When to use this pattern: a thin row of live values that can also be buttons, not only in editors. Items given
// `text` and `tone` as functions follow the state without any extra code.
//
// Animation: the "busy" tone is a breathing dot on March's motion engine, so the global speed, "Stop all" and the
// visitor's reduced-motion preference apply; `pulse={false}` on the StatusBar holds it still.
// Accessibility: the bar is a named region; items with `onSelect` are real buttons with the `title` as tooltip, and
// the tone is backed by the text, never colour alone.
import { StatusBar, Card } from "march/ui"
import { heart, star, zap } from "march/icons"

export function GameHud() {
  // Reactive state: the score and the remaining lives.
  let $score = 120
  let $lives = 3
  // m:theme="night" draws the card, and the bar in it, in the dark theme, as a game screen would be.
  return <Card m:theme="night">
    {/* label names the region for screen readers. Each item: `icon` and `text` (a function keeps it live), `tone`
        colours the dot (here it becomes "danger" on the last life), `onSelect` turns the item into a button and
        `title` is its tooltip. `side: "end"` moves an item to the far side; tone "busy" breathes. */}
    <StatusBar label="Oyun durumu" items={[
      { id: "lives", icon: heart, text: () => `${$lives}`, tone: () => ($lives > 1 ? "success" : "danger"), onSelect: () => $lives = Math.max(0, $lives - 1), title: "Can kaybet" },
      { id: "score", icon: star, text: () => `${$score} puan`, onSelect: () => $score += 10, title: "Puan kazan" },
      { id: "energy", side: "end", icon: zap, text: "Enerji dolu", tone: "busy" },
    ]} />
  </Card>
}
