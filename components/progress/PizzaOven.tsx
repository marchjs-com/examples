import { Progress, Button, Card } from "march/ui"

// pizza fırını: "Fırına at" her saniye pişirir; renk pişme durumuna göre maviden turuncuya, sonra kırmızıya döner
export function PizzaOven() {
  let $baked = 0
  let $timer = 0
  const bake = () => {
    clearInterval($timer)
    $baked = 0
    $timer = setInterval(() => { $baked = Math.min(120, $baked + 10); if ($baked >= 120) clearInterval($timer) }, 400) as unknown as number
  }
  const tone = () => ($baked < 60 ? "info" : $baked <= 100 ? "success" : "danger") as "info"
  const say = () => ($baked === 0 ? "Hamur bekliyor" : $baked < 100 ? "Pişiyor…" : $baked === 100 ? "Tam kıvamında! 🍕" : "Yandı! 🔥")
  return <Card title="Pizza fırını">
    <Progress value={() => $baked} max={100} tone={tone} label={say} showValue size="lg" />
    <Button size="sm" on:click={bake}>Fırına at</Button>
  </Card>
}
