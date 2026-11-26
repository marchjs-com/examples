// BounceBall: the creative-minimal EasingCurveEditor example.
//
// What it shows: a bouncing ball. Drag the two handles; the ball then jumps with that curve. The editor registers the
// curve in the motion engine under the name "zipla" (with `name`), so animate(...) can use the name as its easing.
// When to use this pattern: to design a motion by hand and use it elsewhere by name, without copying numbers around.
// Animation: animate() from march/motion runs on the motion engine, so reduced motion, the global speed and "Stop all"
// apply to the jump as well.
import { EasingCurveEditor, Button, Card } from "march/ui"
import { animate } from "march/motion"

// $curve is the CSS value of the curve; the initial one overshoots (a y above 1), which makes the ball spring.
export function BounceBall() {
  let $curve = "cubic-bezier(.34, 1.56, .64, 1)"
  // The ball is a real element (cast to HTMLElement) because animate() needs it.
  const ball = <div sx={{ display: "inline-block", p: 4, radius: 4, shadow: 2, text: "2xl" }}>🏀</div> as HTMLElement
  // Three keyframes up and down; the easing is the name registered by the editor, so changing the curve changes the
  // jump on the next press (the easing option of animate() accepts a registered name as well as a cubic-bezier()).
  const jump = () => animate(ball, [{ transform: "translateY(0)" }, { transform: "translateY(-4rem)" }, { transform: "translateY(0)" }], { duration: 800, easing: "zipla" })
  return <Card title="Zıplayan top">
    <div sx={{ flex: ["row", "wrap"], gap: 4 }}>
      {/* name="zipla" registers the curve under that name (it is what `easing` above refers to); compact is the small
                layout; preview="none" leaves out the preview because the ball is the preview; handleColors are colour tokens. */}
      <EasingCurveEditor bind:value={$curve} name="zipla" compact preview="none" handleColors={["brand-orange", "brand-gold"]} />
      <div sx={{ flex: "col", gap: 3 }}>
        {ball}
        <Button on:click={jump}>Zıplat</Button>
        <code sx={{ text: "xs" }}>{() => $curve}</code>
      </div>
    </div>
  </Card>
}
