// ProgressLab: the full-featured Progress example; it uses every prop at least once.
//
// Props shown here: value + max, tone, color, colors (brand / list / single) + paint, label, ariaLabel, showValue
// (a percentage or your own text), valueText, size (a name or pixels), variant (bar / line), orientation, track,
// inverse, smooth, decorative, fillRef, segments + duration + paused + run + onDone, and class.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ProgressLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.

import { Progress, Button, Card } from "march/ui"

// The five tones Progress knows (meaning, not colour: the theme decides how each looks).
const tones = ["primary", "success", "warn", "danger", "info"] as const

// A small helper: a muted title with its content under it, to group the examples below.
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1 }}>
  <span sx={{ text: "xs", color: "muted" }}>{props.title}</span>
  {props.children}
</div>

export function ProgressLab() {
  // The shared value (0 to 100) that most bars below follow.
  let $v = 40
  // Which segment of the timed bar is filling now.
  let $story = 0
  // Whether the timed segments are held.
  let $paused = false
  // How many segments have finished (counted by onDone).
  let $done = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    <div sx={{ flex: ["row", "wrap"], gap: 2 }}>
      {/* Buttons that move the shared value, so you can watch the bars follow it. */}
      <Button size="sm" on:click={() => $v = Math.min(100, $v + 20)}>+20</Button>
      <Button size="sm" variant="ghost" on:click={() => $v = 0}>Sıfırla</Button>
    </div>
    {/* One bar per tone. `value` is a function so the bar follows $v; showValue shows the percentage; size sm is a thin
        track. */}
    <Box title="Tonlar">{tones.map((t) => <Progress value={() => $v} tone={t} label={`Ton ${t}`} showValue size="sm" />)}</Box>
    <Box title="Renkler ve dizilim">
      {/* color: one colour token. colors="brand" uses the four brand colours and paint says how they are laid out:
          "gradient" (default), "segments" (equal parts) or "cycle" (the colours flow; they stand still under reduced
          motion). colors="single" keeps one colour even in a multicolour theme. */}
      <Progress value={70} color="brand-purple" label="Tek renk (color)" />
      <Progress value={70} colors="brand" paint="segments" label="Marka renkleri, parçalı" />
      <Progress value={70} colors={["brand-blue", "brand-green"]} paint="cycle" label="İki renk, akan" />
      <Progress value={70} colors="single" label="Tek renk (single)" />
    </Box>
    <Box title="Değer metni">
      {/* showValue as a function (percent, value) writes the visible text; valueText writes aria-valuetext for screen
          readers; max changes the full value (480 MB here); class lets the tests find this bar. */}
      <Progress value={() => $v * 4.8} max={480} label="Video" showValue={(p: number, mb: number) => `${Math.round(mb)} / 480 MB (%${p})`}
        valueText={(v: number, m: number) => `${Math.round(v)} MB / ${m} MB`} class="lab-video" />
      {/* No value: the bar is indeterminate and sweeps until a value arrives (the sweep stops under reduced motion). */}
      <Progress label="Hazırlanıyor (belirsiz)" />
      {/* ariaLabel names a bar that has no visible label; size can also be pixels; track={false} draws only the fill;
          smooth={false} makes it follow the value at once. */}
      <Progress value={50} ariaLabel="Görünmez ad" size={14} track={false} smooth={false} />
    </Box>
    <Box title="İnce çizgi, dikey, süs">
      <div sx={{ flex: ["row", "center"], gap: 3 }}>
        {/* variant="line": a thin line (reading progress, deck progress); decorative hides it from assistive technology
            when another element already says the progress. */}
        <Progress variant="line" value={() => $v} decorative class="lab-line" />
        {/* orientation="vertical": stands up and fills from the top. */}
        <Progress orientation="vertical" value={() => $v} size="lg" ariaLabel="Dikey" class="lab-vertical" />
        {/* fillRef hands you the fill element, for a driver (scroll, an animation) that writes its transform itself. */}
        <Progress fillRef={(el: HTMLElement) => { el.dataset.driven = "yes" }} value={30} ariaLabel="Sürülen dolgu" />
      </div>
    </Box>
    <Box title="Parçalar (hikâye)">
      {/* Timed segments: `value` counts the full parts, `duration` is how long the part at `value` takes to fill,
          `paused`
          holds it, `run` restarts the fill when it changes, and onDone is called when a part is complete (here it moves
          on to the next one: a story viewer). valueText gives screen readers "1 / 4". */}
      <Progress segments={4} value={() => $story} duration={1500} paused={() => $paused} run={() => $story}
        onDone={() => { $done++; $story = ($story + 1) % 4 }} ariaLabel="Hikâye" valueText={(i: number, m: number) => `${i + 1} / ${m}`} class="lab-story" />
      <div sx={{ flex: ["row", "center"], gap: 2 }}>
        <Button size="sm" on:click={() => $paused = !$paused}>{() => ($paused ? "Sürdür" : "Duraklat")}</Button>
        <span sx={{ color: "muted" }}>{() => `Biten parça: ${$done}`}</span>
      </div>
      {/* A static segmented bar: value 2.5 of 5 parts. */}
      <Progress segments={5} value={2.5} label="Adımlar (2,5 / 5)" />
    </Box>
    {/* inverse is for a bar over media: white fill and a translucent track. The Card is dark (m:theme="night", a common
        prop that works on every component). */}
    <Card m:theme="night">
      <Progress value={() => $v} inverse label="Medya üzerinde (inverse)" showValue />
    </Card>
  </div>
}
