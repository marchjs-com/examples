// PizzaOven: the creative-minimal Progress example.
//
//  What it shows: a pizza that bakes while you watch. The "put in the oven" button starts a timer that raises the value
// every 400 ms,
// the bar changes tone with the bake state and the label says how the pizza is doing. When to use this pattern: a
// bar that follows a value you update yourself, with a tone and a label that depend on that value.
//
// Animation: the fill follows the value on the motion engine, so reduced motion, global speed and "Stop all" apply;
// `smooth={false}` makes the bar follow the value at once.
// Accessibility: the bar is a progressbar with aria-valuenow; the label is its accessible name.

import { Progress, Button, Card } from "march/ui"

export function PizzaOven() {
  // How baked the pizza is, 0 to 120 (100 is perfect, more means burnt).
  let $baked = 0
  // Id of the running interval, so a new bake can stop the old one.
  let $timer = 0
  // Restart the bake: stop any running timer, reset to 0, then add 10 every 400 ms until 120.
  const bake = () => {
    clearInterval($timer)
    $baked = 0
    $timer = setInterval(() => { $baked = Math.min(120, $baked + 10); if ($baked >= 120) clearInterval($timer) }, 400) as unknown as number
  }
  // The tone as a function of the value: info while raw, success while it is baked, danger when burnt.
  const tone = () => ($baked < 60 ? "info" : $baked <= 100 ? "success" : "danger") as "info"
  // The label text as a function of the value; Progress calls it again whenever the value changes.
  const say = () => ($baked === 0 ? "Hamur bekliyor" : $baked < 100 ? "Pişiyor…" : $baked === 100 ? "Tam kıvamında! 🍕" : "Yandı! 🔥")
  // Progress props used here:
  // - value: an accessor (a function), so the bar follows $baked; max: the full value (100, so 120 overflows the bar).
  // - tone and label: functions too, so the colour and the text change with the value.
  // - showValue: the rounded percentage next to the label; size="lg": a thicker track.
  return <Card title="Pizza fırını">
    <Progress value={() => $baked} max={100} tone={tone} label={say} showValue size="lg" />
    <Button size="sm" on:click={bake}>Fırına at</Button>
  </Card>
}
