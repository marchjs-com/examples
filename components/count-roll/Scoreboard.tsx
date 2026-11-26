// Scoreboard: the creative-minimal CountRoll example.
//
// What it shows: a scoreboard with two teams; every goal rolls only the digit that changed (9 to 10 moves the tens and the
// ones, 19 to 20 likewise, a plain +1 moves one digit).
// When to use this pattern: scores, counters and tickers. CountRoll needs only `value`; give it a number that you
// change and it animates the difference (upward when the number grows, downward when it shrinks).
// The card is drawn in the dark theme with m:theme="night" (a common prop that works on every component). The roll
// runs on the motion engine, so reduced motion, the global speed and "Stop all" apply without code here.
import { CountRoll, Button, Card } from "march/ui"

export function Scoreboard() {
  let $home = 9
  let $away = 19
  return <Card m:theme="night">
    <div sx={{ flex: ["row", "center"], gap: 4, text: ["2xl", "bold"] }}>
      <CountRoll value={$home} /> <span>:</span> <CountRoll value={$away} />
    </div>
    <div sx={{ flex: "row", gap: 2 }}>
      <Button size="sm" on:click={() => $home++}>Ev sahibi gol</Button>
      <Button size="sm" on:click={() => $away++}>Konuk gol</Button>
    </div>
  </Card>
}
