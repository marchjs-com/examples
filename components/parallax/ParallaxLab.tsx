// ParallaxLab: the full-featured Parallax example; it uses every prop at least once.
//
// Parallax is layered depth: each layer moves at its own speed while the section scrolls past and, with `pointer`, shifts
// with the mouse by its depth. Props shown here: layers (an image with src + alt, or a node with content; speed, depth,
// bleed, opacity, blend, class), pointer (mouse strength), height, class and the children (content in front).
// Motion: it runs on the motion engine, so reduced motion keeps every layer still and the global speed and "Stop all"
// apply; the scroll effect pauses while the section is off screen. `pointer={0}` turns the mouse effect off.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// ParallaxLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Parallax } from "march/landing"
import { Toggle, Card, Slider } from "march/ui"

// The shape of one layer (the same fields as the Parallax docs list).
type Layer = { src?: string; alt?: string; content?: Node; speed?: number; depth?: number; bleed?: string; opacity?: number; blend?: string; class?: string }

// Two small nodes used as layers: a glow made with a CSS gradient, and a row of dots that is decoration (aria-hidden).
const Glow = () => <div style={{ width: "100%", height: "100%", background: "radial-gradient(circle at 70% 30%, #ff7a59, transparent 60%)" }} />
const Dots = () => <div style={{ "font-size": "2rem", padding: "3rem" }} aria-hidden="true">● ○ ● ○</div>

export function ParallaxLab() {
  // Reactive state: the mouse strength, the height switch and whether the near layer exists.
  let $pointer = 1
  let $tall = false
  let $near = true
  // The layers, from the farthest to the nearest (the first is the farthest).
  // - src + alt: an image layer; alt makes it meaningful for screen readers (layers are decoration otherwise).
  // - speed: 0 stays with the section, a positive number is slower than the page (it looks far away), a negative number
  //   is faster (it looks near). depth: how strongly the layer shifts with the pointer. bleed: extra room around the
  //   layer so no edge shows while it moves.
  // - content: a node instead of an image. opacity / blend: transparency and the CSS blend mode ("screen" lightens).
  // - class: a class on the layer itself, for CSS or tests.
  const layers = (near: boolean): Layer[] => [
    { src: "/media/hadi-waves.jpg", alt: "Dalgalar", speed: 0.45, bleed: "16%", class: "lab-far" },
    { content: <Glow /> as Node, speed: 0.2, opacity: 0.7, blend: "screen", class: "lab-glow" },
    ...(near ? [{ content: <Dots /> as Node, speed: -0.2, depth: 80, class: "lab-near" }] : []),
  ]
  return <div sx={{ flex: "col", gap: 3 }}>
    <Card>
      <div sx={{ flex: ["row", "wrap"], gap: 3 }}>
        <Slider aria-label="Fare gücü" min={0} max={2} step={0.5} bind:value={$pointer} />
        <Toggle label="Yüksek sahne" bind:value={$tall} />
        <Toggle label="Yakın katman" bind:value={$near} />
      </div>
    </Card>
    {() => {
      // The signals are read here, outside the JSX: when a control changes, this function runs again and the scene is
      // drawn anew with the new options.
      const pointer = $pointer, tall = $tall, near = $near
      // class: a class on the root (.m-plx). pointer: the mouse strength (0 = off). height: the minimum height (the default
      // is 26rem). The child (the heading) is drawn in front of all layers.
      return <Parallax class="lab-plx" layers={layers(near)} pointer={pointer} height={tall ? "30rem" : "18rem"}>
        <h3 sx={{ text: "2xl" }}>Katman katman derinlik</h3>
      </Parallax>
    }}
  </div>
}
