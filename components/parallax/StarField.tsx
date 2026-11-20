import { Parallax } from "march/landing"
import { Button } from "march/ui"

// yıldız tarlası: üç katman yıldız, imleci gezdirince derinliğe göre kayar; düğme fare izlemenin gücünü değiştirir
const Stars = (p: { list: string }) => <div style={{ "font-size": "1.6rem", "letter-spacing": "3rem", "line-height": "4rem", padding: "2rem" }} aria-hidden="true">{p.list}</div>

export function StarField() {
  let $power = 1
  return <div sx={{ flex: "col", gap: 3 }}>
    <Button variant="secondary" on:click={() => $power = $power >= 3 ? 0 : $power + 1}>Fare gücü: {$power}</Button>
    {() => { const power = $power; return <Parallax height="16rem" pointer={power} m:theme="night" layers={[
      { content: <Stars list="· · · · · · · · · · · ·" />, speed: 0.5 },
      { content: <Stars list="✦ ✧ ✦ ✧ ✦ ✧" />, speed: 0.25 },
      { content: <Stars list="🌙 ⭐ 🪐" />, speed: -0.15, depth: 90 },
    ]}>
      <h3 sx={{ text: "xl" }}>Gece gökyüzü</h3>
    </Parallax> }}
  </div>
}
