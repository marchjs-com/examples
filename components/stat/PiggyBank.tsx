import { Stat } from "march/charts"
import { Button } from "march/ui"
import { wallet } from "march/icons"

// A piggy bank: a playful, minimal Stat.
// Every "₺50 at" click drops 50 lira into the bank. The big number counts up to the new total, the change is measured
// against the first week, and the trend line under the value grows by one point per click.
// Use a Stat like this for a single headline number that changes over time and whose direction matters at a glance:
// savings, followers, streak days.

export function PiggyBank() {
  // `$history` is a signal: one saved total per week. The last entry is "now", the first is the baseline.
  // Replacing the array (not pushing into it) is what tells March the value changed.
  let $history = [120, 160, 210, 230]
  const now = () => $history[$history.length - 1]
  // Stat props:
  // - icon / label: a wallet icon next to the "Kumbaram" (my piggy bank) label.
  // - value: the current total; previous: the first week. With no `delta` prop, Stat computes the change itself as
  //   (value − previous) / |previous| and shows it with an arrow: green and up, because more savings is good.
  // - format={["money", "TRY"]}: a pipe with an argument, so the value reads as Turkish lira with its symbol.
  // - spark: the whole history as a trend line under the value; it morphs as new points arrive.
  // - hint: the text after the change, saying what it is compared against (here: vs the first week).
  // Motion: no `animate` prop, so the default spring applies: the number counts from the old total to the new one
  // (formatted every frame) and the sparkline morphs. animate={false} shows changes at once, animate="out" glides
  // without overshoot, and reduced motion makes it jump automatically.
  // Accessibility: screen readers hear "Up" before the change, so the direction is never told by color alone.
  // To adapt: put your own number list in $history; for a cost, add `invert` so a rise turns red.
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* A new array with one more total: the value, the change and the sparkline all follow from it. */}
    <Button on:click={() => { $history = [...$history, now() + 50] }}>🐷 ₺50 at</Button>
    <Stat icon={wallet} label="Kumbaram" value={now()} previous={$history[0]} format={["money", "TRY"]} spark={$history} hint="ilk haftaya göre" />
  </div>
}
