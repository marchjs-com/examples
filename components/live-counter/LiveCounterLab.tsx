// LiveCounterLab: the full-featured LiveCounter example; it uses every prop at least once.
//
// Props shown here: value (a live value) or from / rate / pause / random (simulated growth), label, prefix and suffix,
// format, effect and effectOptions (your own digit animation), dot and dotColor, bubble and bubbleColor, beat and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// LiveCounterLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
//
// Animation: the counter's own motion (digit change, beat, bubble, pulsing dot) runs on the motion engine, and the
// simulation runs on the motion clock and only while on screen. Reduced motion turns the digit animation, bubble and
// beat off. `effect` below shows how to replace the digit animation with your own.
import { LiveCounter } from "march/landing"
import { animate } from "march/motion"
import { Toggle, Button, Card } from "march/ui"

// Your own digit animation for `effect`: a function that receives the element and the effectOptions and returns an
// object with stop(). This one fades the digits in from below with the motion engine's animate(); `duration` comes from
// effectOptions (400 ms when not given).
const flash = (el: HTMLElement, o?: { duration?: number }) => {
  const p = animate(el, { opacity: [0.2, 1], transform: ["translateY(6px)", "translateY(0)"] }, { duration: o?.duration ?? 400 })
  return { stop: () => p.cancel() }
}

export function LiveCounterLab() {
  // Signals: $n is the live value; $sim, $dot and $bubble are the switches; `seed` is plain state for the random
  // generator below.
  let $n = 120
  let $sim = false
  let $dot = true
  let $bubble = true
  let seed = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls: three switches and a button that raises the live value. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Toggle label="Taklit büyüme" bind:value={$sim} />
        <Toggle label="Canlı nokta" bind:value={$dot} />
        <Toggle label="Balon" bind:value={$bubble} />
        <Button on:click={() => $n += 5}>+5 kişi</Button>
      </div>
    </Card>
    {/* The counter sits in a live region that reads the three switches, so it is built again when one changes. The
        props, one by one:
        - value: the live value, a function of $n. When simulation is on we pass undefined, so the counter uses from /
          rate instead. from: where the simulation starts; rate: average increase per minute; pause: a [min, max] pause
          in ms between steps; random: the step source (here a small deterministic generator, so tests repeat).
        - label: what is counted. prefix and suffix: written around the number. format: Intl.NumberFormat options.
        - effect + effectOptions: our own digit animation (see flash above) and its options.
        - dot: your own mark for the live dot, or false for none. dotColor: colour token of the dot.
        - bubble: a function that returns your own "+N" content, or false for none. bubbleColor: colour of the bubble.
        - beat: the number beats once on an increase. class: for tests and your CSS. */}
    {() => { const sim = $sim, dot = $dot, bubble = $bubble; return <LiveCounter class="lab-lc"
      value={sim ? undefined : () => $n} from={500} rate={120} pause={[600, 1400]} random={() => ((seed = (seed * 9301 + 49297) % 233280) / 233280)}
      label="kişi sırada" prefix="👥 " suffix=" kişi" format={{ maximumFractionDigits: 0 }}
      effect={flash as never} effectOptions={{ duration: 300 }}
      dot={dot ? <span class="lab-dot">🔴</span> as Node : false} dotColor="danger"
      bubble={bubble ? (d: number) => <b class="lab-bubble">+{d}</b> : false} bubbleColor="brand-purple" beat /> }}
  </div>
}
