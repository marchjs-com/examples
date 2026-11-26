// StopwatchLab.tsx: the full-featured Stopwatch example.
// Every Stopwatch prop in one place, so you can see what each one changes and copy the line you need.
// Stopwatch is a chronograph: a sweeping seconds hand on a 60-second dial, a 30-minute sub-dial, a digital readout,
// Start / Stop, Lap and Reset buttons and a lap list. The dial and the sub-dial are Gauges, the buttons Buttons.
//
// Props shown below: running (controlled from outside), decimals, subDial, texts, label, size, color, parts, motion,
// onStart, onStop, onLap, onReset, class.
import { Stopwatch, Button, Toggle, Card } from "march/ui"

export function StopwatchLab() {
  // A value that runs or stops the second stopwatch from outside (its own buttons still work too).
  let $on = false
  // An event log, filled by the callbacks below, so you can watch each one fire.
  let $log = [] as string[]
  const log = (s: string) => { $log = [...$log.slice(-4), s] }
  return <div sx={{ flex: "col", gap: 3 }}>
    <p class="lab-log">{$log.length ? $log.join(" · ") : "Olay yok"}</p>
    <div sx={{ flex: ["row", "wrap"], gap: 4 }}>
      {/* 1. Fully dressed. Every event: onStart(elapsed), onStop(elapsed), onLap({ lap, total }, laps), onReset().
          texts: each button text and the lap name. label: the accessible name of the group (role="group"); a
          role="timer" text holds the time to the second for screen readers. color: the theme token of the hands. */}
      <span class="lab-full"><Stopwatch label="Laboratuvar kronometresi" color="brand-blue" decimals={2}
        texts={{ start: "Başlat", stop: "Durdur", resume: "Sürdür", lap: "Tur", reset: "Sıfırla", lapName: (n: number) => `Tur ${n}` }}
        onStart={() => log("başladı")} onStop={(ms: number) => log(`durdu ${(ms / 1000).toFixed(1)} s`)}
        onLap={(l) => log(`tur ${(l.lap / 1000).toFixed(1)} s`)} onReset={() => log("sıfırlandı")} /></span>
      {/* 2. Controlled: `running` follows $on (a Toggle here, a workout plan or a game state in your app).
          subDial={false} drops the 30-minute sub-dial, decimals={0} shows whole seconds, size sets the dial's width.
          motion={false}: the hand steps ten times a second and jumps back on Reset instead of flying back on a
          spring; reduced motion in the OS does the same for everyone who asks for it. */}
      <div sx={{ flex: "col", gap: 2 }}>
        <span class="lab-run"><Toggle label="Çalıştır" bind:value={$on} /></span>
        <span class="lab-ctl"><Stopwatch running={$on} subDial={false} decimals={0} size={180} motion={false} /></span>
      </div>
      {/* 3. parts: switch the face, ticks, numbers, sub-dial, readout, glass, controls and laps on or off. Without
          controls, drive it with `running`; class adds your own class to the root. */}
      <span class="lab-bare"><Stopwatch running={$on} size={140} class="lab-mine"
        parts={{ controls: false, laps: false, numbers: false, glass: false, face: false }} /></span>
    </div>
    {/* m:theme="night": the same stopwatch on a dark background, to check the hand and the readout. */}
    <Card m:theme="night">
      <Stopwatch size={180} />
    </Card>
    <Button size="sm" variant="ghost" on:click={() => { $log = [] }}>Günlüğü temizle</Button>
  </div>
}
