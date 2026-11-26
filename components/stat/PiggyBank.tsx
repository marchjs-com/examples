// PiggyBank: the creative-minimal Stat example.
//
// What it shows: a piggy bank. Every press on "₺50 at" adds 50 to the savings; the KPI box shows the new amount, the
// change against the first week and a trend line that gets one point longer with each deposit.
// When to use this pattern: one number that has a history. Give `Stat` the list of past values as `spark` and the
// first one as `previous`, and it draws the change and the trend line by itself.
//
// Animation: Stat has no motion of its own to turn off here. The only change is the new value being drawn.
// Accessibility: the arrow is decoration; screen readers hear "Up", "Down" or "No change" before the change, so the
// direction is never told by colour alone. The sparkline is an image named by the label with a summary of its values.
import { Stat } from "march/charts"
import { Button } from "march/ui"
import { wallet } from "march/icons"

export function PiggyBank() {
  // The savings after each week. Reassigning the whole array (not pushing into it) is what makes the view update.
  let $history = [120, 160, 210, 230]
  // The current savings: the last item of the history.
  const now = () => $history[$history.length - 1]
  return <div sx={{ flex: "col", gap: 2 }}>
    {/* Appends a new point: the old amount plus 50. `on:click` is the event handler of a Button. */}
    <Button on:click={() => { $history = [...$history, now() + 50] }}>🐷 ₺50 at</Button>
    {/* label: the text over the value. value: the current amount, formatted by `format`. ["money", "TRY"] is a pipe
        name with its argument (Turkish lira). previous: the value to compare with; Stat computes the change as
        (value - previous) / |previous| and shows it with an arrow and a sign, green for an increase. spark: the
        data of the trend line under the value. hint: the text after the change. icon: a March icon beside the label. */}
    <Stat icon={wallet} label="Kumbaram" value={now()} previous={$history[0]} format={["money", "TRY"]} spark={$history} hint="ilk haftaya göre" />
  </div>
}
