import { Overlay, Button, Card } from "march/ui"

// gece gökyüzü: noktalar yıldız, kenar karartma ufuk; düğme efekti değiştirir, katmanlar tıklamayı engellemez
const looks = ["dots", "grid", "mesh", "spotlight"] as const

export function NightSky() {
  let $i = 0
  let $wishes = 0
  return <Card m:theme="night">
    <div sx={{ flex: "col", gap: 3, p: 6, radius: 3 }}>
      <Overlay effect={looks[$i % looks.length]} m:color="brand-gold" opacity={0.8} />
      <Overlay effect="vignette" />
      <strong sx={{ text: "xl" }}>Bu gece {() => looks[$i % looks.length]} gökyüzü</strong>
      <span sx={{ color: "muted" }}>Tutulan dilek: {() => $wishes}</span>
      <div sx={{ flex: "row", gap: 2 }}>
        <Button size="sm" on:click={() => $i++}>Gökyüzünü değiştir</Button>
        <Button size="sm" variant="ghost" on:click={() => $wishes++}>Dilek tut</Button>
      </div>
    </div>
  </Card>
}
