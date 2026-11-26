// FollowerCount: the real-life CountRoll example.
//
// What it shows: the follower count of a profile in the short form (12.4K style, in the active locale); the follow
// button changes the number by one and only the digit that changed rolls.
// When to use this pattern: likes, comments and followers: numbers that change by small steps and should feel alive.
// format="compact" is the default; the count is hidden from the eye as rolling digits but screen readers get the
// full number from a visually hidden copy. The roll runs on the motion engine, so reduced motion, the global speed and
// "Stop all" apply.
import { CountRoll, Button } from "march/ui"

export function FollowerCount() {
  let $n = 12480
  let $on = false
  return <div sx={{ flex: ["row", "center"], gap: 3 }}>
    <span><strong><CountRoll value={$n} format="compact" /></strong> takipçi</span>
    {/* Following adds one follower, unfollowing takes it back; the button's look and text follow the state. */}
    <Button size="sm" variant={$on ? "secondary" : "primary"} on:click={() => { $on = !$on; $n += $on ? 1 : -1 }}>{$on ? "Takip ediliyor" : "Takip et"}</Button>
  </div>
}
