// StarField: the creative-minimal Parallax example.
//
// A field of stars: three layers of stars that slide against each other by depth when you move the pointer over them. A button
// cycles the strength of the mouse tracking, from off to strong. Use this pattern to build depth out of nothing but text
// characters, with no images.
import { Parallax } from "march/landing"
import { Button } from "march/ui"

// A row of star characters used as layer content. aria-hidden: pure decoration, so screen readers skip it.
const Stars = (p: { list: string }) => <div style={{ "font-size": "1.6rem", "letter-spacing": "3rem", "line-height": "4rem", padding: "2rem" }} aria-hidden="true">{p.list}</div>

export function StarField() {
  // The mouse strength: 0 (off) to 3; the button adds one and wraps to 0.
  let $power = 1
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button variant="secondary" on:click={() => $power = $power >= 3 ? 0 : $power + 1}>Fare gücü: {$power}</Button>
    {() => {
      // The signal is read here, so the scene is drawn again with the new strength when the button is pressed.
      const power = $power
      // - height: the minimum height. pointer: the mouse strength (0 = off). m:theme="night": the dark theme tokens.
      // - layers: the first is the farthest. speed: 0 stays with the section, positive is slower than the page (far),
      //   negative is faster (near). depth: how strongly the layer follows the pointer (the third layer is pushed
      //   further with 90). Scrolling and pointer movement are smoothed on the motion engine; under reduced motion all
      //   layers stay still, and "Stop all" and the global speed apply.
      // - the child: the heading in front of the layers.
      return <Parallax height="16rem" pointer={power} m:theme="night" layers={[
        { content: <Stars list="· · · · · · · · · · · ·" />, speed: 0.5 },
        { content: <Stars list="✦ ✧ ✦ ✧ ✦ ✧" />, speed: 0.25 },
        { content: <Stars list="🌙 ⭐ 🪐" />, speed: -0.15, depth: 90 },
      ]}>
        <h3 sx={{ text: "xl" }}>Gece gökyüzü</h3>
      </Parallax>
    }}
  </div>
}
