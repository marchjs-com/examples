// OverlayLab: the full-featured Overlay example; it uses every prop at least once.
//
// Overlay is a decorative layer that lives inside its container: an image, a muted looping video, an inline SVG, a canvas
// drawn by a function, or a CSS effect. Layers stack in the order they are written; `front` puts one above the content.
// Props shown here: src (image or video), type, srcset + sizes, poster, alt, svg, draw + animate, effect, fit, position,
// inset, top / right / bottom / left, start / end (they follow the text direction), opacity, blend, front, layer,
// interactive, class and the common prop m:color.
// Motion: the video and the canvas pause when off screen and stay still with reduced motion; the canvas loop runs on the
// motion engine's clock, so "Stop all" and the global speed reach it.
// Use it as a reference when you need one specific option: find the prop below, copy the line.
// OverlayLab.test.tsx (next to this file) checks this example; it runs in MarchIDE's Tests tab when you save.
import { Overlay, Button } from "march/ui"

// Types of the canvas drawing function's arguments (the 2D context and the info object it receives every frame).
type Ctx = { fillStyle: unknown; fillRect: (x: number, y: number, w: number, h: number) => void }
type Info = { width: number; height: number; time: number; theme: { primary: string; cat: string[] } }

// A box with a title: the layers below are placed inside this box (the Overlay fills the container it is in).
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1, p: 6, radius: 3, shadow: 1 }}>
  <strong sx={{ text: "sm" }}>{props.title}</strong>
  {props.children}
</div>

// The canvas drawing: stripes that slide over time, coloured from the theme (info.theme). `draw` is called every frame
// while the layer is visible; info gives the size, the time and the theme colours.
const stripes = (ctx: Ctx, info: Info) => {
  const w = info.width / 8
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = info.theme.cat[i % info.theme.cat.length] ?? info.theme.primary
    ctx.fillRect(((i * w + info.time / 20) % (info.width + w)) - w, 0, w / 2, info.height)
  }
}

export function OverlayLab() {
  // Reactive state: whether the glass layer is in front of the content.
  let $front = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Box title="Resim: fit, position, srcset, sizes, anlamlı alt">
      {/* An image. type forces the kind (otherwise it comes from the file extension). srcset + sizes: the browser picks
          the right file for the width. fit="cover" fills the box and crops; position="50% 30%" chooses which part stays
          visible. opacity={0.6}: partly transparent. alt: makes the image MEANINGFUL, so it is not hidden from screen
          readers (without alt every layer is aria-hidden, as decoration). class: for CSS or tests. */}
      <Overlay src="/media/dusk.jpg" type="image" srcset="/media/dusk.jpg 1200w" sizes="(max-width: 600px) 100vw, 600px" fit="cover" position="50% 30%" alt="Gün batımında tepeler" opacity={0.6} class="lab-photo" />
    </Box>
    <Box title="Video ve afiş, karışım">
      {/* A video: muted, looping, and playing only while visible. poster is shown instead on save-data or reduced
          motion. blend="multiply": the CSS mix-blend-mode, so the layer darkens what is under it. */}
      <Overlay src="/media/hadi-waves.webm" type="video" poster="/media/hadi-waves.jpg" blend="multiply" />
    </Box>
    <Box title="SVG, kenarlar (top / right / bottom / left)">
      {/* An inline SVG: it uses currentColor, so m:color (the colour token prop) paints it. top / right / bottom / left
          place the layer by its edges, as a space step (a number) or a CSS length ("10%"). */}
      <Overlay svg={<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="currentColor" /></svg>} type="svg" top={2} right="10%" bottom={2} left="60%" m:color="brand-orange" class="lab-svg" />
    </Box>
    <Box title="Canvas: draw + animate, mantıksal kenarlar (start / end)">
      {/* A canvas: `draw` paints it, and `animate` repaints it every frame while it is visible.
          start / end are the logical edges: they follow the text direction (the left edge in left-to-right text,
          the right edge in right-to-left). */}
      <Overlay draw={stripes} animate start={0} end="50%" opacity={0.5} />
    </Box>
    <Box title="Efekt: önde ya da arkada (front), sıra (layer)">
      {/* effect: a built-in CSS effect (mesh, glass, gradient, noise, vignette, spotlight, grid, dots). layer sets the
          stacking order (the default is the order written). inset={3} keeps the glass away from the edges. front: the
          glass is drawn above the content when true; the button flips it. */}
      <Overlay effect="mesh" layer={1} />
      <Overlay effect="glass" front={$front} inset={3} layer={2} class="lab-glass" />
      <Button on:click={() => $front = !$front}>{() => ($front ? "Camı arkaya al" : "Camı öne al")}</Button>
    </Box>
    <Box title="interactive: katman işaretçi girdisi alır (spotlight imleci izler)">
      {/* interactive: the opt-in to pointer input. Layers take no pointer input by default (clicks reach the content
          underneath); here the layer receives it, so the spotlight can follow the pointer. */}
      <Overlay effect="spotlight" interactive m:color="brand-blue" class="lab-live" />
      <span>İmleci kutunun üstünde gezdirin</span>
    </Box>
  </div>
}
