import { Parallax } from "march/landing"
import { Toggle, Card, Slider } from "march/ui"

// Parallax'ın bütün özellikleri bir arada: katmanlar (görsel: src + alt, düğüm: content; speed, depth, bleed,
// opacity, blend, class), fare izleme (pointer), yükseklik, sınıf ve öndeki içerik (children)
// bir katmanın biçimi
type Layer = { src?: string; alt?: string; content?: Node; speed?: number; depth?: number; bleed?: string; opacity?: number; blend?: string; class?: string }

const Glow = () => <div style={{ width: "100%", height: "100%", background: "radial-gradient(circle at 70% 30%, #ff7a59, transparent 60%)" }} />
const Dots = () => <div style={{ "font-size": "2rem", padding: "3rem" }} aria-hidden="true">● ○ ● ○</div>

export function ParallaxLab() {
  let $pointer = 1
  let $tall = false
  let $near = true
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
      // sinyaller burada okunur: değişince sahne yeniden çizilir
      const pointer = $pointer, tall = $tall, near = $near
      return <Parallax class="lab-plx" layers={layers(near)} pointer={pointer} height={tall ? "30rem" : "18rem"}>
        <h3 sx={{ text: "2xl" }}>Katman katman derinlik</h3>
      </Parallax>
    }}
  </div>
}
