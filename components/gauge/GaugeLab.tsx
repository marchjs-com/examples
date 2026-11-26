import { Gauge, Button, Card } from "march/ui"
import { audioSource } from "march/audio"

// GaugeLab: every Gauge prop in one place, so you can see what each one changes and copy the line you need.
// Gauge is a dial with a needle (a car's cluster, a watch, a studio VU meter). Use it when one value has a
// "fine / careful / too much" feeling that a glance should catch: speed, load, revs, loudness. For a plain number use
// CountRoll or Odometer; for many values side by side use a chart.
//
// Props shown below: value (a live accessor), source (audio), min, max, zones, redline, peak, peakHold, label, unit,
// caption, format, variant (speedometer, tachometer, half, vu), size, sweep, ticks, needle, readout (true, "odometer",
// a node, a function, false), parts, color, motion, onPeak, onRedline, class, and the dial features the other
// instruments are built on: needles, start, wrap, turn, inlay.
export function GaugeLab() {
  // `$` variables are reactive: every gauge that reads $v moves when a button changes it. There is no setState and no
  // re-render of the whole tree; only the needle and the readout update.
  let $v = 40
  // Filled by the onPeak / onRedline callbacks below, so you can watch the events fire.
  let $peaks = 0
  let $red = false
  // "demo" is a synthesized music loop from march/audio: no file, no permission, muted by default. Nothing is computed
  // until demo.start() runs, and browsers only let audio start from a user gesture (a click). That is why the button
  // below starts it, not the page load.
  const demo = audioSource("demo")
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The controls. The class names (lab-up, lab-down…) are hooks for GaugeLab.test.tsx, not styling. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      <Button class="lab-up" size="sm" on:click={() => { $v = Math.min(100, $v + 25) }}>Artır</Button>
      <Button class="lab-down" size="sm" variant="ghost" on:click={() => { $v = Math.max(0, $v - 30) }}>Azalt</Button>
      <Button class="lab-sound" size="sm" variant="ghost" on:click={() => demo.start()}>🔊 Demo sesi başlat</Button>
    </div>
    {/* The event log: the peak counter grows on each new highest value, and the redline flag is "evet" (yes) while
        the value is past the red line. */}
    <p class="lab-events">{`Yeni tepe: ${$peaks} · Kırmızıda: ${$red ? "evet" : "hayır"}`}</p>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      {/* 1. A fully dressed speedometer (the default variant, a 270° scale).
          - min / max: the scale (default 0–100); the value is clamped to it.
          - label: the accessible name. The gauge is a role="meter" with aria-valuenow and aria-valuetext ("40 km/h").
            The spoken value changes at most 4 times a second, so a moving needle never floods a screen reader.
          - unit + format: the unit under the readout (and in the spoken value); format shapes the number.
          - zones: coloured bands on the arc ({ from, to, color } with theme color tokens). redline={80}: from 80 the
            ticks turn red, and past it the arc and the needle turn red and the face glows. The danger is also told by
            the value and the ticks, never by colour alone.
          - peak: keep a mark at the highest value seen; peakHold={3000} lets that mark fall back after 3 seconds.
          - onPeak runs on each new highest value; onRedline(true / false) runs when the value enters / leaves the red
            zone. Use them to log, warn or act (RallyCar.tsx shifts gear with it).
          - color: the theme color token of the needle and the value arc. needle="spring" (the default) moves the
            needle on spring physics on the motion engine. */}
      <span class="lab-speed"><Gauge value={$v} min={0} max={100} label="Hız" unit="km/h" format={(n: number) => `${Math.round(n)}`}
        zones={[{ from: 0, to: 50, color: "success" }, { from: 50, to: 80, color: "warning" }]} redline={80}
        peak peakHold={3000} onPeak={() => $peaks++} onRedline={(on: boolean) => { $red = on }} color="brand-purple" needle="spring" /></span>
      {/* 2. variant="tachometer": a 0–8000 scale with ×1000 labels (8 means 8000) and a red line at 81 % of the scale
          by default. readout="odometer" shows the number on rolling drums instead of a rolling number. caption is the
          small text printed on the dial (default "×1000 r/min"; here a Turkish one). */}
      <span class="lab-tach"><Gauge variant="tachometer" value={$v * 80} readout="odometer" caption="×1000 dev/dk" /></span>
      {/* 3. variant="half": a 180° dial that fits a row of cards.
          - peak={90}: a number marks a fixed target value instead of tracking the highest one.
          - size (width in px) and sweep (the scale's angle, 90–320°) reshape the dial; sweep={200} opens it a little
            past a half circle.
          - ticks: the step between major ticks, minor ticks per step, and labels as a function (here "20%").
          - needle="vu": classic VU ballistics (about 300 ms to settle) instead of a spring. */}
      <span class="lab-half"><Gauge variant="half" value={$v} peak={90} size={200} sweep={200} ticks={{ step: 20, minor: 1, labels: (n: number) => `${n}%` }} needle="vu" /></span>
      {/* 4. variant="vu" with an audio source and no value: the needle shows the loudness in dB (−20…+3, red from 0 dB)
          on a warm face. It reads only while the gauge is on screen and rests until the demo starts. Pass
          audioSource("mic") instead to meter a microphone (it asks for permission on start()). */}
      <span class="lab-vu"><Gauge variant="vu" source={demo} label="Demo sesi" /></span>
      {/* 5. Make it yours.
          - readout as a function: return any node for the value (here a bold "40 puan", 40 points).
          - needle="none": no needle; the arc alone shows the value.
          - motion={false}: no animation, everything stands on the value at once. Users who ask their OS for reduced
            motion get the same automatically; set it yourself for a screen that must stay still.
          - parts: switch each drawn part on or off (face, track, arc, zones, ticks, labels, caption, needle, hub, peak,
            readout, glass).
          - class: an extra class on the root for your own CSS. */}
      <span class="lab-own"><Gauge value={$v} readout={(n: number) => <b>{`${Math.round(n)} puan`}</b>} needle="none" motion={false} class="lab-mine"
        parts={{ ticks: false, labels: false, hub: true, glass: false, face: true, arc: true, peak: false }} /></span>
      {/* 6. The barest gauge: no readout, face, caption or ticks; a small arc and needle for a table row or beside a
          label. The accessible value is still there, because it lives on the root, not in the readout. */}
      <span class="lab-bare"><Gauge value={$v} readout={false} size={140} parts={{ face: false, caption: false }} ticks={false} /></span>
    </div>
    <div sx={{ flex: ["row", "wrap", "center"], gap: 3 }}>
      {/* 7. Several needles: `needles` adds needles next to `value`, each with its own value, colour, label, length,
          width, tip, tail and motion (`move`). Each one springs to its own value on the motion engine, and every
          needle is in the spoken value ("40 %, Ortalama 32 %"). Here: the current value and a slower average. */}
      <span class="lab-multi"><Gauge value={$v} unit="%" label="Yük"
        needles={[{ value: $v * 0.8, label: "Ortalama", color: "info", length: 0.7, width: 2 }]} /></span>
      {/* 8. A full circle: sweep={360} with start={0} puts `min` at 12 o'clock, and `wrap` (on by default for a full
          circle) lets values go round instead of stopping at the end (75 on a 0–60 dial is one turn and 15).
          turn={-$v} turns the whole scale under the needles, as a compass rose does; inlay draws your own node on
          the face, under the scale. AnalogClock, Compass and Altimeter are built from exactly these props. */}
      <span class="lab-circle"><Gauge min={0} max={60} sweep={360} start={0} turn={-$v} readout={false}
        needles={[{ value: $v, color: "danger" }]} ticks={{ step: 5, minor: 4 }} inlay={<b>360°</b>} /></span>
    </div>
    {/* m:theme="night" switches the theme for this subtree only. The gauge re-reads its theme colors, so this is the
        place to check your zones and colors on a dark background. */}
    <Card m:theme="night">
      <Gauge value={$v} label="Koyu zeminde" unit="%" />
    </Card>
  </div>
}
