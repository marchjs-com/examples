import { EasingCurveEditor, Button, Card } from "march/ui"
import { animate } from "march/motion"

// zıplayan top: eğriyi çek, top o eğriyle zıplar; eğri hareket motoruna "zipla" adıyla kaydolur
export function BounceBall() {
  let $curve = "cubic-bezier(.34, 1.56, .64, 1)"
  const ball = <div sx={{ display: "inline-block", p: 4, radius: 4, shadow: 2, text: "2xl" }}>🏀</div> as HTMLElement
  const jump = () => animate(ball, [{ transform: "translateY(0)" }, { transform: "translateY(-4rem)" }, { transform: "translateY(0)" }], { duration: 800, easing: "zipla" })
  return <Card title="Zıplayan top">
    <div sx={{ flex: ["row", "wrap"], gap: 4 }}>
      <EasingCurveEditor bind:value={$curve} name="zipla" compact preview="none" handleColors={["brand-orange", "brand-gold"]} />
      <div sx={{ flex: "col", gap: 3 }}>
        {ball}
        <Button on:click={jump}>Zıplat</Button>
        <code sx={{ text: "xs" }}>{() => $curve}</code>
      </div>
    </div>
  </Card>
}
