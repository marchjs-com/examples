// MoodMeter: the creative-minimal ReactionPicker example.
//
// What it shows: the weather of the day. The picker offers your own emoji (sun to snow) and the picked one is written
// big next to it. When to use this pattern: a quick one-tap choice among a few symbols, not a long emoji list.
//
// Keyboard and accessibility: a toolbar with aria-pressed buttons and one tab stop; `label` names the toolbar.
// Animation: the pop-in runs on the motion engine (reduced motion and global speed apply); `pop={false}` removes it.

import { ReactionPicker, Card } from "march/ui"

export function MoodMeter() {
  // The picked emoji; empty until the visitor picks one.
  let $mood = ""
  {/* The card is dark (m:theme="night" works on every component). */}
  return <Card m:theme="night">
    {/* emojis: your own list instead of the default quick reactions; selected: the one shown as pressed; onPick(emoji):
        the pick; m:color: the colour token of the picked emoji's circle; label: the toolbar's accessible name. */}
    <ReactionPicker emojis={["☀️", "⛅", "🌧️", "⛈️", "❄️"]} selected={$mood} onPick={(e: string) => $mood = e} m:color="brand-orange" label="Hava" />
    <span sx={{ text: "2xl" }}>{$mood || "?"}</span>
  </Card>
}
