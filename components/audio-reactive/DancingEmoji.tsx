import { AudioReactive } from "march/ui"
import { audioSource } from "march/audio"
import { onCleanup } from "march"

// DancingEmoji: a dance floor. A beat (two beats a second) makes the emojis jump on the bass and grow with the sound.
// The beat is a number source, so there is no permission, no sound, and it starts at once.
// Use this pattern to animate UI from any rhythm or metric without touching Web Audio.
export function DancingEmoji() {
  // The beat: a number accessor that jumps to 1 at the start of every 500 ms and fades (never below 0.1, so the
  // dancers never stand fully still). march/audio reads it on the motion clock, only while a wrapper using it is on
  // screen.
  const beat = audioSource(() => { const t = (performance.now() % 500) / 500; return Math.max(0.1, 1 - t * 1.6) })
  // Stop the source when the component goes away.
  onCleanup(() => beat.stop())
  return <div sx={{ flex: ["row", "wrap", "center"], gap: 4 }}>
    {/* One source can drive many wrappers. Each wrapper:
        - as="span": inline, so it can sit in text; sx text "2xl" makes the emoji large.
        - effect: "bounce" jumps on the bass, "pulse" scales, "glow" adds a soft light; a list combines them.
        - gain multiplies the readings; intensity (0–2) strengthens the effects; color tints the glow.
        - role="img" + aria-label: an emoji alone is read by its Unicode name, so each gets a clear name. The motion
          itself is decoration.
        Reduced motion: pulse and bounce stop changing size and place, the glow still follows the beat. */}
    <AudioReactive source={beat} as="span" effect={["bounce", "pulse"]} gain={1.2} sx={{ text: "2xl" }} role="img" aria-label="Dans eden kişi">🕺</AudioReactive>
    <AudioReactive source={beat} as="span" effect="bounce" gain={1.2} intensity={1.6} sx={{ text: "2xl" }} role="img" aria-label="Dans eden kadın">💃</AudioReactive>
    <AudioReactive source={beat} as="span" effect={["pulse", "glow"]} gain={1.5} color="brand-gold" sx={{ text: "2xl" }} role="img" aria-label="Disko topu">🪩</AudioReactive>
  </div>
}
