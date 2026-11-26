// PaperPlane.tsx: the creative-minimal AttitudeIndicator example.
// Fly a paper plane with two sliders: one tilts the nose up and down (pitch), the other banks the wings (roll). The
// artificial horizon follows like a gyro: sky and ground tilt with the bank and slide with the pitch.
// Use this pattern to show any two angles of a thing in space (a phone's tilt, a robot arm, a camera gimbal) in the
// one picture everyone understands: the horizon.
import { AttitudeIndicator, Slider, Card } from "march/ui"

export function PaperPlane() {
  // Two angles in degrees, bound to the sliders below.
  let $pitch = 5
  let $roll = -15
  return <Card title="✈️ Kâğıt uçak">
    {/* pitch: positive is nose up; roll: positive is the right wing down. The horizon moves on a spring on the motion
        engine, like a real gyro settling; with reduced motion it jumps to the new attitude. The instrument is a
        role="img" named "Kâğıt uçak: pitch 5° up, bank 15° left", updated at most 4 times a second. */}
    <AttitudeIndicator pitch={$pitch} roll={$roll} label="Kâğıt uçak" size={240} />
    {/* The Sliders are keyboard controls (arrows, Home, End); format writes the value with its unit. */}
    <Slider aria-label="Yunuslama" min={-30} max={30} step={1} bind:value={$pitch} format={(v: number) => `${v}°`} />
    <Slider aria-label="Yatış" min={-60} max={60} step={1} bind:value={$roll} format={(v: number) => `${v}°`} />
  </Card>
}
