// FiveSeconds.tsx: the creative-minimal Stopwatch example.
// A small game: start the stopwatch, then stop it as close to exactly 5.00 seconds as you can, without looking at
// the dial. Your best try is kept.
// Use this pattern when the stopwatch's events (onStart, onStop) should drive your own logic: the component measures
// the time, you decide what it means.
import { Stopwatch, Card, Badge } from "march/ui"

export function FiveSeconds() {
  // Reactive state: the last result (ms off 5 s) and the best one. null means "no try yet".
  let $off = null as number | null
  let $best = null as number | null
  let $running = false
  const stop = (ms: number) => {
    $running = false
    $off = Math.abs(ms - 5000)
    if ($best === null || $off < $best) $best = $off
  }
  return <Card title="Tam 5 saniye">
    {/* onStart / onStop: the stopwatch tells you when it starts and stops; onStop gets the elapsed milliseconds.
        parts={{ laps: false }}: no lap list in a game of single tries. decimals={2} shows hundredths. The seconds hand
        sweeps on the motion engine; with reduced motion it steps ten times a second, and the time is measured from
        the real clock either way, so a slow animation never cheats the game. */}
    <Stopwatch decimals={2} size={200} parts={{ laps: false }} label="5 saniye oyunu"
      texts={{ start: "Başla", stop: "Durdur", resume: "Yeniden", reset: "Sıfırla" }}
      onStart={() => { $running = true }} onStop={stop} />
    {/* Results as text and a coloured badge: the colour repeats what the text says, never replaces it. */}
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {$off !== null && !$running ? <Badge tone={$off < 100 ? "success" : $off < 500 ? "warn" : "danger"}>{`${($off / 1000).toFixed(2)} s fark`}</Badge> : null}
      {$best !== null ? <Badge tone="info">{`En iyi: ${($best / 1000).toFixed(2)} s`}</Badge> : null}
    </div>
  </Card>
}
