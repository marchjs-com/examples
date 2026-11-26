// SleepyBot: the creative-minimal LedEyes example.
//
// A pair of eyes that get sleepy when you leave them alone and wake up when you come back: hovering the card makes
// them look surprised, leaving it makes them sleepy. One prop (expression) does all of it; the eyes glide between
// expressions on their own.
import { LedEyes, Card } from "march/ui"

export function SleepyBot() {
  // A live expression: the component follows it. Changing it starts a spring from wherever the eyes are now, so a
  // quick in-and-out never jumps.
  let $mood: "sleepy" | "surprised" = "sleepy"
  // onPointerEnter / onPointerLeave are plain pointer events on the card's wrapper.
  return <div sx={{ w: "sm" }} onPointerEnter={() => { $mood = "surprised" }} onPointerLeave={() => { $mood = "sleepy" }}>
    <Card title="Üstüme gel">
      {/* alive={false}: no random blinks or glances, only the expression we set. The accessible name follows the
          expression ("Sleepy eyes" / "Surprised eyes") unless you give a label. */}
      <LedEyes expression={() => $mood} alive={false} cols={24} rows={10} color="amber" shape="tube" />
    </Card>
  </div>
}
