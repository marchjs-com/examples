// ScrollStoryLab: the full-featured ScrollStory example; it uses every prop at least once.
//
// Props shown here: steps (title, body, media, color), side, theme, onStep, dots, numbers (true / false / your own
// function), transition (a preset or your own function) and class.
// The controls at the top change the story live. Use it as a reference when you need one specific option: find the
// prop below, copy the line.
// ScrollStoryLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { ScrollStory } from "march/landing"
import { animate } from "march/motion"
import { Card, Segmented, Toggle } from "march/ui"

// The built-in transition presets are "rise", "fade" and "none"; "own" is this Lab's name for the custom function
// below, so the Segmented control can offer all four in one row.
const TRANSITIONS = ["rise", "fade", "own", "none"] as const

// The picture of each step: one big emoji in a centred row.
const Tile = (p: { face: string }) => <div sx={{ flex: ["row", "center"], p: 6 }} style={{ fontSize: "72px" }}>{p.face}</div>

// Your own transition. ScrollStory calls it when the active step changes with (incoming, outgoing, direction):
// the picture coming in, the picture leaving (undefined on the first draw) and 1 or -1 for scrolling forward or
// back. Use animate() from march/motion so the motion engine still applies reduced motion, the global speed and
// "Stop all". Here the new picture turns in (rotating and scaling to rest, the turn direction follows `dir`) while
// the old one fades out.
const turnIn = (incoming: HTMLElement, outgoing: HTMLElement | undefined, dir: 1 | -1) => {
  animate(incoming, { opacity: [0, 1], transform: [`rotate(${10 * dir}deg) scale(.7)`, "rotate(0deg) scale(1)"] }, { duration: 620, easing: "expo" })
  if (outgoing) animate(outgoing, { opacity: [1, 0] }, { duration: 300, easing: "out" })
}

export function ScrollStoryLab() {
  // Plain `let $name` variables are March signals: reading one inside a function subscribes that function, and
  // assigning a new value redraws it. bind:value={$x} on a control writes into the same signal.
  let $side: "start" | "end" = "end"
  let $numbers: string = "own"
  let $transition: string = "rise"
  let $theme = true
  let $dots = true
  let $step = 0
  return <div sx={{ flex: "col", gap: 3 }}>
    {/* The control panel: Segmented for the choices with several values, Toggle for the on/off ones. */}
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Segmented aria-label="Görsel tarafı" options={[{ value: "start", label: "başta" }, { value: "end", label: "sonda" }]} bind:value={$side} />
        <Segmented aria-label="Adım numarası" options={[{ value: "on", label: "01" }, { value: "own", label: "Adım 1" }, { value: "off", label: "numarasız" }]} bind:value={$numbers} />
        <Segmented aria-label="Geçiş" options={TRANSITIONS.map((t) => ({ value: t, label: t }))} bind:value={$transition} />
        <Toggle label="Adıma göre renk" bind:value={$theme} />
        <Toggle label="Noktalar" bind:value={$dots} />
      </div>
    </Card>
    {/* Shows the active step; it is written by onStep below. */}
    <p sx={{ color: "muted" }}>{`Etkin adım: ${$step + 1}`}</p>
    {() => {
      // The options are read here, so changing any control redraws the story. $step is deliberately not read in this
      // function (onStep only writes it), so scrolling to another step does not rebuild the story.
      const side = $side, numbers = $numbers, transition = $transition, theme = $theme, dots = $dots
      // - class="lab-story": lets the tests (or your CSS) find this story.
      // - side: which side the pinned picture is on ("start" or "end").
      // - theme: tint the section with the active step's `color`.
      // - dots: the dots under the pinned picture.
      // - onStep(index): called when the active step changes.
      // - numbers: false hides the number above each title, true shows "01", a function (index) => node draws your own.
      // - transition: "rise" / "fade" / "none", or the function turnIn above.
      // - steps: title, optional body, the media node for the pinned picture and an optional theme colour token.
      // With reduced motion the pictures are swapped without movement.
      return <ScrollStory class="lab-story" side={side} theme={theme} dots={dots} onStep={(i: number) => $step = i}
        numbers={numbers === "off" ? false : numbers === "own" ? (i: number) => `Adım ${i + 1}` : true}
        transition={transition === "own" ? turnIn : transition as "rise" | "fade" | "none"}
        steps={[
          { title: "Planla", body: "Ne, nerede, ne zaman.", media: <Tile face="🗺️" />, color: "brand-orange" },
          { title: "Davet et", body: "Bağlantıyı paylaş, yerler dolsun.", media: <Tile face="💌" />, color: "brand-blue" },
          { title: "Buluş", body: "Etkinlik günü herkes tanışık.", media: <Tile face="🎉" />, color: "brand-green" },
        ]} />
    }}
  </div>
}
