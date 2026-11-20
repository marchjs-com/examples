import { Skeleton, Button, Card } from "march/ui"

// fotoğraf çerçevesi: "Çek" düğmesi iskeleti bir anlığına gösterir, sonra rastgele bir manzara emojisi gelir
const VIEWS = ["🏔️", "🌅", "🏝️", "🌌", "🏜️"]

export function PhotoFrame() {
  let $busy = false
  let $view = "🏔️"
  const shoot = () => { $busy = true; setTimeout(() => { $view = VIEWS[Math.floor(Math.random() * VIEWS.length)]!; $busy = false }, 900) }
  return <Card title="Fotoğraf">
    {() => $busy ? <Skeleton block height="lg" colors="brand" /> : <div sx={{ text: "2xl", p: 4 }}>{$view}</div>}
    <Button size="sm" disabled={() => $busy} on:click={shoot}>Çek</Button>
  </Card>
}
