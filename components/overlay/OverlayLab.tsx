import { Overlay, Button } from "march/ui"

// Overlay'in bütün özellikleri bir arada: src (resim / video), type, srcset + sizes, poster, alt, svg, draw + animate,
// effect, fit, position, inset, top / right / bottom / left, start / end, opacity, blend, front, layer, interactive, class
type Ctx = { fillStyle: unknown; fillRect: (x: number, y: number, w: number, h: number) => void }
type Info = { width: number; height: number; time: number; theme: { primary: string; cat: string[] } }

// bir kutu ve içinde adı: katmanlar bu kutuya yerleşir
const Box = (props: { title: string; children?: unknown }) => <div sx={{ flex: "col", gap: 1, p: 6, radius: 3, shadow: 1 }}>
  <strong sx={{ text: "sm" }}>{props.title}</strong>
  {props.children}
</div>

// canvas: tema renkleriyle zamanla kayan şeritler
const stripes = (ctx: Ctx, info: Info) => {
  const w = info.width / 8
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = info.theme.cat[i % info.theme.cat.length] ?? info.theme.primary
    ctx.fillRect(((i * w + info.time / 20) % (info.width + w)) - w, 0, w / 2, info.height)
  }
}

export function OverlayLab() {
  let $front = false
  return <div sx={{ flex: "col", gap: 3 }}>
    <Box title="Resim: fit, position, srcset, sizes, anlamlı alt">
      <Overlay src="/media/dusk.jpg" type="image" srcset="/media/dusk.jpg 1200w" sizes="(max-width: 600px) 100vw, 600px" fit="cover" position="50% 30%" alt="Gün batımında tepeler" opacity={0.6} class="lab-photo" />
    </Box>
    <Box title="Video ve afiş, karışım">
      <Overlay src="/media/hadi-waves.webm" type="video" poster="/media/hadi-waves.jpg" blend="multiply" />
    </Box>
    <Box title="SVG, kenarlar (top / right / bottom / left)">
      <Overlay svg={<svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="currentColor" /></svg>} type="svg" top={2} right="10%" bottom={2} left="60%" m:color="brand-orange" class="lab-svg" />
    </Box>
    <Box title="Canvas: draw + animate, mantıksal kenarlar (start / end)">
      <Overlay draw={stripes} animate start={0} end="50%" opacity={0.5} />
    </Box>
    <Box title="Efekt: önde ya da arkada (front), sıra (layer)">
      <Overlay effect="mesh" layer={1} />
      <Overlay effect="glass" front={$front} inset={3} layer={2} class="lab-glass" />
      <Button on:click={() => $front = !$front}>{() => ($front ? "Camı arkaya al" : "Camı öne al")}</Button>
    </Box>
    <Box title="interactive: katman işaretçi girdisi alır (spotlight imleci izler)">
      <Overlay effect="spotlight" interactive m:color="brand-blue" class="lab-live" />
      <span>İmleci kutunun üstünde gezdirin</span>
    </Box>
  </div>
}
