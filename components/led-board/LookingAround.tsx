// LookingAround: the creative-minimal LedBoard example.
//
// One face on a small LED board: the eyes look left, then right, then up, blink and smile. Nothing else. It shows the
// smallest useful scene list: each scene is one object, and the board plays them one after another in a loop.
// Use this when you want a friendly "mascot" on an empty state, a loading screen or a kiosk.
import { LedBoard } from "march/ui"

// The scenes, in order. `eye` picks an expression; `duration` is how long a scene stays (ms). Eye scenes keep the
// eyes "alive" by default: they also blink on their own and glance a little between the scripted moves.
const scenes = [
  { eye: "open", duration: 1400 },
  { eye: "look-left", duration: 1200 },
  { eye: "look-right", duration: 1200 },
  { eye: "look-up", duration: 1000 },
  { eye: "blink", duration: 800 },
  // a mouth needs at least 10 rows, so this board has 16
  { eye: "happy", mouth: "smile", duration: 1800 },
] as const

export function LookingAround() {
  // cols × rows is the size of the board in LEDs; the board fills the width of its parent and keeps square LEDs.
  // transition="cut": the face changes in place (a wipe between two faces would look like a new face arriving).
  // The gaze glides between expressions on a spring; reduced motion shows each expression at once.
  return <div sx={{ w: "sm" }}>
    <LedBoard scenes={scenes} cols={32} rows={16} transition="cut" color="blue" label="Etrafa bakan gözler" />
  </div>
}
